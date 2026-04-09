"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const words = ["Everything", "Code", "Literature", "Art", "Problem Solving", "Critical Thinking"]
  const [cycleText, setCycleText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const speed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCycleText(currentWord.substring(0, cycleText.length + 1))
        if (cycleText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200)
        }
      } else {
        setCycleText(currentWord.substring(0, cycleText.length - 1))
        if (cycleText === "") {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [cycleText, isDeleting, wordIndex])

  return (
    <div className="page">

      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="logo">JARVIS</div>
        <div className="nav-status">
          <div className="status-dot" />
          Online &amp; Ready
        </div>
      </nav> */}

      {/* Hero */}
      <main className="hero">
        <span className="badge"><img src="/jarvis.svg" alt="Jarvis Logo" width={150} height={70} /></span>

        <h1 className="headline">
          Ask Jarvis for<br />
          <span className="typewriter">{cycleText}</span>
        </h1>

        <p className="sub">
          Your intelligent companion for code, creativity,<br />
          problem solving, and beyond.
        </p>

        <Link href="/chat/new" className="cta-btn">
          Start Conversation
        </Link>

        <div className="chips">
          {["Code", "Literature", "Art", "Problem Solving", "Critical Thinking"].map((chip) => (
            <span key={chip} className="chip">{chip}</span>
          ))}
        </div>
      </main>

      <footer className="footer">
        Jarvis is always ready — type anything to begin
      </footer>
    </div>
  )
}