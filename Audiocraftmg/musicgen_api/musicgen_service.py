# musicgen_service.py
from transformers import MusicgenForConditionalGeneration, AutoProcessor
import torchaudio
import torch
import os
import uuid
import re

GEN_DIR = "../Backend/media/musicgen"
os.makedirs(GEN_DIR, exist_ok=True)

MEDIA_URL_BASE = "http://localhost:8000/media/musicgen"

# Load model and processor
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def sanitize_filename(name: str) -> str:
    name = name.strip().lower()
    name = re.sub(r'\s+', '_', name)              # Replace spaces with underscores
    name = re.sub(r'[^\w\-.]', '', name)          # Keep only alphanumerics, underscores, hyphens, and dots
    return name

def generate_music(prompt: str, duration_sec: int = 10) -> str:
    base_name = sanitize_filename(prompt)
    uid = str(uuid.uuid4())[:8]
    filename = f"{base_name}_{uid}.wav"
    out_path = os.path.join(GEN_DIR, filename)
    print(f"Generating music for prompt: '{prompt}'")
    inputs = processor(text=[prompt],return_tensors="pt").to(device)
    max_new_tokens = 256 # or duration_sec * 25 for rough duration control
    audio_values = model.generate(**inputs, max_new_tokens=max_new_tokens)
    audio_tensor = audio_values[0].cpu()
    if audio_tensor.dim() == 3:
        audio_tensor = audio_tensor.squeeze(0)
    elif audio_tensor.dim() == 1:
        audio_tensor = audio_tensor.unsqueeze(0)
    torchaudio.save(out_path, audio_tensor, sample_rate=32000)

    return f"{MEDIA_URL_BASE}/{filename}"