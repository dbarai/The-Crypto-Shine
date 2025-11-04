import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import ChartComponent from '../../components/ChartComponent'

export default function CoinDetail() {
  const router = useRouter()
  const { id } = router.query
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchCoinData()
    }
  }, [id])

  const fetchCoinData = async () => {
    try {
      const response = await fetch(`/api/crypto/coin?id=${id}`)
      const data = await response.json()
      if (data.error) {
        setCoin(null)
      } else {
        setCoin(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching coin data:', error)
      setCoin(null)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">
              Coin Not Found
            </h1>
            <p className="text-gray-400 mb-6">Invalid coin ID or unavailable data. Please try again.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-green-600 transition-colors"
            >
              Back to Markets
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getExplorerUrl = () => {
    if (coin.links?.blockchain_site?.[0]) {
      return coin.links.blockchain_site[0]
    }
    
    const symbol = coin.symbol?.toLowerCase()
    const explorers = {
      'eth': 'https://etherscan.io',
      'btc': 'https://blockchain.info',
      'bsc': 'https://bscscan.com',
      'sol': 'https://solscan.io',
      'matic': 'https://polygonscan.com',
      'dot': 'https://polkascan.io',
      'ada': 'https://cardanoscan.io',
      'xrp': 'https://xrpscan.com'
    }
    
    return explorers[symbol] || `https://www.coingecko.com/en/coins/${coin.id}`
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>{`${coin.name} (${coin.symbol?.toUpperCase()}) - TheCryptoShine`}</title>
        <meta name="description" content={`Real-time data for ${coin.name}: price, market cap, volume, and blockchain information.`} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img src={coin.image?.large} alt={coin.name} className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold text-white">{coin.name}</h1>
              <p className="text-gray-400 text-lg">{coin.symbol?.toUpperCase()}</p>
            </div>
            <span className={`text-lg px-3 py-1 rounded-full ${
              coin.market_data?.price_change_percentage_24h >= 0 
                ? 'bg-green-900 text-green-200' 
                : 'bg-red-900 text-red-200'
            }`}>
              {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Current Price</p>
              <p className="text-2xl font-bold text-white">
                ${coin.market_data?.current_price?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">24h High/Low</p>
              <p className="text-lg font-semibold text-white">
                ${coin.market_data?.high_24h?.usd?.toLocaleString()} / ${coin.market_data?.low_24h?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Market Cap</p>
              <p className="text-lg font-semibold text-white">
                ${coin.market_data?.market_cap?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Volume (24h)</p>
              <p className="text-lg font-semibold text-white">
                ${coin.market_data?.total_volume?.usd?.toLocaleString()}
              </p>
            </div>
          </div>

          <a
            href={getExplorerUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mb-8"
          >
            View on Blockchain Explorer
          </a>
        </div>

        <ChartComponent coinId={id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Market Data</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Circulating Supply</span>
                <span className="text-white">{coin.market_data?.circulating_supply?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Total Supply</span>
                <span className="text-white">{coin.market_data?.total_supply?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Max Supply</span>
                <span className="text-white">{coin.market_data?.max_supply?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">About {coin.name}</h3>
            <p className="text-gray-300 leading-relaxed">
              {coin.description?.en ? 
                coin.description.en.split('. ')[0] + '.' : 
                'No description available for this cryptocurrency.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
