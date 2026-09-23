# URL Shortener React App

A responsive URL shortening application built with React and TypeScript. Users can enter a long URL, shorten it using the Bitly API, copy the shortened URL, and view previously shortened links.

## Live Demo

https://url-shortener-react-seven.vercel.app/

## GitHub Repository

https://github.com/HakimM43/url-shortener-react

## Features

- Shorten long URLs using the Bitly API
- Display the original and shortened URL
- Copy shortened URLs to the clipboard
- Save shortened links in a Recent Links section
- Store link history using localStorage
- Validate empty URL input
- Display a loading state while a URL is being shortened
- Handle unsuccessful API requests and errors
- Responsive layout for different screen sizes
- Reusable React components
- Custom React hooks
- Secure server-side handling of the Bitly API token

## Technologies Used

- React
- TypeScript
- Vite
- CSS
- Bitly API
- Vercel
- localStorage
- Git
- GitHub

## React Concepts Used

- `useState`
- `useEffect`
- Controlled forms
- Event handling
- Conditional rendering
- List rendering
- Props
- Reusable components
- Custom hooks
- API requests

## Project Structure

- `Header.tsx` - Displays the navigation header
- `ShortenerForm.tsx` - Handles user input, validation, API requests, loading, and errors
- `ShortenerResult.tsx` - Displays the original and shortened URLs
- `useClipboard.ts` - Custom hook used for copying shortened URLs
- `usePersistentHistory.ts` - Custom hook used to save and load shortened-link history
- `api/shorten.ts` - Server-side API route that communicates with the Bitly API

## Installation

Clone the repository:

```bash
git clone https://github.com/HakimM43/url-shortener-react.git
```

Move into the project folder:

```bash
cd url-shortener-react
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Environment Variables

The application uses a Bitly access token to communicate with the Bitly API.

Add the following environment variable when deploying the application:

```env
BITLY_TOKEN=your_bitly_access_token
```

The Bitly token is handled on the server side so it is not exposed in the React frontend or uploaded to GitHub.

## Build

To create a production build, run:

```bash
npm run build
```

## Deployment

The application is deployed using Vercel. The Bitly API token is stored as a secure environment variable in the Vercel project settings.

Live application:

https://url-shortener-react-seven.vercel.app/

## Reflection

For this project, I created a URL shortener using React, TypeScript, the Bitly API, and Vercel. I focused on organizing the app into separate components and using React state to control the form, loading messages, errors, and the shortened URL result. I also added a Recent Links section so users can see links they shortened before.

One issue I ran into was figuring out how to use the Bitly API without exposing my access token. Since I did not want the token stored in the frontend or pushed to GitHub, I used an environment variable and a server-side API route to keep that information private.

I also had trouble after deploying the project. The shortener stayed on “Shortening...” and eventually showed a JSON error instead of returning a result. I went back through the API route, corrected how the Vercel function handled the request and response, and deployed the updated version. After fixing that, the shortener worked correctly.

This project helped me get more comfortable with React components, custom hooks, API requests, error handling, localStorage, and deployment. If I improved the project later, I would add stronger URL validation, a way to delete or clear saved links, and more details about each shortened URL.