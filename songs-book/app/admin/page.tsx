"use client"

import { useState } from "react"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const categories = [
    "ఆరాధన",
    "సిలువ",
    "పునరుత్థానం",
    "పశ్చాత్తాపం",
    "ఉజ్జివం",
    "రాకడ",
    "పరలోకం",
    "పరిశుద్ధాత్మ",
    "వాక్యాధ్యనం",
    "వాగ్దానం",
    "ఆదరణ",
    "ప్రార్థన",
    "కృతజ్ఞత",
    "విశ్వాసము",
    "యేసు నామం",
    "ప్రేమ",
    "నిరీక్షణ",
    "కృప",
    "సన్నిధి",
    "స్తుతి",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newSong = {
      id: Date.now().toString(),
      title,
      slug,
      category: selectedCategory || "", // optional
      lyrics,
    }

    const res = await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })

    if (res.ok) {
      setMessage("Song Added Successfully")
      setTitle("")
      setSlug("")
      setLyrics("")
      setSelectedCategory(null)
    } else {
      setMessage("Error Adding Song")
    }
  }

  return (
    <main className="min-h-screen p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          placeholder="Song Title (Telugu)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Slug (english-hyphen-format)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        {/* CATEGORY BUTTONS */}
        <div>
          <p className="font-semibold mb-3">Select Category (Optional)</p>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat ? null : cat
                  )
                }
                className={`px-4 py-2 rounded-full border transition
                  ${
                    selectedCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          className="w-full border p-3 rounded h-40"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Song
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}