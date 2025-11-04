import Link from 'next/link'

export default function CryptoTable({ coins, loading }) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Top Cryptocurrencies</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center space-x-3 cursor-pointer">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-white font-medium">{coin.name}</div>
                        <div className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-white">
                  ${coin.current_price?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    coin.price_change_percentage_24h >= 0 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-red-900 text-red-200'
                  }`}>
                    {coin.price_change_percentage_24h?.toFixed(2) || '0.00'}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-300">
                  ${coin.market_cap?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-300">
                  ${coin.total_volume?.toLocaleString() || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
