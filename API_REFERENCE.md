# TEN AudioNova – Full API Reference


## 👤 Auth & Accounts API

### `POST /api/auth/register/`
Register a new user.

**Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{ "message": "User created. Check email for verification link." }
```

---

### `GET /api/auth/verify-email/<token>/`
Verify user's email.

**Response:**
```json
{ "message": "Email verified successfully." }
```

---

### `POST /api/auth/login/`
Login and receive JWT tokens.

**Body:**
```json
{
  "username": "user123",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "refresh": "<JWT_REFRESH_TOKEN>"
  "access": "<JWT_ACCESS_TOKEN>",
}
```

---

### `POST /api/auth/token/refresh/`
Refresh access token.

**Body:**
```json
{
  "refresh": "<JWT_REFRESH_TOKEN>"
}
```

**Response:**
```json
{
  "access": "<NEW_JWT_ACCESS_TOKEN>"
}
```

---

## 🎼 Music & Playlists API

### `GET /api/songs/`
List songs uploaded by the authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 8,
            "user": "apiteste",
            "title": "Apitest",
            "duration": "00:00:10",
            "file": "http://localhost:8000/media/songs/song_nY4klfi.wav",
            "genre": "AI",
            "play_count": 0,
            "like_count": 0,
            "public": false,
            "created_at": "2025-05-30T05:16:03.440708Z"
        }
    ]
}
```

---

### `POST /api/songs/`
Upload a new song.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Body (form-data):**
```
file=<audio_file>
title=Lo-fi Chill
genre=lofi
```

**Response:**
```json
{
  "id": 2,
  "user": "user123",
  "title": "Lo-fi Chill",
  "duration": "00:00:10",
  "file": "http://localhost:8000/media/songs/<audio_file>",
  "genre": "lofi",
  "play_count": 0,
  "like_count": 0,
  "public": true,  # Default is public; can be updated via PUT or set during POST
  "created_at": "2025-05-30T05:16:03.440708Z"
}
```

---

### `GET /api/public-playlists/`
Browse all public playlists.

**Response:**
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 3,
            "name": "newone",
            "is_public": true,
            "cover_image": null,
            "created_at": "2025-05-09T10:17:44.930161Z"
        },
        {
            "id": 6,
            "name": "rand",
            "is_public": true,
            "cover_image": null,
            "created_at": "2025-05-20T06:56:18.102032Z"
        }
    ]
}
```

---

### `POST /api/playlists/`
Create a new playlist.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Evening Vibes",
  "is_public": true
}
```

**Response:**
```json
{
  "id": 3,
  "name": "Evening Vibes",
  "is_public": true,
  "songs": []
}
```

---

### `POST /api/playlist-songs/`
Add a song to a playlist.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "playlist": 3,
  "song": 2
}
```

**Response:**
```json
{
  "id": 1,
  "playlist": 3,
  "song": 2
}
```

---

### `GET /api/search-songs/?title=chill&genre=lofi`
Search public songs by title and/or genre.

**Response:**
```json
[
  {
    "id": 2,
    "title": "Lo-fi Chill",
    "genre": "lofi",
    "file": "/media/uploads/lofi_chill.mp3",
    "public": true
  }
]
```

---

### `POST /api/songs/<song_id>/like/`
Like a song.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{ "message": "Song liked" }
```

---

### `POST /api/songs/<song_id>/unlike/`
Unlike a song.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{ "message": "Song unliked" }
```

---

### `GET /api/songs/<song_id>/play/`
Play and increment play count.

**Response:**
Returns the audio stream.

---

### `GET /api/playlist/<id>/`
View playlist details.

**Response:**
```json
{
  "id": 1,
  "name": "Workout Mix",
  "songs": [
    {
      "id": 2,
      "title": "Lo-fi Chill",
      "genre": "lofi"
    }
  ]
}
```

---

### `GET /api/playback-history/`
View your song listening history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "song": "Lo-fi Chill",
    "played_at": "2025-05-20T12:00:00Z"
  }
]
```

---

## 🤖 AI Music Generator API

### `POST /api/ai/generate/`
Generate music from a text prompt.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/x-www-form-urlencoded
```

**Body:**
```
prompt=calm ambient piano
```

**Response:**
```json
{
  "id": 5,
  "prompt": "calm ambient piano",
  "file_url": "/media/musicgen/calm_ambient_piano_24ab88e7.wav",
  "download_url": "/api/ai/generated-songs/5/download/",
  "created_at": "2025-05-20T11:00:00Z"
}
```

---

### `GET /api/ai/generated-songs/`
List your AI-generated songs.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "id": 5,
    "prompt": "calm ambient piano",
    "file_url": "/media/musicgen/calm_ambient_piano_24ab88e7.wav",
    "download_url": "/api/ai/generated-songs/5/download/",
    "created_at": "2025-05-20T11:00:00Z"
  }
]
```

---

### `GET /api/ai/generated-songs/<id>/download/`
Download a generated `.wav` file.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
Returns the file as a downloadable attachment.
