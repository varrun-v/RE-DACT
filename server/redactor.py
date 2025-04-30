import spacy

nlp = spacy.load("en_core_web_sm")

REDACTION_LEVELS = {
    "light": ["PERSON"],
    "medium": ["PERSON", "GPE", "ORG"],
    "heavy": ["PERSON", "GPE", "ORG", "DATE", "CARDINAL", "TIME", "MONEY"]
}

EMAIL_REGEX = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

def redact_text(text: str, level: str) -> str:

    text = re.sub(EMAIL_REGEX, "[REDACTED]", text)

    doc = nlp(text)
    target_labels = REDACTION_LEVELS.get(level, [])
    redacted = text

    # Replace entities from the back to preserve offsets
    for ent in reversed(doc.ents):
        if ent.label_ in target_labels:
            redacted = redacted[:ent.start_char] + "[REDACTED]" + redacted[ent.end_char:]

    return redacted
