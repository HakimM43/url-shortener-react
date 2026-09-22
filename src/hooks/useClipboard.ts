import { useState } from 'react'

export function useClipboard() {
  const [copyStatusMap, setCopyStatusMap] = useState<Record<string, string>>({})

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatusMap((previous) => ({ ...previous, [key]: 'Copied!' }))
      return true
    } catch {
      setCopyStatusMap((previous) => ({ ...previous, [key]: 'Copy failed' }))
      return false
    }
  }

  return { copyStatusMap, copyText }
}
