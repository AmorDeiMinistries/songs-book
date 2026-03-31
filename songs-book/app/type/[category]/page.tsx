import songs from "../../../data/songs.json"
import Link from "next/link"

type Song = {
  id: string
  title: string
  slug: string
  category: string
  lyrics: string
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {

const { category } = await params
const decodedCategory = decodeURIComponent(category)

const filteredSongs = (songs as Song[]).filter(
  (song) => song.category === decodedCategory
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

<header className="text-center mb-16">

<h1 className="text-4xl md:text-5xl font-black tracking-tight text-blue-600 dark:text-blue-400">

{decodedCategory}

</h1>

<p className="mt-3 text-slate-500 dark:text-slate-400">

Songs in this theme

</p>

</header>


{/* SONG LIST */}

{filteredSongs.length === 0 ? (

<div className="text-center py-20 text-slate-500 dark:text-slate-400">

No songs found in this category.

</div>

) : (

<div className="space-y-4">

{filteredSongs.map((song) => (

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

<h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-600">

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