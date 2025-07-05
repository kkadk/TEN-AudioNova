#!/usr/bin/env bash

echo "🔧 Running backend build..."

# Run database migrations without prompt
python manage.py migrate --noinput

# Collect all static files for production
python manage.py collectstatic --noinput

echo "Build finished."
