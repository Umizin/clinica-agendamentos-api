import { Agendamento, Paciente } from '../types';

const base = import.meta.env.VITE_API_URL || '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const resposta = await fetch(`${base}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const tipo = resposta.headers.get('content-type') || '';

  if (!tipo.includes('application/json')) {
    throw new Error('API indisponivel. Verifique se o gateway esta rodando.');
  }

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Erro na requisicao');
  }

  return dados;
}

export const api = {
  listarPacientes: () => request<Paciente[]>('/pacientes'),
  criarPaciente: (dados: Omit<Paciente, 'id'>) =>
    request<Paciente>('/pacientes', { method: 'POST', body: JSON.stringify(dados) }),
  listarAgendamentos: () => request<Agendamento[]>('/agendamentos'),
  criarAgendamento: (dados: Omit<Agendamento, 'id' | 'status'>) =>
    request<Agendamento>('/agendamentos', { method: 'POST', body: JSON.stringify(dados) }),
  confirmarAgendamento: (id: string) =>
    request<Agendamento>(`/agendamentos/${id}/confirmar`, { method: 'PATCH' })
};
