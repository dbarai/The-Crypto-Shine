import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import CryptoTable from '../components/CryptoTable'
import NewsSection from '../components/NewsSection'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCryptoData()
  }, [])

  const fetchCryptoData = async () => {
    try {
      const response = await fetch('/api/crypto/markets')
      const data = await response.json()
      setCoins(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching crypto data:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>TheCryptoShine - Real-time Decentralized Crypto Market Data Platform</title>
        <meta name="description" content="Explore real-time cryptocurrency prices, market cap, and volume. Connect your wallet for decentralized portfolio tracking and access comprehensive blockchain data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            TheCryptoShine
          </h1>
          <p className="text-xl text-gray-300">
            Decentralized Crypto Market Intelligence
          </p>
        </div>

        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <CryptoTable coins={coins} loading={loading} />
          </div>
          <div className="lg:col-span-1">
            <NewsSection />
          </div>
        </div>

        <footer className="border-t border-gray-700 pt-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">TheCryptoShine</h3>
              <p className="text-gray-400">Decentralized crypto market analysis platform</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/api-docs" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="/sources" className="hover:text-white transition-colors">Blockchain Sources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Data Sources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>CoinGecko API</li>
                <li>Messari API</li>
                <li>Public Blockchain</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@thecryptoshine.com</li>
                <li>Twitter: @TheCryptoShine</li>
                <li>GitHub</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8 pt-4 border-t border-gray-800">
            <p>&copy; 2024 TheCryptoShine. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
