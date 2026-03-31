"use client"

export default function NoCopyLyrics({ lyrics }: { lyrics: string }) {
  return (
    <div
      className="
      no-copy
      whitespace-pre-line
      text-[1.35rem] sm:text-[1.6rem]
      leading-[2.1]
      font-normal
      tracking-tight
      text-slate-700 dark:text-slate-300
      text-center
      max-w-2xl
      mx-auto
      "
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {lyrics}
    </div>
  )
}