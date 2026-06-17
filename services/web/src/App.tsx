import { useCallback, useEffect, useState } from 'react';
import { api } from './api/client';
import { AgendamentoForm } from './components/AgendamentoForm';
import { AgendamentoLista } from './components/AgendamentoLista';
import { Alerta } from './components/Alerta';
import { Layout } from './components/Layout';
import { PacienteForm } from './components/PacienteForm';
import { PacienteLista } from './components/PacienteLista';
import { Aba, Agendamento, Paciente } from './types';

interface AlertaState {
  tipo: 'sucesso' | 'erro';
  mensagem: string;
}

export default function App() {
  const [aba, setAba] = useState<Aba>('pacientes');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregandoPacientes, setCarregandoPacientes] = useState(true);
  const [carregandoAgendamentos, setCarregandoAgendamentos] = useState(true);
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
  const [alerta, setAlerta] = useState<AlertaState | null>(null);

  const mostrarSucesso = (mensagem: string) => setAlerta({ tipo: 'sucesso', mensagem });
  const mostrarErro = (mensagem: string) => setAlerta({ tipo: 'erro', mensagem });

  const carregarPacientes = useCallback(async () => {
    setCarregandoPacientes(true);
    try {
      const lista = await api.listarPacientes();
      setPacientes(lista);
    } catch (erro) {
      mostrarErro((erro as Error).message);
    } finally {
      setCarregandoPacientes(false);
    }
  }, []);

  const carregarAgendamentos = useCallback(async () => {
    setCarregandoAgendamentos(true);
    try {
      const lista = await api.listarAgendamentos();
      setAgendamentos(lista);
    } catch (erro) {
      mostrarErro((erro as Error).message);
    } finally {
      setCarregandoAgendamentos(false);
    }
  }, []);

  useEffect(() => {
    carregarPacientes();
    carregarAgendamentos();
  }, [carregarPacientes, carregarAgendamentos]);

  async function confirmarAgendamento(id: string) {
    setConfirmandoId(id);
    try {
      const agendamento = await api.confirmarAgendamento(id);
      setAgendamentos((lista) =>
        lista.map((item) => (item.id === id ? agendamento : item))
      );
      mostrarSucesso('Consulta confirmada');
    } catch (erro) {
      mostrarErro((erro as Error).message);
    } finally {
      setConfirmandoId(null);
    }
  }

  return (
    <Layout aba={aba} onTrocarAba={setAba}>
      {alerta && (
        <Alerta tipo={alerta.tipo} mensagem={alerta.mensagem} onFechar={() => setAlerta(null)} />
      )}

      {aba === 'pacientes' && (
        <>
          <PacienteForm
            onSalvo={(paciente) => {
              setPacientes((lista) => [paciente, ...lista]);
              mostrarSucesso(`Paciente ${paciente.nome} cadastrado`);
            }}
            onErro={mostrarErro}
          />
          <PacienteLista pacientes={pacientes} carregando={carregandoPacientes} />
        </>
      )}

      {aba === 'agendamentos' && (
        <>
          <AgendamentoForm
            pacientes={pacientes}
            onSalvo={(agendamento) => {
              setAgendamentos((lista) => [agendamento, ...lista]);
              mostrarSucesso('Consulta agendada com sucesso');
            }}
            onErro={mostrarErro}
          />
          <AgendamentoLista
            agendamentos={agendamentos}
            pacientes={pacientes}
            carregando={carregandoAgendamentos}
            confirmandoId={confirmandoId}
            onConfirmar={confirmarAgendamento}
          />
        </>
      )}
    </Layout>
  );
}
