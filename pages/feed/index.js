import Link from "next/link";
import { useState } from "react";
import { getSession } from "next-auth/react";
import styles from "../../styles/Feed.module.css";
import Search from "../../components/icons/search";

export default function Feed({ lojas }) {
  // const lojas = [
  //   { id: "1", email: "Petz" },
  //   { id: "2", nome: "Veterinario Joao" },
  //   { id: "3", nome: "Petshop auau" },
  //   { id: "4", nome: "Animalzinho " },
  //   { id: "5", nome: "Javascript" },
  //   { id: "6", nome: "Java" },
  //   { id: "7", nome: "C#" },
  //   { id: "8", nome: "Kotlin" },
  //   { id: "9", nome: "Cobol" },
  // ];

  const [busca, setBusca] = useState("");

  const lojasFiltradas = lojas.filter((loja) =>
    loja.email.toLowerCase().includes(busca)
  );

  return (
    <div className={styles.main}>
      <div className={styles.busca}>
        <input
          type={"text"}
          onChange={({ target }) => {
            setBusca(target.value);
          }}
          value={busca}
        />
        <div className={styles.icons}>
          <Search />
        </div>
      </div>

      <div>
        <ul className={styles.feed}>
          {lojasFiltradas.map((loja) => (
            <li key={loja.id} className={styles.lojas}>
              <Link href={"feed/" + loja.id}>{loja.email}</Link>
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
  } else {
    const response = await fetch("http://localhost:3000/api/petshops");
    const lojas = await response.json();

    return {
      props: {
        lojas,
      },
    };
  }
}
