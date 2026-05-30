import { NextRequest, NextResponse } from "next/server"
import { storechatserver } from "../../../services/chatservices";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const message = formData.get("message") as string
    const sessionId = formData.get("sessionId") as string
    const userId = formData.get("userId") as string 
    const files = formData.getAll("files") as File[]
    console.log("userId:", userId);
console.log("sessionId:", sessionId);

    let fileContent = "";
    let filename: string | null = null;

    if (files.length > 0) {
      try {
        const file = files[0];
        filename = file.name;
        fileContent = await file.text();
      } catch {
        fileContent = "Could not read file";
      }
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system", content: `You are a helpful assistant 
             write in beautiful paragraph.
             Every bullet points in new line.
            `
          },
          {
            role: "user",
            content: message + (fileContent ? `\n\nFile content:\n${fileContent}` : "")
          }
        ],
      }),
    })

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || "No response"

   
    await storechatserver(sessionId, message, reply, filename, userId);

    return NextResponse.json({ reply })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}