import { Aba } from '../types';

interface LayoutProps {
  aba: Aba;
  onTrocarAba: (aba: Aba) => void;
  children: React.ReactNode;
}

const menus: { id: Aba; titulo: string; descricao: string }[] = [
  { id: 'pacientes', titulo: 'Pacientes', descricao: 'Cadastro e consulta' },
  { id: 'agendamentos', titulo: 'Agendamentos', descricao: 'Marcar consultas' }
];

export function Layout({ aba, onTrocarAba, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-clinica-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div>
            <p className="text-sm font-medium text-clinica-600">Clinica Agendamentos</p>
            <h1 className="text-2xl font-bold text-slate-900">Painel da Recepcao</h1>
          </div>
          <div className="hidden rounded-full bg-clinica-50 px-4 py-2 text-sm font-medium text-clinica-700 md:block">
            API via gateway
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3">
          {menus.map((menu) => {
            const ativo = aba === menu.id;
            return (
              <button
                key={menu.id}
                type="button"
                onClick={() => onTrocarAba(menu.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  ativo
                    ? 'border-clinica-500 bg-clinica-600 text-white shadow-lg shadow-clinica-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-clinica-100 hover:bg-clinica-50'
                }`}
              >
                <p className="font-semibold">{menu.titulo}</p>
                <p className={`mt-1 text-sm ${ativo ? 'text-clinica-50' : 'text-slate-500'}`}>
                  {menu.descricao}
                </p>
              </button>
            );
          })}
        </aside>

        <section className="space-y-6">{children}</section>
      </main>
    </div>
  );
}
