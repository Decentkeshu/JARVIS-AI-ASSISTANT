"use client"
import { useState, useRef, useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"

interface Message {
  sender: string;
  text: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatInput() {
  const Params = useParams()
  const id = Params?.id
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [message, setmessage] = useState<string>("")
  const [reply, setreply] = useState<Message[]>([])
  const [loading, setloading] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      const userMessages = messagesRef.current.querySelectorAll(".user")
      const lastUser = userMessages[userMessages.length - 1] as HTMLElement
      if (lastUser) {
        messagesRef.current.scrollTop = lastUser.offsetTop
      } else {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    }
  }, [reply])

  useEffect(() => {
    const saved: Chat[] = JSON.parse(localStorage.getItem("chats") || "[]");
    const currentChat = saved.find((chat: Chat) => chat.id === id);

    if (currentChat && currentChat.messages && currentChat.messages.length > 0) {
      setreply(currentChat.messages);
    } else {
      setreply([]);
    }
  }, [id]);

  const navItems = [
    {
      name: "Home",
      href: "/",
      active: pathname === "/" || pathname.startsWith("/sidebar")
    },
    {
      name: "Sidebar",
      href: "/sidebar",
      active: pathname.startsWith("/sidebar")
    }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)])
      setShowMenu(false)
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handlesend = async () => {
    if (!message.trim()) return;

    setloading(true);
    const formdata = new FormData();
    formdata.append("message", message);

    attachments.forEach((file: File) => {
      formdata.append("files", file);
    });

    const saved: Chat[] = JSON.parse(localStorage.getItem("chats") || "[]");

    const updatedChats = saved.map((chat: Chat) => {
      if (chat.id === id) {
        return {
          ...chat,
          title:
            chat.title === "New Chat" && chat.messages.length === 0
              ? message.slice(0, 30)
              : chat.title,
          messages: [
            ...(chat.messages || []),
            { sender: "user", text: message }
          ]
        };
      }
      return chat;
    });

    localStorage.setItem("chats", JSON.stringify(updatedChats));
    window.dispatchEvent(new Event("chatsUpdated"));

    setreply(prev => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formdata
      });

      const data = await res.json();

      const savedAgain: Chat[] = JSON.parse(localStorage.getItem("chats") || "[]");

      const updatedWithAI = savedAgain.map((chat: Chat) => {
        if (chat.id === id) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: "ai", text: data.reply }
            ]
          };
        }
        return chat;
      });

      localStorage.setItem("chats", JSON.stringify(updatedWithAI));
      window.dispatchEvent(new Event("chatsUpdated"));

      setreply(prev => [...prev, { sender: "ai", text: data.reply }]);

    } catch (error: unknown) {
      console.log("Error:", error);
    }

    setloading(false);
    setmessage("");
    setAttachments([]);
  };

  return (
    <div className="chat-container">

     
      <div className="messages" ref={messagesRef}>
        {reply.map((msg: Message, i: number) => (
          <div key={i} className={`reply ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="reply ai">Loading...</div>
        )}
      </div>

      
      {attachments.length > 0 && (
        <div className="attachments">
          {attachments.map((file: File, index: number) => (
            <div key={index} className="chip">
              {file.type.startsWith('image/') ? '🖼️' : '📄'}
              {file.name.length > 18 ? file.name.slice(0, 18) + '…' : file.name}
              <span className="chip-remove" onClick={() => removeAttachment(index)}>✕</span>
            </div>
          ))}
        </div>
      )}

      <div className="welcome">{reply.length === 0 && <h1>Welcome To JARVIS</h1>}</div>

      
      <div className={`input-row ${reply.length === 0 ? "centered" : ""}`}>

       
        <div className="menu-wrapper">
          <button className="plus-btn" onClick={() => setShowMenu(prev => !prev)}>+</button>

          
          {showMenu && (
            <>
              <div className="backdrop" onClick={() => setShowMenu(false)} />
              <div className="dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => { imageRef.current?.click(); setShowMenu(false) }}
                >🖼️ Upload photo</div>
                <div
                  className="dropdown-item"
                  onClick={() => { fileRef.current?.click(); setShowMenu(false) }}
                >📄 Upload file</div>
              </div>
            </>
          )}
        </div>

       
        <input ref={imageRef} type="file" accept="image/*" multiple hidden onChange={handleFileChange} />
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" multiple hidden onChange={handleFileChange} />

       
        <input
          type="text"
          className="text-input"
          placeholder="Welcome home sir"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handlesend() }}
        />

       
        <button className="send-btn" onClick={handlesend}>↑</button>

      </div>
    </div>
  )
}
