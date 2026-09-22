export interface ShortenerResultProps {
  originalUrl: string
  shortUrl: string
  copyStatus: string
  onCopy: () => void
}

function ShortenerResult({
  originalUrl,
  shortUrl,
  copyStatus,
  onCopy,
}: ShortenerResultProps) {
  return (
    <div className="shortener-result" aria-live="polite">
      <p>
        <strong>Original URL:</strong> {originalUrl}
      </p>

      <div className="shortener-result-row">
        <p>
          <strong>Shortened URL:</strong> {shortUrl}
        </p>

        <button type="button" className="copy-btn" onClick={onCopy}>
          {copyStatus || 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default ShortenerResult
