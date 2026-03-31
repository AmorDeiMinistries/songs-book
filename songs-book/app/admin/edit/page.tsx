"use client"

import { useState, useEffect } from "react"

export default function EditSong() {

  const [songs, setSongs] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/songs")
      .then(res => res.json())
      .then(data => setSongs(data))
  }, [])

  const updateSong = async () => {
    const res = await fetch("/api/songs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    })

    if (res.ok) {
      setSongs(prev =>
        prev.map(s => s.id === editing.id ? editing : s)
      )

      setMessage("Song updated successfully")
      setEditing(null)

      setTimeout(() => setMessage(""), 2000)
    } else {
      setMessage("Failed to update song")
    }
  }

  // Search filter
  const filteredSongs = songs.filter((song:any) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Song Editor
        </h1>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search song title (Telugu)..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {message && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}

        {filteredSongs.map((song:any)=>(
          <div
            key={song.id}
            className={`bg-white border rounded-lg p-4 mb-4 shadow-sm ${
              editing?.id === song.id
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >

            <div className="flex justify-between items-center">

              <h3 className="font-semibold text-lg">
                {song.title}
              </h3>

              <button
                onClick={()=>setEditing(song)}
                className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
              >
                Edit
              </button>

            </div>

            {editing?.id === song.id && (

              <div className="mt-4">

                <textarea
                  value={editing.lyrics}
                  onChange={(e)=>
                    setEditing({
                      ...editing,
                      lyrics:e.target.value
                    })
                  }
                  className="w-full h-64 border rounded p-3 font-mono text-sm leading-relaxed"
                />

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={updateSong}
                    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={()=>setEditing(null)}
                    className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            )}

          </div>
        ))}

        {filteredSongs.length === 0 && (
          <p className="text-gray-500 mt-6">
            No songs found.
          </p>
        )}

      </div>

    </main>
  )
}