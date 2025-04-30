import spacy

nlp = spacy.load("en_core_web_sm")

REDACTION_LEVELS = {
    "light": ["PERSON", "EMAIL"],
    "medium": ["PERSON", "EMAIL", "GPE", "ORG"],
    "heavy": ["PERSON", "EMAIL", "GPE", "ORG", "DATE", "CARDINAL", "TIME", "MONEY"]
}

def redact_text(text: str, level: str) -> str:
    doc = nlp(text)
    target_labels = REDACTION_LEVELS.get(level, [])
    redacted = text

    # Replace entities from the back to preserve offsets
    for ent in reversed(doc.ents):
        if ent.label_ in target_labels:
            redacted = redacted[:ent.start_char] + "[REDACTED]" + redacted[ent.end_char:]

    return redacted
