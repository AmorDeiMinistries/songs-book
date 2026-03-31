import fs from "fs"
import path from "path"
import Link from "next/link"
import { Music, ChevronRight, Sparkles, ArrowUpRight } from "lucide-react"

interface Song {
  id: string
  title: string
  slug: string
  category: string
  lyrics: string
}

export default async function AllSongsPage() {
  const filePath = path.join(process.cwd(), "data", "songs.json")
  const file = fs.readFileSync(filePath, "utf-8")
  const songs: Song[] = JSON.parse(file)

  // Sort alphabetically
  songs.sort((a, b) => a.title.localeCompare(b.title, "te"))

  return (
   <main className="min-h-screen transition-colors duration-1000 overflow-x-hidden">
      
      {/* 1. 3D LIGHTING ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
       <div className="fixed inset-0 pointer-events-none overflow-hidden">

  <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[140px] rounded-full"/>

  <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/20 blur-[140px] rounded-full"/>

</div>
        
        {/* 3D Grid Floor Effect */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        
        {/* 2. HI-TECH HEADER */}
<header className="mb-32 text-center flex justify-center">

  <div className="relative group max-w-fit">
    
    {/* Soft Outer Glow */}
    <div className="absolute -inset-2 bg-blue-500/10 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-blue-500/20"></div>
    
    <div className="relative px-8 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-sm">
      
      <h2 className="flex flex-col items-start gap-1">
        
        <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Songs of <span className="italic font-serif text-blue-600 dark:text-blue-500">Praise</span>
        </span>

      </h2>

    </div>

  </div>

</header>

        {/* 3. 3D FLOATING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-2000">
          {songs.map((song, index) => (
            <Link key={song.id} href={`/song/${song.slug}`} className="group">
              <div
                className="
                  relative
                  h-full p-8 rounded-[2.5rem]
                 bg-white/80 dark:bg-zinc-900/70
                  backdrop-blur-2xl
                  border border-white/60 dark:border-white/10
                  
                  /* High-Quality 3D Shadows */
                  shadow-[0_20px_50px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.7)]
                  dark:shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)]
                  
                  transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                  
                  /* 3D Lift & Tilt on Hover */
                  group-hover:-translate-y-4
                  group-hover:rotate-x-6
                  group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]
                  dark:group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                  group-hover:border-blue-500/30
                "
              >
                {/* 3D Glass Numbering */}
                <div className="absolute top-3 right-3 w-10 h-10 rounded-3xl bg-white/90 dark:bg-zinc-900/80 shadow-xl flex items-center justify-center border border-white/50 dark:border-white/10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-col h-full justify-between gap-12">
                  <div className="space-y-4">
                    
                    
                    <h3 className="text-2xl font-bold leading-tight tracking-tight uppercase group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {song.title}
                    </h3>
                  </div>

                  
                </div>

                {/* Specular Highlight Overlay */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {songs.length === 0 && (
          <div className="py-40 text-center">
            <div className="inline-block p-12 rounded-[3rem] bg-white/50 dark:bg-white/5 shadow-inner mb-8">
               <Music className="opacity-10 animate-pulse" size={60} />
            </div>
            <p className="text-sm font-bold tracking-[0.4em] opacity-30 uppercase">
              The anthology is empty
            </p>
          </div>
        )}

    

      </div>
    </main>
  )
}

