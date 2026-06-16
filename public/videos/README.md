# Video Assets

Este directorio contiene archivos de video para la sección de Video Scroll Scrub.

## Archivo Actual

- `scrub-video.mp4` - Video principal para la sección de scroll scrub (descargado de YouTube)

## Para Agregar Nuevo Video

1. **Descargar video** (opcional, si usas YouTube):
```bash
yt-dlp -f "best[ext=mp4]" -o "nombre-video.mp4" "https://youtube.com/watch?v=VIDEO_ID"
```

2. **Optimizar para scroll scrub** (cada frame debe ser keyframe):
```bash
ffmpeg -i nombre-video.mp4 -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p -an -y nombre-video-optimized.mp4
```
- `-g 1` = Cada frame es keyframe (crítico para scrubbing suave)
- `-crf 20` = Calidad alta (18-23 es recomendado)
- `-an` = Sin audio

3. **Usar en VideoScrubSection.tsx**:
```jsx
<source src="/videos/tu-video.mp4" type="video/mp4" />
```

## Recomendaciones

- **Duración**: 2-4 minutos (para scroll de 4000px)
- **Resolución**: 1920x1080 o superior
- **Formato**: MP4 H.264
- **Tamaño**: 20-50MB (después de optimizar)
- **Poster**: YouTube thumbnail o imagen personalizada

## Git LFS (para archivos grandes)

Si quieres versionar videos en Git, usa Git LFS:

```bash
# Instalar Git LFS
git lfs install

# Trackear videos
git lfs track "*.mp4"

# Commit normalmente
git add .gitattributes
git commit -m "Setup Git LFS for videos"
```

## Ignoradas por Defecto

Por seguridad y rendimiento, todos los `.mp4`, `.mov`, `.avi` en este directorio están ignorados en `.gitignore`.

Para compartir videos, considera:
- Servicio de almacenamiento en la nube (AWS S3, Google Cloud)
- CDN (Cloudflare, Vercel Edge)
- Documentación para descargar (README de instrucciones)
