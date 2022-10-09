import styles from "../styles/Vacinas.module.css";
import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Vacinas({ data, user, pets }) {
  const router = useRouter();
  const [modal, setModal] = useState({
    update: false,
    open: false,
  });
  const [modalDelete, setModalDelete] = useState(false);
  const [vacina, setVacina] = useState({
    id: undefined,
    nome: undefined,
    data: undefined,
    doses: undefined,
    petNome: undefined,
  });

  async function deleteHandler() {
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

  async function adicionarVacina(e) {
    e.preventDefault();
    const response = await fetch(`/api/vacinas/${user}`, {
      method: modal.update === false ? "POST" : "PUT",
      body: JSON.stringify(vacina),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.reload();
  }

  function editarHandler(nome, data, doses, petNome, id) {
    setModal({ open: true, update: true });
    setVacina({
      nome: nome,
      data: data,
      doses: doses,
      petNome: petNome,
      id: id,
    });
  }

  return (
    <div className={styles.main}>
      <h1>Histórico de Vacinas</h1>
      <div className={styles.adicionar}>
        <button onClick={() => setModal({ open: true, update: false })}>
          Adicionar
        </button>
      </div>
      {modal.open ? (
        <form method="POST" onSubmit={adicionarVacina} className={styles.modal}>
          <div>
            {modal.update ? <h1>Atualizar</h1> : <h1>Adicionar</h1>}
            <div>
              <label>Nome do pet: </label>
              <select
                onChange={({ target }) =>
                  setVacina({ ...vacina, petNome: target.value })
                }
              >
                {pets.map((pet) => (
                  <option key={pet.id}>{pet.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Tipo da Vacina: </label>
              <input
                value={vacina.nome}
                type="text"
                onChange={({ target }) =>
                  setVacina({ ...vacina, nome: target.value })
                }
              />
            </div>
            <div>
              <label>Data de vacinação: </label>
              <input
                type="date"
                onChange={({ target }) =>
                  setVacina({ ...vacina, data: target.value })
                }
              />
            </div>
            <div>
              <label>Número de doses: </label>
              <input
                type="number"
                onChange={({ target }) =>
                  setVacina({ ...vacina, doses: target.value })
                }
              />
            </div>
            <div className={styles.actions}>
              <button type="submit">Salvar</button>
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
            <th>Doses</th>
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
                <td>{vac.doses}</td>
                <td>
                  <button
                    onClick={() =>
                      editarHandler(
                        vac.nome,
                        vac.data,
                        vac.doses,
                        item.nome,
                        vac.id
                      )
                    }
                  >
                    Editar
                  </button>
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
  const tutor = await fetch(`http://localhost:3000/api/tutor/${user.id}`);
  const pets = await tutor.json();
  return {
    props: {
      data: data,
      user: user.id,
      pets: pets.pet,
    },
  };
}
