import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "songs.json")

// GET - Fetch all songs
export async function GET() {
  try {
    const file = fs.readFileSync(filePath, "utf-8")
    return NextResponse.json(JSON.parse(file))
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read songs file" },
      { status: 500 }
    )
  }
}

// POST - Add new song
export async function POST(req: Request) {
  try {
    const newSong = await req.json()
    newSong.category = newSong.category || ""
    // Basic validation
    if (
  !newSong.title ||
  !newSong.slug ||
  !newSong.lyrics
){
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const file = fs.readFileSync(filePath, "utf-8")
    const songs = JSON.parse(file)

    // Duplicate slug check
    const slugExists = songs.some(
      (song: any) => song.slug === newSong.slug
    )

    if (slugExists) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      )
    }

    songs.push(newSong)

    fs.writeFileSync(filePath, JSON.stringify(songs, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while saving song" },
      { status: 500 }
    )
  }
}
// PUT - Update existing song
export async function PUT(req: Request) {
  try {
    const updatedSong = await req.json()

    const file = fs.readFileSync(filePath, "utf-8")
    const songs = JSON.parse(file)

    const index = songs.findIndex((song: any) => song.id === updatedSong.id)

    if (index === -1) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      )
    }


    songs[index] = updatedSong

    fs.writeFileSync(filePath, JSON.stringify(songs, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update song" },
      { status: 500 }
    )
  }
}
