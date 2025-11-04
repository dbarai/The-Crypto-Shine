import Parser from 'rss-parser'

const parser = new Parser()

const RSS_FEEDS = [
  'https://cointelegraph.com/rss',
  'https://decrypt.co/feed',
  'https://news.bitcoin.com/feed/'
]

export default async function handler(req, res) {
  try {
    let allNews = []
    
    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl)
        if (feed.items) {
          allNews = [...allNews, ...feed.items.slice(0, 3)]
        }
      } catch (feedError) {
        console.error(`Error fetching from ${feedUrl}:`, feedError)
      }
    }
    
    allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json(allNews.slice(0, 10))
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
