from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .musicgen_service import generate_music
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate/")
async def generate(prompt: str = Form(...)):
    try:
        file_url = generate_music(prompt)
        return JSONResponse(content={"file_url": file_url})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)