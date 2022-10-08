import styles from "../styles/Vacinas.module.css";
import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";
import { useState } from "react";

export default function Vacinas({ data, user }) {
  const [vacina, setVacina] = useState({
    id: undefined,
    nome: undefined,
    data: undefined,
    doses: undefined,
    petId: undefined,
  });

  async function deleteHandler(vacinaId) {
    await this.setVacina({ ...vacina, id: vacinaId });
    const response = await fetch(`/api/vacinas/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ vacina }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  }

  return (
    <div className={styles.main}>
      <h1>Histórico de Vacinas</h1>
      <button>Adicionar</button>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome do Pet</th>
            <th>Data de aplicação da Vacina</th>
            <th>Vacina aplicada</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) =>
            item.Vacina.map((vac) => (
              <tr key={vac.id} className={styles.lista}>
                <td>{item.nome}</td>
                <td>{vac.nome}</td>
                <td>{vac.data}</td>
                <td>
                  <button>Editar</button>
                  <button onClick={() => deleteHandler(vac.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);
  const user = await buscarUser(userSession.user.email);

  const response = await fetch(`http://localhost:3000/api/vacinas/${user.id}`);
  const data = await response.json();

  return {
    props: {
      data: data,
      user: user.id,
    },
  };
}
