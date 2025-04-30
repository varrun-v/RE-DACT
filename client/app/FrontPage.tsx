"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TextRedactor() {
  const [inputMethod, setInputMethod] = useState<"paste" | "upload">("paste");
  const [text, setText] = useState("");
  const [redactionLevel, setRedactionLevel] = useState<"light" | "medium" | "heavy">("medium");
  const [output, setOutput] = useState("");

  const handleRedact = async () => {
    const formData = new FormData();
    formData.append("redaction_level", redactionLevel);
  
    if (inputMethod === "paste") {
      formData.append("text", text);
    } else {
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput.files?.[0]) {
        formData.append("file", fileInput.files[0]);
      }
    }
  
    const response = await fetch("http://localhost:8000/api/redact", {
      method: "POST",
      body: formData,
    });
  
    const redactedText = await response.text();
    setOutput(redactedText);
  };
  

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "redacted.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Input Method</h2>
        <RadioGroup 
          defaultValue="paste" 
          className="flex gap-4" 
          onValueChange={(value) => setInputMethod(value as "paste" | "upload")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paste" id="paste" />
            <Label htmlFor="paste">Paste Text</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload">Upload File</Label>
          </div>
        </RadioGroup>
      </div>

      {inputMethod === "paste" ? (
        <Textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            accept=".txt,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>Choose File (.txt, .docx)</span>
            </Button>
          </Label>
          {text && (
            <Textarea
              value={text}
              readOnly
              className="min-h-[200px] mt-2"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Label>Redaction Level:</Label>
        <Select 
          value={redactionLevel} 
          onValueChange={(value) => setRedactionLevel(value as "light" | "medium" | "heavy")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="heavy">Heavy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleRedact} className="w-full">
        Redact
      </Button>

      {output && (
        <div className="space-y-2">
          <Label>Output:</Label>
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px]"
          />
          <Button variant="outline" className="w-full" onClick={handleDownload}>
            Download Redacted Text
          </Button>
        </div>
      )}
    </Card>
  );
}
