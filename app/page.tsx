'use client'

import { useState } from "react";
import { generateShortUrl } from "./actions";

export default function Home() {

  const [shortendUrl, setShortenedUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formdata = new FormData(e.currentTarget);
    const url = formdata.get('url') as string

    try {
      const response = await generateShortUrl(url)
      setShortenedUrl(`${window.location.origin}/${response.shortCode}`)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setLoading(false)
    }

  }
  
  return (
    <main className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">URL Shortener</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="url" name="url" placeholder="Paste your link here (https://...)" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          <button type="submit" className="bg-blue-600 text-white rounded-sm p-2 cursor-pointer font-semibold hover:bg-blue-700 transition">

            {loading ? (
              <div className="flex justify-center items-center">
                {/* Tailwind Spinner SVG */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              'Shorten'
            )}

          </button>
        </form>

        {shortendUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-center">
            <p className="text-sm text-green-700">Your shortenend link:</p>
            <a href={shortendUrl} target="_blank" className="text-blue-600 font-bold underline break-all">
              {shortendUrl}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
