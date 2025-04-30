from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, FileResponse
from redactor import redact_text
import tempfile
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/redact")
async def redact_endpoint(
    text: str = Form(None),
    redaction_level: str = Form(...),
    file: UploadFile = File(None)
):
    input_text = text
    file_mode = False

    if file:
        content = await file.read()
        input_text = content.decode("utf-8")
        file_mode = True

    if not input_text:
        return PlainTextResponse("No input provided.", status_code=400)

    result = redact_text(input_text, redaction_level)

    if file_mode:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".txt", mode="w", encoding="utf-8") as tmp:
            tmp.write(result)
            tmp_path = tmp.name
        return FileResponse(tmp_path, filename="redacted.txt", media_type="text/plain")

    return PlainTextResponse(result)
