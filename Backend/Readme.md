# TEN AudioNova 🎧  
An AI-powered music generation and streaming platform built using **Django**, **FastAPI**, and Meta's **MusicGen (Audiocraft)**.

---

## 🌟 Overview

TEN AudioNova allows users to:
- 🔐 Register and authenticate with JWT
- 🎧 Upload, manage, and stream music
- 📀 Create and share playlists
- 💬 Like, search, and play audio tracks
- 🤖 Generate new music using AI from text prompts
- 💾 Download and browse personal AI-generated tracks

---

## 📁 Project Structure

```
TEN-AudioNova/
├── Backend/                     # Django project
│   ├── accounts/               # User registration, email verification, JWT 
│   ├── ai_generator/           # Handles AI music generation + download
│   ├── AudioNova/              # Django main project directory
│   ├── mediahub/               # Music library, playlists, playback
│   ├── media/                  # Stores uploaded/generated audio
├── Frontend/                   # frontend

```

---

## ⚙️ Technology Stack

| Component         | Tech Used                        |
|------------------|-----------------------------------|
| Backend API       | Django + Django REST Framework   |
| Auth              | JWT (SimpleJWT), email verify    |
| AI Music Engine   | Meta MusicGen (HuggingFace)      |
| Audio Storage     | Django Media folder              |
| Search & Playlists| Custom REST endpoints            |

---

## 🔗 Key API Endpoints

### 🎼 Music & Playlists (`/api/`)
- `GET /songs/` — List your uploaded songs  
- `POST /songs/` — Upload a song (title, genre, file)
- `PUT /songs/<song_id>` — Update a song (title, genre, file)  
- `PATCH /songs/<song_id>` — Update a specific attribute of the song
- `DELETE /songs/<song_id>` — Upload a song (title, genre, file)  

- `GET /public-playlists/` — Browse public playlists  
- `POST /playlists/` — Create a new playlist  
- `POST /playlist-songs/` — Add a song to a playlist  
- `GET /search-songs/?title=...&genre=...` — Search songs  
- `POST /songs/<song_id>/like/` — Like a song      
- `POST /songs/<song_id>/unlike/` — Unlike a song 
- `GET /songs/<song_id>/play/` — Play + increment count  
- `GET /playlist/<id>/` — View playlist details  
- `GET /playback-history/` — Your song listening history

### 👤 Auth & Accounts (`/api/auth/`)
- `POST /register/` — Register a new user  
- `GET /verify-email/<token>/` — Email verification  
- `POST /login/` — JWT access/refresh login  
- `POST /token/refresh/` — Refresh JWT token

### 🤖 AI Music Generator (`/api/ai/`)
- `POST /generate/` — Submit prompt to generate music  
- `GET /generated-songs/` — View your AI-generated songs  
- `GET /generated-songs/<id>/download/` — Secure download(authenticated users only)

---

## 🤖 Backend Setup After Cloning the TEN-AudioNova

> Requires: **Python 3**

### Setup Instructions:
For MacOS
```
# Step into the TEN-AudioNova/Backend
python3 -m venv .venv
source .venv/bin/activate #For MacOS
```
For Windows
```
# Step into the TEN-AudioNova/Backend
python3 -m venv .venv
.venv\Scripts\activate #For Windows
```
Platform Independent
```
pip install -r requirements.txt
#after installation
python manage.py migrate
#after database migrations
python manage.py runserver
```


## 🧠 Credits

- Music generation powered by [Meta’s MusicGen](https://github.com/facebookresearch/audiocraft)
- Developed with Django REST Framework + FastAPI

---

## 📄 License

- Code: MIT License  
- MusicGen models: CC-BY-NC 4.0 (non-commercial use)

---
