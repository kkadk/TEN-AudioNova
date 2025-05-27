from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Song, Playlist, PlaylistSong, LikedSong, PlaybackHistory
from .serializers import (
    SongSerializer, PlaylistSerializer,
    PlaylistSongSerializer, PlaylistDetailSerializer, LikedSongSerializer, PlaybackHistorySerializer
)
from django.db.models import Q
from django.http import FileResponse
import os
from django.http import Http404
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
from datetime import timedelta
from rest_framework.exceptions import PermissionDenied
class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Song.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        instance =serializer.save(user=self.request.user)
        if not instance.duration and instance.file:
            try:
                file_path = instance.file.path
                if file_path.endswith('.mp3'):
                    audio = MP3(file_path)
                    instance.duration = timedelta(seconds=int(audio.info.length))
                elif file_path.endswith('.wav'):
                    audio = WAVE(file_path)
                    instance.duration = timedelta(seconds=int(audio.info.length))
                instance.save()
            except Exception as e:
                print(f"Could not determine duration: {e}")

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise permissions.PermissionDenied("You do not have permission to update this song.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise permissions.PermissionDenied("You do not have permission to delete this song.")
        instance.delete()

class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PlaylistSongViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PlaylistSong.objects.filter(playlist__user=self.request.user)

    def perform_create(self, serializer):
        playlist = serializer.validated_data['playlist']
        song = serializer.validated_data['song']

        if playlist.user != self.request.user:
            raise PermissionDenied("You do not own this playlist.")

        if not song.public and song.user != self.request.user:
            raise PermissionDenied("The Song is private and you do not own it.")

        serializer.save()

    
    def perform_update(self, serializer):
        playlist = serializer.instance.playlist
        song = serializer.validated_data.get('song', serializer.instance.song)

        if playlist.user != self.request.user:
            raise PermissionDenied("You do not own this playlist.")

        if not song.public and song.user != self.request.user:
            raise PermissionDenied("The Song is private and you do not own it.")

        serializer.save()


class PlaylistDetailView(generics.RetrieveAPIView):
    serializer_class = PlaylistDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

class LikedSongViewSet(viewsets.ModelViewSet):
    serializer_class = LikedSongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LikedSong.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        song = instance.song
        self.perform_destroy(instance)
        if song.like_count > 0:
            song.like_count -= 1
            song.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PlaybackHistoryListView(generics.ListAPIView):
    serializer_class = PlaybackHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PlaybackHistory.objects.filter(user=self.request.user)



#anyone can see the songs in the public playlist
class PublicPlaylistListView(generics.ListAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Playlist.objects.filter(is_public=True)


class SongSearchListView(generics.ListAPIView):
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Song.objects.filter(public=True)
        title = self.request.query_params.get('title')
        genre = self.request.query_params.get('genre')

        if title:
            queryset = queryset.filter(title__icontains=title)
        if genre:
            queryset = queryset.filter(genre__icontains=genre)
        
        return queryset

#function based views for liking, unliking, and play count
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_song(request, song_id):
    user = request.user
    try:
        song = Song.objects.get(pk=song_id)
        liked_song, created = LikedSong.objects.get_or_create(user=user, song=song)
        if created:
            song.like_count += 1
            song.save()
            return Response({'message': 'Song liked successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Already liked'}, status=status.HTTP_200_OK)
    except Song.DoesNotExist:
        return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def unlike_song(request, song_id):
    user = request.user
    try:
        liked_song = LikedSong.objects.get(user=user, song__id=song_id)
        song = liked_song.song
        liked_song.delete()
        if song.like_count > 0:
            song.like_count -= 1
            song.save()
        return Response({'message': 'Song unliked successfully'}, status=status.HTTP_200_OK)
    except LikedSong.DoesNotExist:
        return Response({'error': 'You have not liked this song'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def play_song(request, song_id):
    user = request.user
    try:
        song = Song.objects.get(pk=song_id)
        song.play_count += 1
        song.save()

        PlaybackHistory.objects.create(user=user, song=song)

        if not song.file:
            return Response({'error': 'Audio file not available'}, status=status.HTTP_404_NOT_FOUND)

        file_path = song.file.path

        if not os.path.exists(file_path):
            raise Http404("Audio file not found.")

        return FileResponse(open(file_path, 'rb'), content_type='audio/mpeg')

    except Song.DoesNotExist:
        return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
