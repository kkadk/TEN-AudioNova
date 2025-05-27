from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenerateSongAPIView, GeneratedSongViewSet, DownloadGeneratedSongAPIView

router = DefaultRouter()
router.register('generated-songs', GeneratedSongViewSet, basename='my-generated-songs')

urlpatterns = [
    path('generate/', GenerateSongAPIView.as_view(), name='generate-song'),
    path('generated-songs/<int:song_id>/download/', DownloadGeneratedSongAPIView.as_view(), name='download-generated-song'),
    path('', include(router.urls)),
]