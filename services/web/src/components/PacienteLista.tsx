import { Paciente } from '../types';

interface PacienteListaProps {
  pacientes: Paciente[];
  carregando: boolean;
}

export function PacienteLista({ pacientes, carregando }: PacienteListaProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pacientes cadastrados</h2>
          <p className="mt-1 text-sm text-slate-500">{pacientes.length} registros</p>
        </div>
      </div>

      {carregando ? (
        <p className="mt-8 text-center text-sm text-slate-500">Carregando pacientes...</p>
      ) : pacientes.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center">
          <p className="font-medium text-slate-700">Nenhum paciente cadastrado</p>
          <p className="mt-2 text-sm text-slate-500">Use o formulario acima para comecar</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-3 font-medium">Nome</th>
                <th className="px-3 py-3 font-medium">CPF</th>
                <th className="px-3 py-3 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-4 font-medium text-slate-800">{paciente.nome}</td>
                  <td className="px-3 py-4 text-slate-600">{paciente.cpf}</td>
                  <td className="px-3 py-4 text-slate-600">{paciente.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
