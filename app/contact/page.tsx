export default function Contacts() {
  return (
    <div className="flex justify-center p-8">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 w-full max-w-md shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-medium text-lg flex-shrink-0">
            KK
          </div>
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">Keshav Kumar</h2>
            <p className="text-sm text-zinc-500">Admin · Frontend Developer</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 flex flex-col gap-4">

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              ✉️
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wide mb-0.5">Email</p>
              <a href="mailto:msd76017@gmail.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                msd76017@gmail.com
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              🐙
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wide mb-0.5">GitHub</p>
              <a href="https://github.com/Decentkeshu" target="_blank" rel="noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                github.com/Decentkeshu
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              💼
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wide mb-0.5">LinkedIn</p>
              <a href="https://www.linkedin.com/in/decentkeshu/" target="_blank" rel="noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                linkedin.com/in/decentkeshu
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}