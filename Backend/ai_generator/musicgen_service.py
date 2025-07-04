# ai_generator/musicgen_service.py
from transformers import MusicgenForConditionalGeneration, AutoProcessor
import torchaudio
import torch
import os
import uuid
import re
from django.conf import settings

# Create the generation directory
GEN_DIR = os.path.join(settings.MEDIA_ROOT, 'musicgen')
os.makedirs(GEN_DIR, exist_ok=True)

# Global variables to store model and processor (loaded once)
_model = None
_processor = None
_device = None

def load_model():
    """Load the MusicGen model and processor once."""
    global _model, _processor, _device
    
    if _model is None:
        print("Loading MusicGen model...")
        _processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        _model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
        _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        _model.to(_device)
        print(f"Model loaded on device: {_device}")
    
    return _model, _processor, _device

def sanitize_filename(name: str) -> str:
    """Sanitize the filename to be safe for file system."""
    name = name.strip().lower()
    name = re.sub(r'\s+', '_', name)              # Replace spaces with underscores
    name = re.sub(r'[^\w\-.]', '', name)          # Keep only alphanumerics, underscores, hyphens, and dots
    return name

def generate_music(prompt: str, duration_sec: int = 20) -> str:
    """Generate music based on the prompt and return the file URL."""
    # Load model if not already loaded
    model, processor, device = load_model()
    
    # Create filename
    base_name = sanitize_filename(prompt)
    uid = str(uuid.uuid4())[:8]
    filename = f"{base_name}_{uid}.wav"
    out_path = os.path.join(GEN_DIR, filename)
    
    print(f"Generating music for prompt: '{prompt}'")
    
    # Generate music
    inputs = processor(text=[prompt], return_tensors="pt").to(device)
    max_new_tokens = int(duration_sec * 25.6)  # or duration_sec * 25 for rough duration control
    
    with torch.no_grad():  # Save memory during generation
        audio_values = model.generate(**inputs, max_new_tokens=max_new_tokens)
    
    # Process audio tensor
    audio_tensor = audio_values[0].cpu()
    if audio_tensor.dim() == 3:
        audio_tensor = audio_tensor.squeeze(0)
    elif audio_tensor.dim() == 1:
        audio_tensor = audio_tensor.unsqueeze(0)
    
    # Save the audio file
    torchaudio.save(out_path, audio_tensor, sample_rate=32000)
    
    # Return the URL path relative to MEDIA_URL
    return f"{settings.MEDIA_URL}musicgen/{filename}"