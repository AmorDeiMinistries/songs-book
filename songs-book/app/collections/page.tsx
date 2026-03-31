"use client"

import { useEffect, useState } from "react"
import songs from "../../data/songs.json"
import Link from "next/link"

interface Song {
  id: string
  title: string
  slug: string
  category: string
  lyrics: string
}

export default function CollectionsPage() {

const [savedSlugs, setSavedSlugs] = useState<string[]>([])

useEffect(() => {
const stored = JSON.parse(localStorage.getItem("myCollection") || "[]")
setSavedSlugs(stored)
}, [])

const savedSongs = (songs as Song[]).filter((song) =>
savedSlugs.includes(song.slug)
)

return (

<main className="min-h-screen overflow-x-hidden">

{/* BACKGROUND LIGHTING */}

<div className="fixed inset-0 pointer-events-none">

<div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[140px] rounded-full"/>

<div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/20 blur-[140px] rounded-full"/>

</div>


<div className="relative z-10 max-w-4xl mx-auto px-6 py-24">


{/* HEADER */}

<header className="mb-32 text-center flex justify-center">

  <div className="relative group max-w-fit">
    
    {/* Soft Outer Glow */}
    <div className="absolute -inset-2 bg-blue-500/10 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-blue-500/20"></div>

    <div className="relative px-8 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-sm">

      <h2 className="flex flex-col items-center gap-2">

        <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Chosen <span className="italic font-serif text-blue-600 dark:text-blue-500">Hymns</span>
        </span>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Your saved songs of praise
        </span>

      </h2>

    </div>

  </div>

</header>



{/* SONG LIST */}

{savedSongs.length === 0 ? (

<div className="text-center py-20 text-slate-500 dark:text-slate-400">

No songs added yet.

</div>

) : (

<div className="space-y-4">

{savedSongs.map((song) => (

<Link
key={song.id}
href={`/song/${song.slug}`}
className="group block"
>

<div className="
p-5 rounded-2xl

bg-white/80 dark:bg-zinc-900/70
backdrop-blur-xl

border border-white/60 dark:border-white/10

shadow-[0_15px_40px_rgba(0,0,0,0.08)]

transition-all duration-300

hover:-translate-y-1
hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
hover:bg-white dark:hover:bg-zinc-800
">

<h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-blue-400">

{song.title}

</h3>

</div>

</Link>

))}

</div>

)}

</div>

</main>

)
}