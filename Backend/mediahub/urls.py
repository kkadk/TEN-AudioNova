from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SongViewSet,
    PlaylistViewSet, PlaylistSongViewSet, PlaylistDetailView, LikedSongViewSet, PlaybackHistoryListView,
    PublicPlaylistListView, SongSearchListView, like_song, unlike_song, play_song
)

router = DefaultRouter()
router.register(r'songs', SongViewSet , basename='song')
router.register(r'playlists', PlaylistViewSet, basename='playlist')
router.register(r'playlist-songs', PlaylistSongViewSet, basename='playlistsong')
router.register(r'liked-songs', LikedSongViewSet, basename='likedsongs')

urlpatterns = [
    path('', include(router.urls)),
    path('playlist/<int:pk>/', PlaylistDetailView.as_view(), name='playlist-detail'),
    path('playback-history/', PlaybackHistoryListView.as_view(), name='playback-history'),
    path('public-playlists/', PublicPlaylistListView.as_view(), name='public-playlists'),
    path('search-songs/', SongSearchListView.as_view(), name='search-songs'),
    path('songs/<int:song_id>/like/', like_song, name='like-song'),
    path('songs/<int:song_id>/unlike/', unlike_song, name='unlike-song'),
    path('songs/<int:song_id>/play/', play_song, name='play-song'),
]