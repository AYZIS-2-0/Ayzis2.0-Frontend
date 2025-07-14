'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaChartPie } from "react-icons/fa6";
import { MdLogin, MdPersonAdd } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { IoDocumentSharp } from "react-icons/io5";
import { AiFillApi } from "react-icons/ai";


export default function LandingPage() {
    const { token } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/dashboard')
        }
    }, [token, router])

    const funcionalidades = [
        {
            titulo: "Dashboard Interativo",
            descricao: "Visualize dados em tempo real com gráficos dinâmicos e relatórios personalizados.",
            icon: <FaChartPie size={30} className="text-blue-600" />
        },
        {
            titulo: "Alertas Inteligentes",
            descricao: "Receba notificações automáticas sobre eventos importantes e métricas críticas.",
            icon: <IoMdAlert size={30} className="text-blue-600" />
        },
        {
            titulo: "Exportação de Dados",
            descricao: "Exporte relatórios e dados em diversos formatos para análise externa.",
            icon: <IoDocumentSharp size={30} className="text-blue-600" />
        },
        {
            titulo: "Integração com o Bling",
            descricao: "Conecte o sistema ao Bling para sincronização de dados de vendas e estoque.",
            icon: <AiFillApi size={30} className="text-blue-600" />
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header landing={true} />

            <main className="mx-20 flex-1 flex items-center justify-center">
                <div className="w-full flex md:flex-row flex-col items-center justify-center gap-4">
                    <div className="p-8 w-[50%]">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Bem-vindo ao AYZIS
                        </h1>

                        <div className="flex flex-col w-full gap-4">
                            {funcionalidades.map((func, idx) => (
                                <div key={idx} className="flex flex-row w-full items-center mb-1">
                                    <div className="border-1 w-full border-gray-500 p-4 rounded-lg shadow-lg">
                                        <h2 className="text-xl font-semibold text-white mb-2">
                                            {func.titulo}
                                        </h2>
                                        <p className="text-gray-300">
                                            {func.descricao}
                                        </p>
                                    </div>
                                    <div className='flex p-5 bg-white rounded-full justify-center items-center ml-[-35]'>
                                        {func.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 w-[50%] flex flex-col items-center justify-center">
                        <div className="border-1 border-gray-500 p-6 rounded-lg shadow-lg">
                            <div className="space-y-4">
                                <div className="text-center px-20 py-10">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Fazer login
                                    </h2>
                                    <Button
                                        onClick={() => router.push('/sign-in')}
                                        className="w-full mb-4"
                                        icon={<MdLogin size={24} className="text-white" />}
                                    >
                                        Entrar com e-mail
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center my-4">
                                        <div className="flex-1 border-t border-gray-500 "></div>
                                        <span className="px-3 text-gray-500 text-sm">OU</span>
                                        <div className="flex-1 border-t border-gray-500"></div>
                                    </div>
                                </div>

                                <div className="text-center px-20 py-10">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        Cadastrar
                                    </h3>
                                    <Button
                                        onClick={() => router.push('/sign-up')}
                                        variant="secondary"
                                        icon={<MdPersonAdd size={24} className="text-white" />}
                                    >
                                        Cadastrar com e-mail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
