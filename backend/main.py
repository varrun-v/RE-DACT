from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from redactor import redact_text

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

    if file:
        content = await file.read()
        input_text = content.decode("utf-8")

    if not input_text:
        return PlainTextResponse("No input provided.", status_code=400)

    result = redact_text(input_text, redaction_level)
    return PlainTextResponse(result)
