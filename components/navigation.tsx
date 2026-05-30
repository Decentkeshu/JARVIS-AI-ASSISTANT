'use client'

// import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { usePathname,useRouter } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [signedin,setsignedin] = useState(false);
  const [isregistered,setisregistered] = useState(false);
  const [form,setfrom] = useState({name : '',email : '',password:'',cpassword:''});

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // your auth logic here
    console.log("Signing in with:", form);
    setsignedin(false);
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .brand-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          background-color : #00ff9f;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.01em;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-signin {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #e2e8f0;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .btn-signin:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }

        .btn-signup {
          // background: green-700;
          border: none;
          color: #fff;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 0 20px rgba(99,102,241,0.3);

        }

        .btn-signup:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(99,102,241,0.45);
        }

        .nav-home-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-home-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        .divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">

        
          <Link href="/" className="nav-brand">
            <div className="brand-icon"><img src="/jarvis.svg" alt="Jarvis Logo" width={100} height={40} /></div>
            <span className="brand-text">JARVIS</span>
          </Link>

           
         <div className="nav-actions">
 <button
              onClick={() => router.push(pathname === "/signin" ? "/" : "/signin")}
              className="btn-signup bg-green-800"
            >
              {pathname === "/signin" ? "CLOSE" : "SIGN IN"}
            </button>
 
  <Link href="/" className="btn-signon">Home</Link>
</div>

        </div>
      </nav>
    </>
  );
};