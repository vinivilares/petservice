import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { buscarUser } from "../../lib/prisma";
import styles from "../../styles/petId.module.css";
import Image from "next/image";
import { useState } from "react";

export default function PetId({ pet }) {
  const router = useRouter();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [dadosPet, setDadosPet] = useState({
    id: pet.id,
    nome: pet.nome,
    data: pet.idade,
    especie: pet.especie,
    raca: pet.raca,
  });

  async function deleteHandler() {
    const deletedPet = await fetch(`/api/pet/${pet.id}`, {
      method: "DELETE",
      body: JSON.stringify(dadosPet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/pets");
  }

  async function editHandler(e) {
    e.preventDefault();
    const editPet = await fetch(`/api/pet/${pet.id}`, {
      method: "PUT",
      body: JSON.stringify(dadosPet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.reload();
  }

  return (
    <div className={styles.main}>
      {modalDelete ? (
        <div className={styles.modal}>
          <div>
            <h2>Excluir</h2>
            <p>Tem certeza que deseja excluir {pet.nome}?</p>
            <div className={styles.actions}>
              <button onClick={deleteHandler}>Sim</button>
              <button onClick={() => setModalDelete(false)}>Não</button>
            </div>
          </div>
        </div>
      ) : null}

      {modalEdit ? (
        <div className={styles.modal}>
          <div>
            <h2>Editar</h2>
            <form>
              <div>
                <label>Nome: </label>
                <input
                  type={"text"}
                  value={dadosPet.nome}
                  onChange={({ target }) =>
                    setDadosPet({ ...dadosPet, nome: target.value })
                  }
                />
              </div>
              <div>
                <label>Data de Nascimento: </label>
                <input
                  type={"date"}
                  value={dadosPet.data}
                  onChange={({ target }) =>
                    setDadosPet({ ...dadosPet, data: target.value })
                  }
                />
              </div>
              <div>
                <label>Espécie: </label>
                <input
                  type={"text"}
                  value={dadosPet.especie}
                  onChange={({ target }) =>
                    setDadosPet({ ...dadosPet, especie: target.value })
                  }
                />
              </div>
              <div>
                <label>Raça: </label>
                <input
                  type={"text"}
                  value={dadosPet.raca}
                  onChange={({ target }) =>
                    setDadosPet({ ...dadosPet, raca: target.value })
                  }
                />
              </div>
              <div className={styles.actions}>
                <button onClick={editHandler}>Sim</button>
                <button onClick={() => setModalEdit(false)}>Não</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className={styles.info}>
        <div>
          <Image
            src={"https://i.imgur.com/H37kxPH.jpeg"}
            width={150}
            height={150}
            alt="Imagem do pet"
          />
        </div>
        <div>
          <h1>{pet.nome}</h1>
          <p>{pet.idade}</p>
          <p>{pet.especie}</p>
          <p>{pet.raca}</p>
        </div>
      </div>

      {pet.Vacina.length ? (
        <div className={styles.vacinas}>
          <h1>Vacinas</h1>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Vacina aplicada</th>
                <th>Data de aplicação da Vacina</th>
                <th>Doses</th>
              </tr>
            </thead>

            <tbody>
              {pet.Vacina.map((vacina) => (
                <tr key={vacina.id}>
                  <td>{vacina.nome}</td>
                  <td>{vacina.data}</td>
                  <td>{vacina.doses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Pet não possui vacinas</p>
      )}

      <div className={styles.actions}>
        <button onClick={() => setModalEdit(true)}>Editar</button>
        <button onClick={() => setModalDelete(true)}>Excluir</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  if (!userSession) {
    return {
      redirect: { destination: "/" },
    };
  }

  const { params } = context;
  const user = await buscarUser(userSession.user.email);

  // const response = await fetch(`http://localhost:3000/api/pet/${params.petId}`);
  const response = await fetch(
    `https://petservice.vercel.app/api/pet/${params.petId}`
  );
  const pet = await response.json();
  return {
    props: {
      pet,
    },
  };
}
