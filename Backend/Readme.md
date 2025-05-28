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
│   ├── accounts/               # User registration, email verification, JWT auth
│   ├── ai_generator/           # Handles AI music generation + download
│   ├── AudioNova/              # Django main project directory
│   ├── mediahub/               # Music library, playlists, playback
│   ├── media/                  # Stores uploaded/generated audio
├── audiocraft-project/         # FastAPI + MusicGen service
├── Frontend/                   # frontend

```

---

## ⚙️ Technology Stack

| Component         | Tech Used                       |
|------------------|----------------------------------|
| Backend API       | Django + Django REST Framework   |
| Auth              | JWT (SimpleJWT), email verify    |
| AI Music Engine   | FastAPI + Meta MusicGen (Audiocraft) |
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
- `GET /generated-songs/<id>/download/` — Secure download(authenticated owner only)

---

## 🤖 MusicGen Setup (FastAPI + Audiocraft)

> Requires: **Python 3.9.x**, **PyTorch 2.1.0**, **ffmpeg**

### Setup Instructions:

```bash
# Step into the FastAPI project
cd audiocraft-project
python3.9 -m venv env
source env/bin/activate

# Install PyTorch first
pip install torch==2.1.0

# Then audiocraft (stable or latest)
pip install -U git+https://github.com/facebookresearch/audiocraft.git

# Install ffmpeg if not available
sudo apt install ffmpeg   # or use conda

# Run the FastAPI server
uvicorn musicgen_api.main:app --reload --port 8001
```

### File Output:
- Audio is saved in: `Backend/media/musicgen/`
- Filenames follow: `prompt_cleaned_<uuid>.wav`


## 🧠 Credits

- Music generation powered by [Meta’s MusicGen](https://github.com/facebookresearch/audiocraft)
- Developed with Django REST Framework + FastAPI

---

## 📄 License

- Code: MIT License  
- MusicGen models: CC-BY-NC 4.0 (non-commercial use)

---
