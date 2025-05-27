from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import GeneratedSong

@admin.register(GeneratedSong)
class GeneratedSongAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'prompt', 'created_at', 'view_link')
    search_fields = ('user__username', 'prompt')
    list_filter = ('created_at',)
    readonly_fields = ('id', 'user', 'prompt', 'created_at')
    ordering = ('-created_at',)

    def view_link(self, obj):
        url = reverse('admin:ai_generator_generatedsong_change', args=[obj.id])
        return format_html('<a href="{}">View</a>', url)
    