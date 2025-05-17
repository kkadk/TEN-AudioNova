from rest_framework import serializers
from .models import Artist, Album, Song, Playlist, PlaylistSong, LikedSong, PlaybackHistory

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Song
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'is_public', 'cover_image', 'created_at']

class PlaylistSongSerializer(serializers.ModelSerializer):
    playlist = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Playlist.objects.all()
    )
    song = serializers.SlugRelatedField(
        slug_field='title',
        queryset=Song.objects.all()
    )

    class Meta:
        model = PlaylistSong
        fields = ['id', 'playlist', 'song', 'added_at']

class PlaylistDetailSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'is_public', 'cover_image', 'created_at', 'songs']

    def get_songs(self, obj):
        return [song.song.title for song in obj.playlist_songs.all()]

class LikedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedSong
        fields = ['id', 'song', 'liked_at']

class PlaybackHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybackHistory
        fields = ['id', 'song', 'played_at']