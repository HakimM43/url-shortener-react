import { useEffect, useState } from 'react'

export interface ShortenedLinkEntry {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: string
}

const STORAGE_KEY = 'shortened-links-history'

export function usePersistentHistory() {
  const [history, setHistory] = useState<ShortenedLinkEntry[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const savedHistory = window.localStorage.getItem(STORAGE_KEY)

    if (!savedHistory) {
      return
    }

    try {
      const parsedHistory = JSON.parse(savedHistory) as ShortenedLinkEntry[]

      if (Array.isArray(parsedHistory)) {
        setHistory(parsedHistory)
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  return { history, setHistory }
}
