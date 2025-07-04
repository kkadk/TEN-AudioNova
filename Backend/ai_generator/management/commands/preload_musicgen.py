# ai_generator/management/commands/preload_musicgen.py
import os
from django.core.management.base import BaseCommand
from ai_generator.musicgen_service import load_model

class Command(BaseCommand):
    help = 'Preload the MusicGen model to improve first-time generation speed'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting MusicGen model preload...'))
        
        try:
            # Create management directory if it doesn't exist
            os.makedirs(os.path.dirname(__file__), exist_ok=True)
            
            # Load the model
            load_model()
            self.stdout.write(
                self.style.SUCCESS('Successfully preloaded MusicGen model!')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Failed to preload model: {str(e)}')
            )