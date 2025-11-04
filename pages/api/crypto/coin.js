export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Coin ID is required' })
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
    
    if (!response.ok) {
      return res.status(404).json({ error: 'Coin not found' })
    }
    
    const data = await response.json()
    
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching coin data:', error)
    res.status(500).json({ error: 'Failed to fetch coin data' })
  }
}
