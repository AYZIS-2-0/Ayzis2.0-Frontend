'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { api } from '@/libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowLeft, Plus, Edit, Trash2, Search, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function VendasPage() {
  const [vendas, setVendas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchVendas()
  }, [])

  async function fetchVendas() {
    try {
      setIsLoading(true)
      // const response = await api.get('/vendas')
      // setVendas(response.data)
      
      // Dados mockados para demonstração
      setVendas([
        {
          id: 1,
          cliente: 'João Silva',
          produto: 'Produto A',
          quantidade: 2,
          valorUnitario: 29.99,
          valorTotal: 59.98,
          data: '2025-07-10',
          status: 'Concluída'
        },
        {
          id: 2,
          cliente: 'Maria Santos',
          produto: 'Produto B',
          quantidade: 1,
          valorUnitario: 49.99,
          valorTotal: 49.99,
          data: '2025-07-09',
          status: 'Pendente'
        }
      ])
    } catch (error) {
      toast.error('Erro ao carregar vendas')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredVendas = vendas.filter(venda =>
    venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.produto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      try {
        // await api.delete(`/vendas/${id}`)
        setVendas(vendas.filter(v => v.id !== id))
        toast.success('Venda excluída com sucesso!')
      } catch (error) {
        toast.error('Erro ao excluir venda')
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída':
        return 'bg-green-100 text-green-800'
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header authenticated />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link 
                href="/dashboard/database"
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Vendas
              </h1>
            </div>
            <p className="text-gray-600">
              Controle suas vendas e relatórios
            </p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar vendas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button href="/dashboard/database/vendas/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Venda
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando vendas...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVendas.map((venda) => (
                      <tr key={venda.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {venda.cliente}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {venda.produto}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {venda.quantidade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {venda.valorTotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {new Date(venda.data).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(venda.status)}`}>
                            {venda.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/dashboard/database/vendas/${venda.id}`}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(venda.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredVendas.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhuma venda encontrada</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer authenticated />
      <ToastContainer position="bottom-right" />
    </div>
  )
}
