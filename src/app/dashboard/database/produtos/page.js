'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { api } from '@/libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react'
import Link from 'next/link'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProdutos()
  }, [])

  async function fetchProdutos() {
    try {
      setIsLoading(true)
      // const response = await api.get('/produtos')
      // setProdutos(response.data)
      
      // Dados mockados para demonstração
      setProdutos([
        {
          id: 1,
          nome: 'Produto A',
          descricao: 'Descrição do Produto A',
          preco: 29.99,
          categoria: 'Categoria 1',
          estoque: 100
        },
        {
          id: 2,
          nome: 'Produto B',
          descricao: 'Descrição do Produto B',
          preco: 49.99,
          categoria: 'Categoria 2',
          estoque: 50
        }
      ])
    } catch (error) {
      toast.error('Erro ao carregar produtos')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        // await api.delete(`/produtos/${id}`)
        setProdutos(produtos.filter(p => p.id !== id))
        toast.success('Produto excluído com sucesso!')
      } catch (error) {
        toast.error('Erro ao excluir produto')
      }
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
                Produtos
              </h1>
            </div>
            <p className="text-gray-600">
              Gerencie seu catálogo de produtos
            </p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button href="/dashboard/database/produtos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando produtos...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estoque
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProdutos.map((produto) => (
                      <tr key={produto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {produto.nome}
                            </div>
                            <div className="text-sm text-gray-500">
                              {produto.descricao}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {produto.categoria}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {produto.preco.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {produto.estoque}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/dashboard/database/produtos/${produto.id}`}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(produto.id)}
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

                {filteredProdutos.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum produto encontrado</p>
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
