import styles from "../styles/Vacinas.module.css";
import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Vacinas({ data, user }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [vacina, setVacina] = useState({
    id: undefined,
    nome: undefined,
    data: undefined,
    doses: undefined,
    petId: undefined,
  });

  async function deleteHandler(vacinaId) {
    const response = await fetch(`/api/vacinas/${user}`, {
      method: "DELETE",
      body: JSON.stringify(vacina),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.reload();
  }

  return (
    <div className={styles.main}>
      <h1>Histórico de Vacinas</h1>
      <div>
        <button onClick={() => setModal(true)}>Adicionar</button>
      </div>
      {modal ? (
        <form className={styles.modal}>
          <div>
            <h1>Adicionar</h1>
            <div>
              <label>Nome do pet: </label>
              <select>
                {data.map(pet=><option>
                  {pet.nome}
                </option>)}
              </select>
            </div>
            <div>
              <label>Tipo da Vacina: </label>
              <input type="text" />
            </div>
            <div>
              <label>Data de vacinação: </label>
              <input type="date" />
            </div>
            <div>
              <label>Número de doses: </label>
              <input type="number" />
            </div>
            <div className={styles.actions}>
              <button>Salvar</button>
              <button onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </form>
      ) : null}
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
                <td>{vac.data}</td>
                <td>{vac.nome}</td>
                <td>
                  <button>Editar</button>
                  <button
                    onMouseOver={() => setVacina({ ...vacina, id: vac.id })}
                    onClick={() => deleteHandler(vac.id)}
                  >
                    Excluir
                  </button>
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
