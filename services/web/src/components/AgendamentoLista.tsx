import { Agendamento } from '../types';

interface AgendamentoListaProps {
  agendamentos: Agendamento[];
  pacientes: { id: string; nome: string }[];
  carregando: boolean;
  confirmandoId: string | null;
  onConfirmar: (id: string) => void;
}

const statusCores = {
  pendente: 'bg-amber-100 text-amber-800',
  confirmado: 'bg-emerald-100 text-emerald-800',
  cancelado: 'bg-rose-100 text-rose-800'
};

export function AgendamentoLista({
  agendamentos,
  pacientes,
  carregando,
  confirmandoId,
  onConfirmar
}: AgendamentoListaProps) {
  function nomePaciente(id: string) {
    return pacientes.find((p) => p.id === id)?.nome ?? 'Paciente';
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Consultas marcadas</h2>
        <p className="mt-1 text-sm text-slate-500">{agendamentos.length} agendamentos</p>
      </div>

      {carregando ? (
        <p className="mt-8 text-center text-sm text-slate-500">Carregando agendamentos...</p>
      ) : agendamentos.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center">
          <p className="font-medium text-slate-700">Nenhuma consulta agendada</p>
          <p className="mt-2 text-sm text-slate-500">Crie o primeiro agendamento acima</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {agendamentos.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-clinica-200 hover:bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{nomePaciente(item.pacienteId)}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.medico}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusCores[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                {item.data} as {item.hora}
              </p>
              {item.status === 'pendente' && (
                <button
                  type="button"
                  onClick={() => onConfirmar(item.id)}
                  disabled={confirmandoId === item.id}
                  className="mt-4 rounded-xl bg-clinica-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clinica-700 disabled:opacity-60"
                >
                  {confirmandoId === item.id ? 'Confirmando...' : 'Confirmar consulta'}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
