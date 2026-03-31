"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Music, LayoutGrid, Library, SortAsc, ListOrdered, Layers, Heart, Bookmark } from "lucide-react"
import songs from "@/data/songs.json"
import Fuse from "fuse.js"
import { transliterate } from "@/lib/transliterate"

export default function HomePage() {

const [search,setSearch] = useState("")

const fuse = useMemo(()=>{
return new Fuse(
songs.map((s:any)=>({...s,tE:transliterate(s.title)})),
{
keys:["title","tE"],
threshold:0.3
})
},[])

const results = useMemo(()=>{
if(!search.trim()) return []
return fuse.search(search).map(r=>r.item)
},[search,fuse])


const categories = [
{
title:"Songs of Praise",
href:"/all",
icon:<Music size={22}/>,
color:"from-blue-500 to-indigo-600"
},
{
title:"Alphabet of Praise",
href:"/alphabet",
icon:<ListOrdered size={22}/>,
color:"from-sky-500 to-blue-600"
},
{
title:"Themes of Praise",
href:"/type",
icon:<Layers size={22}/>,
color:"from-pink-500 to-rose-600"
},
{
title: "Chosen Hymns",
href: "/collections",
icon: <Bookmark size={22} />,
color: "from-orange-500 to-amber-600"
}
]

return (

<main className="min-h-screen">

{/* ambient lighting */}

<div className="fixed inset-0 pointer-events-none">

<div className="absolute top-[-15%] left-[-10%] w-[min(70vw,600px)] h-[min(70vw,600px)] bg-blue-400/20 blur-[160px] rounded-full"/>

<div className="absolute bottom-[-10%] right-[-10%] w-[min(60vw,500px)] h-[min(60vw,500px)] bg-indigo-400/20 blur-[160px] rounded-full"/>

</div>


<div className="relative z-10 max-w-5xl mx-auto px-6 py-24">


{/* HERO */}

<header className="relative mb-36 flex flex-col items-center">

{/* halo lighting */}

<div className="absolute -top-24 w-[min(90vw,600px)] h-[300px] bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 blur-[120px] opacity-40"/>

<h1 className="text-6xl md:text-[110px] font-[1000] tracking-[0.15em] uppercase leading-none text-slate-950 dark:text-white pl-[0.15em] drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]">

<span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">

AMOR DEI

</span>

</h1>


<div className="w-full flex items-center justify-between mt-6 px-1 max-w-xl">

<div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"/>

<span className="mx-8 text-sm md:text-lg font-light tracking-[1.6em] uppercase text-slate-400 whitespace-nowrap pl-[1.5em]">

Ministries

</span>

<div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"/>

</div>


{/* verse card */}

<div className="mt-16 max-w-xl mx-auto text-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl px-10 py-8 shadow-lg">

  <p className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
    Sing joyfully to the Lord, you righteous<br/>  
    It is fitting for the upright to praise Him
  </p>

  <div className="mt-6 flex justify-center">
    <div className="h-[2px] w-10 bg-blue-500 rounded-full"></div>
  </div>

  <p className="mt-4 text-xs tracking-[0.35em] text-slate-400 uppercase font-semibold">
    Psalm 33:1
  </p>

</div>

</header>


{/* SEARCH */}

<div className="max-w-2xl mx-auto -mt-20 mb-28 relative">

<div className="relative flex items-center gap-4 px-8 py-5 rounded-[40px]
bg-gradient-to-b from-white to-slate-100 dark:from-zinc-900 dark:to-zinc-800
border border-white/70
shadow-[0_25px_70px_rgba(0,0,0,0.18),inset_0_2px_3px_rgba(255,255,255,0.8)]
focus-within:shadow-[0_30px_90px_rgba(0,0,0,0.25)]
transition">

<div className="absolute inset-x-4 top-[2px] h-[2px] bg-white/90 blur-sm rounded-full"/>

<Search className="text-slate-400"/>

<input
type="text"
placeholder="Search songs..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full bg-transparent outline-none text-[16px]"
/>

</div>


{search && (

<div className="absolute z-50 w-full mt-4 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.2)] max-h-[400px] overflow-y-auto">

{results.length===0 && (
<div className="p-10 text-center text-sm opacity-40">
No songs found
</div>
)}

{results.map((song:any)=>(
<Link
key={song.id}
href={`/song/${song.slug}`}
className="block px-6 py-4 hover:bg-blue-50 dark:hover:bg-zinc-800 transition"
>
{song.title}
</Link>
))}

</div>

)}

</div>


{/* CARDS */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 perspective-[1200px]">

{categories.map((c,i)=>(

<Link key={i} href={c.href} className="group block">

<div className="relative p-10 rounded-[2.5rem]
bg-gradient-to-br from-white/90 to-white/60 dark:from-zinc-900/80 dark:to-zinc-800/60
border border-white/60
backdrop-blur-xl
shadow-[0_35px_90px_rgba(0,0,0,0.18)]
transition-all duration-500
hover:-translate-y-6
hover:rotate-x-6
hover:rotate-y-[-6deg]
hover:shadow-[0_70px_160px_rgba(0,0,0,0.28)]
overflow-hidden">

<div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-blue-400/40 to-purple-400/30 blur-[120px] opacity-0 group-hover:opacity-100 transition duration-700"/>

<div className="flex items-center gap-6 relative z-10">

<div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-[0_12px_25px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-110 transition`}>

{c.icon}

</div>

<h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-600">

{c.title}

</h3>

</div>

</div>

</Link>

))}

</div>




</div>

</main>
)
}