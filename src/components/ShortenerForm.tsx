import { useEffect, useState, type FormEvent } from 'react'

import ShortenerResult from './ShortenerResult'
import { useClipboard } from '../hooks/useClipboard'
import { usePersistentHistory } from '../hooks/usePersistentHistory'

function ShortenerForm() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const { history, setHistory } = usePersistentHistory()
  const { copyStatusMap, copyText } = useClipboard()

  useEffect(() => {
    if (shortUrl && originalUrl) {
      setHistory((previous) => {
        const nextEntry = {
          id: `${Date.now()}-${shortUrl}`,
          originalUrl,
          shortUrl,
          createdAt: new Date().toISOString(),
        }

        const alreadyExists = previous.some(
          (entry) =>
            entry.originalUrl === originalUrl && entry.shortUrl === shortUrl,
        )

        if (alreadyExists) {
          return previous
        }

        return [nextEntry, ...previous]
      })
    }
  }, [originalUrl, shortUrl, setHistory])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError('Please enter a URL to shorten.')
      setShortUrl('')
      setOriginalUrl('')
      setCopyStatus('')
      return
    }

    setError('')
    setIsLoading(true)
    setCopyStatus('')

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      })

      const data = (await response.json()) as { shortUrl?: string; error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Unable to shorten this URL right now.')
      }

      if (!data.shortUrl) {
        throw new Error('Bitly returned an empty shortened URL.')
      }

      setOriginalUrl(trimmedUrl)
      setShortUrl(data.shortUrl)
      setUrl(trimmedUrl)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to shorten this URL right now.',
      )
      setShortUrl('')
      setOriginalUrl('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (link: string) => {
    if (!link) {
      return
    }

    const success = await copyText(link, link)

    if (success) {
      setCopyStatus('Copied!')
      return
    }

    setCopyStatus('Copy failed')
  }

  return (
    <section className="shortener-form-section" aria-label="URL shortener form">
      <form className="shortener-form" onSubmit={handleSubmit} noValidate>
        <input
          aria-label="URL to shorten"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Shorten a link here..."
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'shortener-error' : undefined}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten It!'}
        </button>
      </form>

      {error && (
        <p id="shortener-error" role="alert">
          {error}
        </p>
      )}

      {shortUrl && originalUrl && (
        <ShortenerResult
          originalUrl={originalUrl}
          shortUrl={shortUrl}
          copyStatus={copyStatusMap[shortUrl] ?? copyStatus}
          onCopy={() => handleCopy(shortUrl)}
        />
      )}

      {history.length > 0 && (
        <div className="history-panel" aria-label="Shortened links history">
          <h2>Recent Links</h2>

          <ul className="history-list">
            {history.map((entry) => (
              <li key={entry.id} className="history-item">
                <div className="history-url-group">
                  <span className="history-label">Original</span>
                  <a href={entry.originalUrl} target="_blank" rel="noreferrer">
                    {entry.originalUrl}
                  </a>
                </div>

                <div className="history-url-group">
                  <span className="history-label">Short</span>
                  <a href={entry.shortUrl} target="_blank" rel="noreferrer">
                    {entry.shortUrl}
                  </a>
                </div>

                <button
                  type="button"
                  className="copy-btn history-copy-btn"
                  onClick={() => handleCopy(entry.shortUrl)}
                >
                  {copyStatusMap[entry.shortUrl] ?? 'Copy'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default ShortenerForm
