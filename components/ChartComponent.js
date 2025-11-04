import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function ChartComponent({ coinId }) {
  const [chartData, setChartData] = useState([])
  const [chartType, setChartType] = useState('line')
  const [timeRange, setTimeRange] = useState('7')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (coinId) {
      fetchChartData()
    }
  }, [coinId, timeRange])

  const fetchChartData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/crypto/chart?coinId=${coinId}&days=${timeRange}`)
      const data = await response.json()
      setChartData(data)
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Price Chart</h3>
        <div className="flex space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-1 border border-gray-600"
          >
            <option value="1">24H</option>
            <option value="7">7D</option>
            <option value="30">30D</option>
            <option value="90">90D</option>
            <option value="365">1Y</option>
          </select>
          <div className="flex bg-gray-700 rounded-lg p-1 border border-gray-600">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md transition-colors ${
                chartType === 'line' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-md transition-colors ${
                chartType === 'area' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Area
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#9CA3AF"
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6' }}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#9CA3AF"
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none',
                  borderRadius: '8px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`, 'Price']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
