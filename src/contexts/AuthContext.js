'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/libs/axios'

const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [authIsLoading, setAuthIsLoading] = useState(true)

  // Recuperando token do localStorage caso exista
  useEffect(() => {
    async function retrieveToken() {
      setAuthIsLoading(true)
      try {
        const storedToken = localStorage.getItem('ayzis-token')
        if (storedToken) {
          setToken(storedToken)
          api.defaults.headers.common.Authorization = `Bearer ${storedToken}`
        }
      } catch (error) {
        console.error('Erro ao recuperar token:', error)
      } finally {
        setAuthIsLoading(false)
      }
    }
    retrieveToken()
  }, [])

  // Passando o método de logout para as configs do axios
  useEffect(() => {
    api.registerInterceptTokenManager(logout)
  }, [])

  // Método para salvar o token no localStorage e depois no estado
  function saveToken(token) {
    localStorage.setItem('ayzis-token', token)
    setToken(token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  // Método para remover o token (Fazer logout)
  function logout() {
    localStorage.removeItem('ayzis-token')
    setToken(null)
    setUser(null)
    api.defaults.headers.common.Authorization = null
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authIsLoading,
        saveToken,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
