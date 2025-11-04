export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch market data')
    }
    
    const data = await response.json()
    
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching market data:', error)
    res.status(500).json({ error: 'Failed to fetch market data' })
  }
}
