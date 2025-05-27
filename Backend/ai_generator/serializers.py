from rest_framework import serializers
from .models import GeneratedSong

class GeneratedSongSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = GeneratedSong
        fields = ['id', 'user', 'prompt','file_url', 'download_url', 'created_at']
        read_only_fields = ['user', 'created_at']
    def get_download_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f"/api/ai/generated-songs/{obj.id}/download/")
        return f"/api/ai/generated-songs/{obj.id}/download/"