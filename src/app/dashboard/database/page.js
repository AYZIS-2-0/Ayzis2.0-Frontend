'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { Database, Package, TrendingUp } from 'lucide-react'

export default function DatabasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header authenticated />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Base de Dados
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie seus produtos e vendas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-100">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
                  <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  href="/dashboard/database/produtos"
                  className="w-full"
                >
                  Acessar Produtos
                </Button>
                <p className="text-sm text-gray-500">
                  Visualize, adicione, edite e remova produtos do seu catálogo.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-green-100">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Vendas</h2>
                  <p className="text-gray-600">Controle suas vendas e relatórios</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  href="/dashboard/database/vendas"
                  className="w-full"
                >
                  Acessar Vendas
                </Button>
                <p className="text-sm text-gray-500">
                  Registre vendas, visualize relatórios e acompanhe o desempenho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer authenticated />
    </div>
  )
}
