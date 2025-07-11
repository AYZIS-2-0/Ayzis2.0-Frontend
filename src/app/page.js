'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaChartPie } from "react-icons/fa6";

export default function LandingPage() {
    const { token } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/dashboard')
        }
    }, [token, router])

    return (
        <div className="min-h-screen flex flex-col">
            <Header landing={true} />

            <main className="mx-20 flex-1 flex items-center justify-center">
                <div className="w-full flex flex-row items-center justify-center gap-4">
                    <div className="p-8 w-[50%]">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Bem-vindo ao AYZIS
                        </h1>

                        <div className="flex flex-row w-full items-center mb-4">
                            <div className="border-1 w-full border-gray-500 p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    Titulo funcionalidade 1
                                </h2>
                                <p className="text-gray-300">
                                    descrição Funcionalidade 1
                                </p>
                            </div>
                            <div className='flex p-5 bg-white rounded-full justify-center items-center ml-[-35]'>
                                <FaChartPie size={30} className="text-blue-600" />
                            </div>
                        </div>

                        <div className="flex flex-row w-full items-center mb-4 ml-[-40]">,
                            <div className='flex p-5 bg-white rounded-full justify-center items-center mr-[-35] z-10'>
                                <FaChartPie size={30} className="text-blue-600" />
                            </div>
                            <div className="border-1 w-full border-gray-500 p-4 rounded-lg shadow-lg pl-15">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    Titulo funcionalidade 1
                                </h2>
                                <p className="text-gray-300">
                                    descrição Funcionalidade 1
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="p-8 w-[50%] flex flex-col items-center justify-center">
                        <div className="border-1 border-gray-500 p-6 rounded-lg shadow-lg">
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-white mb-4">
                                        Fazer login
                                    </h3>
                                    <Button
                                        href="/sign-in"
                                        className="w-full mb-4"
                                    >
                                        Entrar com e-mail
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center my-4">
                                        <div className="flex-1 border-t border-gray-500"></div>
                                        <span className="px-3 text-gray-500 text-sm">OU</span>
                                        <div className="flex-1 border-t border-gray-500"></div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Cadastrar
                                    </h3>
                                    <Button
                                        href="/sign-up"
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        Cadastrar com e-mail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Bem-vindo ao Ayzis
                            </h1>
                            <p className="text-gray-600">
                                Sistema de gestão e análise
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Fazer login
                                </h3>
                                <Button
                                    href="/sign-in"
                                    className="w-full mb-4"
                                >
                                    Entrar com e-mail
                                </Button>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center my-4">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-3 text-gray-500 text-sm">OU</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Cadastrar
                                </h3>
                                <Button
                                    href="/sign-up"
                                    variant="secondary"
                                    className="w-full"
                                >
                                    Cadastrar com e-mail
                                </Button>
                            </div>
                        </div>
                    </div> */}



                </div>
            </main>

            <Footer />
        </div>
    )
}
