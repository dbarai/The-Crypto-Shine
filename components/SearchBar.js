import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/coin/${query.toLowerCase()}`)
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any crypto (BTC, ETH, SOL, XRP...)"
            className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 rounded-md hover:from-blue-600 hover:to-green-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
