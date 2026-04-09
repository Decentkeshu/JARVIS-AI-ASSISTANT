// 'use client'

// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   Show,
// } from "@clerk/nextjs";
// import Link from "next/link";

// export const Navigation = () => {
//   return (
//     <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex-shrink-0">
            
//           </div>

//           <div className="flex items-center gap-4">

//             {/* Show when user is NOT logged in */}
//             <Show when="signed-out">

//               <nav className="navbar bg-body-tertiary">
//   <form className="container-fluid justify-content-start">
//     <button className="btn btn-outline-success me-2" type="button">
//       <SignInButton mode="modal">
//                 <button className="px-4 py-2 text-sm rounded-md border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/5 transition">
//                   Sign In
//                 </button>
//               </SignInButton>

//     </button>
//     <button className="btn btn-sm btn-outline-secondary" type="button">

//               <SignUpButton mode="modal">
//                 <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>

//     </button>
//   </form>
// </nav>

              

//             </Show>

//             {/* Show when user IS logged in */}
//             <Show when="signed-in">
              
              
//               <nav className="navbar bg-body-tertiary">
//             <form className="container-fluid justify-content-start">
//           <button className="btn btn-outline-success me-2" type="button">
//             <Link href="/" className="text-xl font-semibold text-[var(--foreground)] home btn btn-danger">
//               HOME
//             </Link>
//           </button>
//         <button className="btn btn-sm btn-outline-secondary btn btn-success user" type="button">
//           <UserButton afterSignOutUrl="/" />
//         </button>
//         </form>
//           </nav>

//             </Show>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

'use client'

import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";

export const Navigation = () => {
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
          background: linear-gradient(135deg, #6366f1, #a855f7);
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

          {/* Brand */}
          <Link href="/" className="nav-brand">
            <div className="brand-icon"><img src="/jarvis.svg" alt="Jarvis Logo" width={100} height={40} /></div>
            <span className="brand-text">JARVIS</span>
          </Link>

          {/* Auth Actions */}
          <div className="nav-actions">

            {/* Signed Out: Show Sign In + Sign Up */}
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="btn-signin">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-signup">Get Started →</button>
              </SignUpButton>
            </Show>

            {/* Signed In: Show Home link + User avatar */}
            <Show when="signed-in">
              <Link href="/" className="nav-home-link">Home</Link>
              <div className="divider" />
              <UserButton afterSignOutUrl="/" />
            </Show>

          </div>
        </div>
      </nav>
    </>
  );
};