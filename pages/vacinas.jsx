import styles from "../styles/Vacinas.module.css";
import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";

export default function Vacinas({ data }) {
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
                  <button>Excluir</button>
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
    },
  };
}
