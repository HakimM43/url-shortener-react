/// <reference types="node" />

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed.' },
      { status: 405 },
    )
  }

  let body: { url?: string }

  try {
    body = (await request.json()) as { url?: string }
  } catch {
    return Response.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    )
  }

  const longUrl = body.url?.trim()

  if (!longUrl) {
    return Response.json(
      { error: 'Please provide a valid URL to shorten.' },
      { status: 400 },
    )
  }

  const token = process.env.BITLY_TOKEN

  if (!token) {
    return Response.json(
      { error: 'Bitly token is not configured.' },
      { status: 500 },
    )
  }

  try {
    const bitlyResponse = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ long_url: longUrl }),
    })

    const data = (await bitlyResponse.json()) as {
      link?: string
      error?: string
      description?: string
    }

    if (!bitlyResponse.ok) {
      return Response.json(
        {
          error: data.description || data.error || 'Unable to shorten URL with Bitly.',
        },
        { status: bitlyResponse.status || 500 },
      )
    }

    if (!data.link) {
      return Response.json(
        { error: 'Bitly did not return a shortened URL.' },
        { status: 502 },
      )
    }

    return Response.json({ shortUrl: data.link })
  } catch {
    return Response.json(
      { error: 'Failed to reach the URL shortening service.' },
      { status: 502 },
    )
  }
}
