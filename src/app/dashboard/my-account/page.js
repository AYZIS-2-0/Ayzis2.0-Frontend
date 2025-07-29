'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import InputText from '@/components/InputText'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/libs/axios'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowLeft, Edit, Save, LogOut, User } from 'lucide-react'
import Link from 'next/link'

export default function MyAccountPage() {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      // const response = await api.get('/user/profile')
      // setName(response.data.name)
      // setEmail(response.data.email)

      // Dados mockados para demonstração
      setName('Usuário Exemplo')
      setEmail('usuario@exemplo.com')
    } catch (error) {
      toast.error('Erro ao carregar dados do usuário')
    }
  }

  async function handleUpdateUserData(e) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.put('/user/profile', {
        name,
        email,
        password: password || undefined
      })

      toast.success('Dados atualizados com sucesso!')
      setEditMode(false)
      setPassword('')
    } catch (error) {
      toast.error('Erro ao atualizar dados')
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header authenticated />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link
                href="/dashboard"
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Minha Conta
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div className="p-4 rounded-full bg-blue-100">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">Perfil do Usuário</h2>
                  <p className="text-gray-600">Gerencie suas informações pessoais</p>
                </div>
              </div>

              <form onSubmit={handleUpdateUserData} className="space-y-6">
                <InputText
                  label="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editMode}
                  className={!editMode ? 'bg-gray-50' : ''}
                  required
                />

                <InputText
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                  className={!editMode ? 'bg-gray-50' : ''}
                  required
                />

                {editMode && (
                  <InputText
                    label="Nova Senha (deixe em branco para manter a atual)"
                    type="password"
                    placeholder="Digite uma nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                  <Button
                    type="button"
                    onClick={handleLogout}
                    variant="danger"
                    className="w-full sm:w-auto"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair da Conta
                  </Button>

                  <div className="flex space-x-4">
                    {!editMode ? (
                      <Button
                        type="button"
                        onClick={() => setEditMode(true)}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="button"
                          onClick={() => {
                            setEditMode(false)
                            setPassword('')
                            fetchUserData()
                          }}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isLoading ? 'Salvando...' : 'Salvar'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer authenticated />
      <ToastContainer position="bottom-right" />
    </div>
  )
}
