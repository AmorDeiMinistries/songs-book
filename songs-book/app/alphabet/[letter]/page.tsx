import songs from "../../../data/songs.json"
import Link from "next/link"

type Song = {
  id: string
  title: string
  slug: string
  category: string
  lyrics: string
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ letter: string }>
}) {

const { letter } = await params
const decodedLetter = decodeURIComponent(letter)

const filteredSongs = (songs as Song[]).filter((song) =>
  song.title.trim().startsWith(decodedLetter)
)

return (

<main className="min-h-screen overflow-x-hidden">

{/* SAME BACKGROUND */}

<div className="fixed inset-0 pointer-events-none">

<div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[140px] rounded-full"/>

<div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/20 blur-[140px] rounded-full"/>

</div>


<div className="relative z-10 max-w-4xl mx-auto px-6 py-24">


{/* HEADER */}

<header className="text-center mb-16">

<h1 className="text-4xl md:text-5xl font-black tracking-tight">

Songs starting with

<span className="ml-2 text-indigo-600 dark:text-indigo-400">
{decodedLetter}
</span>

</h1>

<p className="mt-3 text-slate-500 dark:text-slate-400">

Browse songs beginning with this letter

</p>

</header>



{/* SONG LIST */}

{filteredSongs.length === 0 ? (

<div className="text-center text-slate-500 dark:text-slate-400 py-20">

No songs found.

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

<h3 className="text-lg font-semibold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 dark:text-indigo-400">

{song.title.trim()}

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