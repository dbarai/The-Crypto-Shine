import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'

export default function Header() {
  const { connectWallet, disconnectWallet, account, isConnected } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              TheCryptoShine
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Markets</a>
              <a href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
              <a href="/news" className="text-gray-300 hover:text-white transition-colors">News</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-full">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                Connect Wallet
              </button>
            )}
            
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="/" className="block text-gray-300 hover:text-white py-2">Markets</a>
            <a href="/portfolio" className="block text-gray-300 hover:text-white py-2">Portfolio</a>
            <a href="/news" className="block text-gray-300 hover:text-white py-2">News</a>
          </div>
        )}
      </nav>
    </header>
  )
}
