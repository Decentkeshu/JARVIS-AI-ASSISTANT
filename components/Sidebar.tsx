"use client"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { IoTrashBinSharp } from "react-icons/io5"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Sidebar({ isopen }: { isopen: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [chats, setchats] = useState<any[]>([])
  const [showchats, setshowchats] = useState(false)
  const [ismodalopen, setismodalopen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")


  const userId = typeof window !== "undefined" 
    ? localStorage.getItem("userId") 
    : null;

  const loadChats = async () => {
    if (!userId) return;

    try {
     
      const res = await fetch(`${BASE_URL}/api/chat/sessions/${userId}`);
      const data = await res.json();

      if (data.success && data.sessions.length > 0) {
        setchats(data.sessions); 
      } else {
        setchats([]);
      }
    } catch (error) {
      console.log("Failed to load chats:", error);
      setchats([]);
    }
  }

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    const syncChats = () => loadChats()
    window.addEventListener("chatsUpdated", syncChats)
    return () => window.removeEventListener("chatsUpdated", syncChats)
  }, [])

  const newchat = () => {
    const newSessionId = Date.now().toString();
    router.push(`/chat/${newSessionId}`)
  }

  return (
    <div style={{
      width: isopen ? "220px" : "0",
      overflow: "hidden",
      transition: "width 0.25s ease",
      flexShrink: 0,
      borderRight: isopen ? "1px solid #2a2a2a" : "0",
      height: "100vh",
      position: "sticky",
      top: 0,
      overflowY: "auto",
      zIndex: 100,
    }}>
      <div className="Sidebar">
        <button onClick={newchat}>New Chat</button>

        <button onClick={() => {
          setismodalopen(true)
          setshowchats(true)
        }}>Search Chat</button>

        <button onClick={() => setshowchats(prev => !prev)}>
          {showchats ? "Hide Chats" : "Show Chats"}
        </button>

        {showchats && (
          <div>
            <h3>Previous Chats</h3>
            {chats.length === 0 ? (
              <p>No chats</p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className="chats_12"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px",
                    borderRadius: "6px",
                    background: pathname === `/chat/${chat._id}` ? "#2a2a2a" : "transparent"
                  }}
                >
                  <span
                    onClick={() => router.push(`/chat/${chat._id}`)}
                    style={{ cursor: "pointer", display: "flex" }}
                  >
                    {chat.lastMessage?.length > 20 
                      ? chat.lastMessage.slice(0, 20) + "..." 
                      : chat.lastMessage || "New Chat"}
                  </span>
                  <IoTrashBinSharp
                    onClick={() => deleteChat(chat._id)}
                    style={{ cursor: "pointer", marginLeft: "15px" }}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {ismodalopen && (
          <>
            <div
              onClick={() => setismodalopen(false)}
              style={{
                position: "fixed", top: 0, left: 0,
                width: "100vw", height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)", zIndex: 200
              }}
            />
            <div style={{
              position: "fixed", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#1a1a1a", border: "1px solid #333",
              borderRadius: "12px", padding: "20px", width: "400px", zIndex: 201
            }}>
              <input
                type="text"
                placeholder="Search chats:"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div>
                {chats
                  .filter(chat => chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(chat => (
                    <div
                      key={chat._id}
                      style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
                      onClick={() => { router.push(`/chat/${chat._id}`); setismodalopen(false) }}
                    >
                      {chat.lastMessage || "New Chat"}
                      <IoTrashBinSharp onClick={(e) => { e.stopPropagation(); deleteChat(chat._id) }} />
                    </div>
                  ))}
              </div>
              <button onClick={() => setismodalopen(false)}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  async function deleteChat(sessionId: string) {
    try {
      await fetch(`${BASE_URL}/api/chat/session/${sessionId}`, { method: "DELETE" });
      await loadChats(); // refresh sidebar
      if (pathname === `/chat/${sessionId}`) router.push("/");
    } catch (error) {
      console.log("Delete failed:", error);
    }
  }
}