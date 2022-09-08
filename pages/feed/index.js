import Link from "next/link";
import { useState } from "react";
import { getSession } from "next-auth/react";
import styles from "../../styles/Feed.module.css";

export default function Feed() {
  const lojas = [
    { id: "1", nome: "Petz" },
    { id: "2", nome: "Veterinario Joao" },
    { id: "3", nome: "Petshop auau" },
    { id: "4", nome: "Animalzinho " },
    { id: "5", nome: "Javascript" },
    { id: "6", nome: "Java" },
    { id: "7", nome: "C#" },
    { id: "8", nome: "Kotlin" },
    { id: "9", nome: "Cobol" },
  ];

  const [busca, setBusca] = useState("");

  const lojasFiltradas = lojas.filter((loja) =>
    loja.nome.toLowerCase().includes(busca)
  );

  return (
    <div className={styles.main}>
      <div>
        Buscar{" "}
        <input
          type={"text"}
          onChange={({ target }) => {
            setBusca(target.value);
          }}
          value={busca}
        />
      </div>

      <div>
        <ul className={styles.feed}>
          {lojasFiltradas.map((loja) => (
            <li key={loja.id} className={styles.lojas}>
              <Link href={"feed/" + loja.id}>{loja.nome}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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

  return {
    props: {
      userSession,
    },
  };
}
