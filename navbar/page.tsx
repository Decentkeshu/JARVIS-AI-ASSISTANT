"use client";
import { usePathname } from "next/navigation";
export default function Header({ontoggle}) {
  const pathname = usePathname();
  return (
    <header style={{
      width: '100%',
      // padding: ' 10px',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position:'fixed',
      zIndex:'100',
      boxSizing:'border-box',
      height: '50px',
      top: '0',
      left : '0',
      padding: '0 16px'


    }}>
      {/* <a href={pathname === "/sidebar"? "/" : "/sidebar"} style={{color: '#fff',textDecoration:'none'}}>{pathname === "/sidebar"?"Hide Sidebar":"Show Sidebar"}</a> */}
      <button onClick={ontoggle} className="navside">Sidebar</button>
      <h1 style={{marginLeft : '10%'}}>JARVIS</h1>
      <nav>
        
        <a href="/" style={{ color: '#fff', marginRight: '16px',textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ color: '#fff', marginRight: '16px',textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ color: '#fff',marginRight: '13px',textDecoration: 'none' }}>Contact</a>
      </nav>
    </header>
  );
}