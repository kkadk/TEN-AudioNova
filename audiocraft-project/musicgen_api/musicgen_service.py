from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write
import os
import uuid
import re

GEN_DIR = "../TEN-AudioNova/Backend/media/musicgen"
os.makedirs(GEN_DIR, exist_ok=True)

MEDIA_URL_BASE = "http://localhost:8000/media/musicgen"

model = MusicGen.get_pretrained('facebook/musicgen-small')
model.set_generation_params(duration=10)

def sanitize_filename(name: str) -> str:
    """
    Converting the prompt text into a safe filename:
    - lowercase
    - replace spaces with underscores
    - remove any character except letters, numbers, underscores, hyphens, dots
    """
    name = name.strip().lower()
    name = re.sub(r'\s+', '_', name)
    name = re.sub(r'[^\w\-\.]', '', name)
    return name

def generate_music(prompt: str) -> str:

    base_name = sanitize_filename(prompt)
    uid = str(uuid.uuid4())[:8]  
    filename = f"{base_name}_{uid}"
    out_path = os.path.join(GEN_DIR, filename)

    print(f"Generating for prompt: {prompt} -> saving as {filename}")

    wav = model.generate([prompt])
    audio_write(out_path, wav[0].cpu(), model.sample_rate, strategy="loudness")

    return f"{MEDIA_URL_BASE}/{filename}.wav"