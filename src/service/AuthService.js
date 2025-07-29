import { api } from "@/libs/axios";

export async function userLogin({ email, senha }) {
    try {
        const response = await api.post('/auth/login', {
            email,
            senha
        });

        return response;
    } catch (error) {
        console.error("Erro na autenticação do usuário:", error);
        throw error;
    }
}

export async function userSignUp({ nome, email, senha, confirmarSenha }) {
    try {
        const response = await api.post('/auth/register', {
            nome,
            email,
            senha,
            confirmarSenha
        });

        return response;
    } catch (error) {
        console.error("Erro ao criar conta de usuário:", error);
        throw error;
    }
}

export async function userData() {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        throw error;
    }
}