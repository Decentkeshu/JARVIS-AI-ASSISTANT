"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createuser, loggedinuser } from "@/services/chatservices";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ user: "", email: "", password: "", cpassword: "" });
  const [isregistered, setisregistered] = useState(false);
  const [errors, setErrors] = useState<{ msg: string }[]>([]);
  const [loginerror, setLoginerror] = useState("");
  const [loginwith, setLoginwith] = useState<"username" | "email">("username");
  const [loading, setLoading] = useState(false);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signeduser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { user, email, password, cpassword } = form;
    const { status, data } = await createuser(user, email, password, cpassword);
    setLoading(false);
    if (status === 422) { setErrors(data.errors); return; }
    if (status === 200) {
      setErrors([]);
      setisregistered(false);
      setForm({ user: "", email: "", password: "", cpassword: "" });
    }
  };

  const loginuser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoginerror("");
    const identifier = loginwith === "username" ? form.user : form.email;
    const result = await loggedinuser(identifier, form.password);
    setLoading(false);
    if (result._id) {
      localStorage.setItem("userId", result._id);
      router.push("/chat/new");
    } else {
      setLoginerror("Invalid credentials. Please try again.");
    }
  };

  const inputClass = "w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-base text-white placeholder-zinc-600 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-200";

  return (
   
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex">

    
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-16 relative overflow-hidden">

      
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl" />

    
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl   bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">JARVIS</span>
        </div>

     
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Your AI<br />
            <span className="text-transparent bg-clip-text  bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
              Assistant
            </span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
            Chat smarter, work faster. Jarvis is your intelligent companion for every task.
          </p>

       
          <div className="flex flex-col gap-3 mt-10">
            {["⚡ Lightning fast responses", "🔒 Secure & private", "🧠 Context-aware AI"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 w-fit backdrop-blur-sm">
                <span className="text-zinc-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-zinc-500 text-sm italic">"The best AI assistant I've ever used."</p>
          <p className="text-zinc-600 text-xs mt-1">— Early access user</p>
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gradient-to-br from-indigo-500 to-purple-600x ml-5 p-5" />

     
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-16">
      <div className="w-full px-6">

   
          <div className="flex lg:hidden  gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl  bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center p-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">JARVIS</span>
          </div>

       
         <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">

    
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 mb-8">
              <button
                type="button"
                onClick={() => { setisregistered(false); setErrors([]); setLoginerror(""); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${!isregistered ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setisregistered(true); setErrors([]); setLoginerror(""); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isregistered ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Sign Up
              </button>
            </div>

            {!isregistered ? (
              <form onSubmit={loginuser} className="flex flex-col gap-5">
                <div className="mb-2">
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                  <p className="text-zinc-400">Sign in to continue to Jarvis</p>
                </div>

          
                <div className="flex gap-2">
                  {(["username", "email"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setLoginwith(method)}
                      className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 capitalize ${loginwith === method ? "border-indigo-400 bg-indigo-500/10 text-indigo-300" : "border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {loginerror && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">
                    <p className="text-red-400 text-sm">{loginerror}</p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                    {loginwith === "username" ? "Username" : "Email"}
                  </label>
                  {loginwith === "username" ? (
                    <input name="user" type="text" placeholder="johndoe" value={form.user} onChange={handlechange} required className={inputClass} />
                  ) : (
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handlechange} required className={inputClass} />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Password</label>
                  <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handlechange} required className={inputClass} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-base font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 mt-2"
                >
                  {loading ? "Signing in..." : "Sign In →"}
                </button>
              </form>

            ) : (
              <form onSubmit={signeduser} className="flex flex-col gap-5">
                <div className="mb-2">
                  <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
                  <p className="text-zinc-400">Get started with Jarvis today</p>
                </div>

                {errors.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">
                    <ul className="flex flex-col gap-1.5">
                      {errors.map((err, i) => (
                        <li key={i} className="text-red-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          {err.msg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Username</label>
                  <input name="user" type="text" placeholder="johndoe" value={form.user} onChange={handlechange} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Email</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handlechange} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Password</label>
                  <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handlechange} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Confirm Password</label>
                  <input name="cpassword" type="password" placeholder="••••••••" value={form.cpassword} onChange={handlechange} required className={inputClass} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-base font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 mt-2"
                >
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}