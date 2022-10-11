import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { buscarUser } from "../../lib/prisma";
import styles from "../../styles/pets.module.css";
import Adicionar from "../../components/icons/adicionar";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Pets({ data, user }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [pet, setPet] = useState({
    nome: undefined,
    especie: undefined,
    raca: undefined,
    data: undefined,
  });

  console.log(data);
  async function addHandler(e) {
    e.preventDefault();
    const response = await fetch(`/api/tutor/${user}`, {
      method: "POST",
      body: JSON.stringify(pet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.reload();
  }

  return (
    <>
      <h1>Tela de pets</h1>
      {modal ? (
        <form onSubmit={addHandler} className={styles.modal}>
          <div>
            <h1>Adicionar</h1>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input
                type={"text"}
                id="nome"
                onChange={({ target }) =>
                  setPet({ ...pet, nome: target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="especie">Espécie:</label>
              <input
                type={"text"}
                id="especie"
                onChange={({ target }) =>
                  setPet({ ...pet, especie: target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="raca">Raça:</label>
              <input
                type={"text"}
                id="raca"
                onChange={({ target }) =>
                  setPet({ ...pet, raca: target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="data">Data de nascimento:</label>
              <input
                type={"date"}
                id="data"
                onChange={({ target }) =>
                  setPet({ ...pet, data: target.value })
                }
              />
            </div>
            <div className={styles.actions}>
              <button>Salvar</button>
              <button onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </form>
      ) : null}
      <ul className={styles.lista}>
        <div className={styles.adicionar} onClick={() => setModal(true)}>
          <h2>Adicionar</h2>
          <Adicionar className={styles.icon} />
        </div>
        {data.pet.map((pet) => (
          <li key={pet.id}>
            <div className={styles.petCard}>
              <h2>{pet.nome}</h2>
              <Image
                src={"https://i.imgur.com/tdi3NGa.png"}
                width={150}
                height={150}
                alt="Imagem do pet"
              />
              <Link href={"/pets/" + pet.id}>Detalhes</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  if (!userSession) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const user = await buscarUser(userSession.user.email);

  if (user.tipo !== "tutor") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  // const response = await fetch(`http://localhost:3000/api/tutor/${user.id}`);
  const response = await fetch(
    `https://petservice.vercel.app/api/tutor/${user.id}`
  );
  const data = await response.json();

  return {
    props: {
      data,
      user: user.id,
    },
  };
}
