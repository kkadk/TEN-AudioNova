import os
import requests
from django.http import FileResponse, Http404
from django.utils.encoding import smart_str
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import GeneratedSong
from .serializers import GeneratedSongSerializer

FASTAPI_URL = "http://localhost:8001/generate/"

class GenerateSongAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.post(FASTAPI_URL, data={"prompt": prompt})
            response.raise_for_status()
            file_url = response.json().get("file_url")
            if not file_url:
                raise ValueError("No file_url returned.")
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        song = GeneratedSong.objects.create(
            user=request.user,
            prompt=prompt,
            file_url=file_url
        )
        serializer = GeneratedSongSerializer(song, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GeneratedSongViewSet(viewsets.ModelViewSet):
    serializer_class = GeneratedSongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GeneratedSong.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DownloadGeneratedSongAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, song_id):
        try:
            song = GeneratedSong.objects.get(id=song_id, user=request.user)
            filename = os.path.basename(song.file_url)
            file_path = os.path.join(settings.MEDIA_ROOT, 'musicgen', filename)

            if not filename.endswith('.wav'):
                raise Http404("Invalid file reference.")

            if not os.path.exists(file_path) or os.path.isdir(file_path):
                raise Http404("File does not exist.")
        except (GeneratedSong.DoesNotExist, ValueError, TypeError):
            raise Http404("Song not found or you do not have permission.")

        response = FileResponse(open(file_path, 'rb'), as_attachment=True)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = f'attachment; filename="{smart_str(filename)}"'
        return response