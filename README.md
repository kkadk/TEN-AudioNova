# 🎵 TEN AudioNova

TEN AudioNova is a full-stack music streaming and AI music generation application where users can upload songs, create playlists, listen to tracks, and generate music using text prompts powered by AI.

---

## 🚀 Features

- 🔐 JWT-based user authentication (register, login, reset password)
- 🎶 Upload and manage audio songs
- 📃 Create and manage custom playlists
- ❤️ Like/unlike songs and track play count
- 🔍 Search music by title and genre
- 📊 Playback history tracking
- 🤖 AI music generator from text prompts (e.g. "calm lo-fi beat")
- 🖼️ Playlist cover image support
- 🎧 Audio streaming support

---

## 🛠️ Tech Stack

| Layer         | Tech                             |
|---------------|----------------------------------|
| Backend       | Django + Django REST Framework   |
| Auth          | JWT (SimpleJWT)                  |
| Database      | PostgreSQL (or SQLite for dev)   |
| Media Mgmt    | Django Media Files               |
| AI Generator  | Facebook's `musicgen` or similar |
| Frontend UI   | React.js or any frontend client  |

---

## 📂 Project Structure

```

backend/
├── api/
│   ├── auth/
│   ├── songs/
│   ├── playlists/
│   └── ai/
├── media/
├── static/
└── manage.py

````

---

## ⚙️ Setup Instructions

### 1. 🔧 Clone the Repo

```bash
git clone https://github.com/yogita0914/TEN-AudioNova.git
cd TEN-AudioNova
````

### 2. 🐍 Create Virtual Env & Install Dependencies

```bash
python -m venv venv
source venv/bin/activate  # for Linux/macOS
venv\Scripts\activate     # for Windows

pip install -r requirements.txt
```

### 3. 📦 Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. 📤 Run the Server

```bash
python manage.py runserver
```

The app will be live at `http://localhost:8000/`

---

## 🎯 API Documentation

Full API reference available in:

* [`api_reference2.pdf`](./api_reference2.pdf)
* Or access via Swagger (if enabled): `http://localhost:8000/swagger/`

---


---

## 💡 Future Improvements

* 🔊 Background music playback support
* 📱 Mobile-friendly frontend (React Native)
* ⏳ Song progress tracking
* 🧠 AI tune remixing or mood-based generation

---

## 📄 License

MIT License - use freely with attribution.

---
