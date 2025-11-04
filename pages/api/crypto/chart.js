export default async function handler(req, res) {
  const { coinId, days = '7' } = req.query

  if (!coinId) {
    return res.status(400).json({ error: 'Coin ID is required' })
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    )
    
    if (!response.ok) {
      return res.status(404).json({ error: 'Chart data not found' })
    }
    
    const data = await response.json()
    
    const chartData = data.prices.map(([timestamp, price]) => ({
      time: timestamp,
      price: price
    }))
    
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json(chartData)
  } catch (error) {
    console.error('Error fetching chart data:', error)
    res.status(500).json({ error: 'Failed to fetch chart data' })
  }
}
