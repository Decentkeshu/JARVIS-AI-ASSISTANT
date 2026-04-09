"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { IoTrashBinSharp } from "react-icons/io5"

export default function Sidebar({ isopen }: { isopen: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  const [chats, setchats] = useState<any[]>([])
  const [showchats, setshowchats] = useState(false)
  const [ismodalopen, setismodalopen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // ✅ Load chats
  const loadChats = () => {
    const saved = JSON.parse(localStorage.getItem("chats") || "[]")

    if (saved.length === 0) {
      const defaultChat = [{ id: "1", title: "Welcome chat", messages: [] }]
      localStorage.setItem("chats", JSON.stringify(defaultChat))
      setchats(defaultChat)
    } else {
      setchats(saved)
    }
  }

  // Initial load
  useEffect(() => {
    loadChats()
  }, [])

  // Sync chats when localStorage changes
  useEffect(() => {
    const syncChats = () => loadChats()

    window.addEventListener("storage", syncChats)
    window.addEventListener("focus", syncChats)
    window.addEventListener("chatsUpdated", syncChats)

    return () => {
      window.removeEventListener("storage", syncChats)
      window.removeEventListener("focus", syncChats)
      window.removeEventListener("chatsUpdated", syncChats)
    }
  }, [])

  // ✅ Create new chat
  const newchat = () => {
    const newChatObj = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: []
    }

    const saved = JSON.parse(localStorage.getItem("chats") || "[]")
    const updated = [...saved, newChatObj]

    localStorage.setItem("chats", JSON.stringify(updated))
    window.dispatchEvent(new Event("chatsUpdated"))

    setchats(updated)
    router.push(`/chat/${newChatObj.id}`)
  }

  // ✅ Delete chat
  const deleteChat = (id: string) => {
    const saved = JSON.parse(localStorage.getItem("chats") || "[]")
    const updated = saved.filter((chat: any) => chat.id !== id)

    localStorage.setItem("chats", JSON.stringify(updated))
    window.dispatchEvent(new Event("chatsUpdated"))

    setchats(updated)

    if (pathname === `/chat/${id}`) {
      router.push("/")
    }
  }

  return (
    <div
      style={{
        width: isopen ? "220px" : "0",
        overflow: "hidden",
        transition: "width 0.25s ease",
        flexShrink: 0,
        borderRight: isopen ? "1px solid #2a2a2a" : "0",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        zIndex : 100,
        
      }}
    >
      <div className="Sidebar">

        {/* Buttons */}
        <button onClick={newchat}>New Chat</button>

        <button onClick={() => {
          setismodalopen(true)
          setshowchats(true)
        }}>
          Search Chat
        </button>

        <button onClick={() => setshowchats(prev => !prev)}>
          {showchats ? "Hide Chats" : "Show Chats"}
        </button>

        {/* Chat List */}
        {showchats && (
          <div>
            <h3>Previous Chats</h3>

            {chats.length === 0 ? (
              <p>No chats</p>
            ) : (
              chats
                .slice()
                .sort((a, b) => Number(b.id) - Number(a.id))
                .map((chat) => (
                  <div
                    key={chat.id}
                    className="chats_12"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px",
                      borderRadius: "6px",
                      background:
                        pathname === `/chat/${chat.id}`
                          ? "#2a2a2a"
                          : "transparent"
                    }}
                  >
                    <span
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                     {chat.title.length > 20 ? chat.title.slice(0, 12) + "..." : chat.title}
                       <IoTrashBinSharp
                      onClick={() => deleteChat(chat.id)}
                      style={{ cursor: "pointer", justifyContent : "space-between", marginLeft : "15px"}}
                    />
                    </span>

                   
                  </div>
                ))
            )}
          </div>
        )}

        {/* Search Modal */}
        {ismodalopen && (
          <>
            <div
              onClick={() => setismodalopen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 200
              }}
            />

            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "20px",
                width: "400px",
                zIndex: 201
              }}
            >
              <input
                type="text"
                placeholder="Search the chats:"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              
              />

              <div>
                {chats
                  .filter(chat =>
                    chat.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map(chat => (
                    <div
                      key={chat.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        router.push(`/chat/${chat.id}`)
                        setismodalopen(false)
                      }}
                    >
                      {chat.title}

                      <IoTrashBinSharp
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteChat(chat.id)
                        }}
                      />
                    </div>
                  ))}
              </div>

              <button onClick={() => setismodalopen(false)}>
                Close
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}