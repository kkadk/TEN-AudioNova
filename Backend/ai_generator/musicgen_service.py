# ai_generator/musicgen_service.py
import requests
import uuid
import os
import re
from django.conf import settings

GEN_DIR = os.path.join(settings.MEDIA_ROOT, 'musicgen')
os.makedirs(GEN_DIR, exist_ok=True)

HF_API_URL = "https://api-inference.huggingface.co/models/facebook/musicgen-small"
HF_TOKEN = os.getenv("HF_TOKEN") 

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

def sanitize_filename(name: str) -> str:
    name = name.strip().lower()
    name = re.sub(r'\s+', '_', name)
    name = re.sub(r'[^\w\-.]', '', name)
    return name

def generate_music(prompt: str) -> str:
    response = requests.post(HF_API_URL, headers=HEADERS, json={"inputs": prompt})

    if response.status_code != 200:
        raise Exception(f"Hugging Face API Error: {response.text}")
    
    filename = f"{sanitize_filename(prompt)}_{uuid.uuid4().hex[:8]}.wav"
    file_path = os.path.join(GEN_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(response.content)

    return f"{settings.MEDIA_URL}musicgen/{filename}"