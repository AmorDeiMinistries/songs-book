"use client"

import { useEffect, useState } from "react"
import { Bookmark } from "lucide-react"

export default function AddToCollectionButton({ slug }: { slug: string }) {

const [saved, setSaved] = useState(false)

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("myCollection") || "[]")
  setSaved(stored.includes(slug))
}, [slug])

const toggleCollection = (e:any) => {

e.stopPropagation()

const stored = JSON.parse(localStorage.getItem("myCollection") || "[]")

let updated

if (stored.includes(slug)) {
  updated = stored.filter((s:string) => s !== slug)
  setSaved(false)
} else {
  updated = [...stored, slug]
  setSaved(true)
}

localStorage.setItem("myCollection", JSON.stringify(updated))

}

return (

<button
onClick={toggleCollection}

className="
fixed bottom-6 right-6
z-[200]

w-14 h-14
rounded-full

flex items-center justify-center

bg-white
border border-slate-200

shadow-xl

active:scale-95
transition
"
>

<Bookmark
size={26}
className={saved ? "fill-blue-600 text-blue-600" : "text-slate-500"}
/>

</button>

)
}