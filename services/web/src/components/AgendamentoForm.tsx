import { FormEvent, useState } from 'react';
import { api } from '../api/client';
import { Agendamento, Paciente } from '../types';

interface AgendamentoFormProps {
  pacientes: Paciente[];
  onSalvo: (agendamento: Agendamento) => void;
  onErro: (mensagem: string) => void;
}

export function AgendamentoForm({ pacientes, onSalvo, onErro }: AgendamentoFormProps) {
  const [pacienteId, setPacienteId] = useState('');
  const [medico, setMedico] = useState('Dr Carlos');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setCarregando(true);

    try {
      const agendamento = await api.criarAgendamento({ pacienteId, medico, data, hora });
      onSalvo(agendamento);
      setHora('');
    } catch (erro) {
      onErro((erro as Error).message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Novo agendamento</h2>
      <p className="mt-1 text-sm text-slate-500">A notificacao e enviada automaticamente</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Paciente</span>
          <select
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome} - {paciente.cpf}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Medico</span>
          <input
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Data</span>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Hora</span>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-clinica-500 focus:ring-2"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={carregando || pacientes.length === 0}
        className="mt-6 rounded-xl bg-clinica-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-clinica-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {carregando ? 'Agendando...' : 'Confirmar agendamento'}
      </button>
    </form>
  );
}
