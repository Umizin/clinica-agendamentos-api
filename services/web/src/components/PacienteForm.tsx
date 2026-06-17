import { FormEvent, useState } from 'react';
import { api } from '../api/client';
import { Paciente } from '../types';

interface PacienteFormProps {
  onSalvo: (paciente: Paciente) => void;
  onErro: (mensagem: string) => void;
}

export function PacienteForm({ onSalvo, onErro }: PacienteFormProps) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setCarregando(true);

    try {
      const paciente = await api.criarPaciente({ nome, cpf, email });
      onSalvo(paciente);
      setNome('');
      setCpf('');
      setEmail('');
    } catch (erro) {
      onErro((erro as Error).message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Novo paciente</h2>
      <p className="mt-1 text-sm text-slate-500">Cadastre antes de agendar consulta</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Nome</span>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
            placeholder="Ana Silva"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">CPF</span>
          <input
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
            required
            minLength={11}
            maxLength={14}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
            placeholder="52998224725"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
            placeholder="ana@email.com"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="mt-6 rounded-xl bg-clinica-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-clinica-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {carregando ? 'Salvando...' : 'Cadastrar paciente'}
      </button>
    </form>
  );
}
