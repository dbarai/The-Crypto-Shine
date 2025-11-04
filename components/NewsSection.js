import { useState, useEffect } from 'react'

export default function NewsSection() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      setNews(data.slice(0, 5))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching news:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Latest News</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Latest News</h3>
      <div className="space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <h4 className="text-white font-medium mb-1 line-clamp-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'Recent'}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
