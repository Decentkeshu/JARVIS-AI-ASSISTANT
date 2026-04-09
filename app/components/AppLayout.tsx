"use client"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "../../navbar/page"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  return (
    <>
      <div className={`layout ${sidebarOpen ? "open" : "closed"}`} style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Navbar ontoggle={() => setSidebarOpen(prev => !prev)} />
        <Sidebar isopen={sidebarOpen} />
        <div className="main">
          {children}
        </div>
      </div>
    </>
  )
}