'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { Plus, RefreshCw, Database, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setIsLoading(true)
      // Aqui você fará as chamadas para sua API
      // const response = await api.get('/dashboard')
      // setData(response.data)
      
      // Dados mockados para demonstração
      setData([
        { id: 1, title: 'Produtos', count: 150, icon: Database },
        { id: 2, title: 'Vendas', count: 45, icon: TrendingUp },
      ])
    } catch (error) {
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header authenticated />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Bem-vindo ao sistema Ayzis
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dados...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cards de resumo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          {item.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {item.count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ações rápidas */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Ações Rápidas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    href="/dashboard/database/produtos"
                    variant="outline"
                    className="p-4 h-auto flex flex-col items-center space-y-2"
                  >
                    <Database className="h-8 w-8" />
                    <span>Gerenciar Produtos</span>
                  </Button>
                  
                  <Button
                    href="/dashboard/database/vendas"
                    variant="outline"
                    className="p-4 h-auto flex flex-col items-center space-y-2"
                  >
                    <TrendingUp className="h-8 w-8" />
                    <span>Gerenciar Vendas</span>
                  </Button>
                  
                  <button
                    onClick={fetchData}
                    className="p-4 h-auto flex flex-col items-center space-y-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="h-8 w-8" />
                    <span>Atualizar Dados</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer authenticated />
      <ToastContainer position="bottom-right" />
    </div>
  )
}
