import { useState, useEffect } from 'react'

export function useWallet() {
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
        setIsConnected(true)
        localStorage.setItem('walletConnected', 'true')
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    } else {
      alert('Please install MetaMask to connect your wallet!')
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    localStorage.removeItem('walletConnected')
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const checkConnection = async () => {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }

      checkConnection()

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  return {
    account,
    isConnected,
    connectWallet,
    disconnectWallet
  }
}
