import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSession } from "next-auth/react";
import styles from "../../styles/Feed.module.css";
import Search from "../../components/icons/search";

export default function Feed({ lojas }) {
  const [busca, setBusca] = useState("");

  const lojasFiltradas = lojas.filter((loja) =>
    loja.email.toLowerCase().includes(busca)
  );

  return (
    <div className={styles.main}>
      <form className={styles.busca}>
        <input
          type={"text"}
          onChange={({ target }) => {
            setBusca(target.value);
          }}
          value={busca}
          placeholder="Buscar"
        />
        <h2>Serviços</h2>
        <div className={styles.filtros}>
          <input type={"checkbox"} id="petshop" />
          <label htmlFor="petshop">PetShop</label>
        </div>

        <div className={styles.filtros}>
          <input type={"checkbox"} id="veterinario" />
          <label htmlFor="veterinario">Veterinário</label>
        </div>

        <div className={styles.filtros}>
          <input type={"checkbox"} id="banhoTosa" />
          <label htmlFor="banhoTosa">Banho e tosa</label>
        </div>

        <div className={styles.filtros}>
          <input type={"checkbox"} id="cirurgia" />
          <label htmlFor="cirurgia">Cirurgia</label>
        </div>

        <div className={styles.filtros}>
          <input type={"checkbox"} id="outros" />
          <label htmlFor="outros">Outros</label>
        </div>

        <div className={styles.submit}>
          <input type={"submit"} id="outros" />
        </div>
      </form>

      <div className={styles.lista}>
        <ul>
          {lojasFiltradas.map((loja) => (
            <li key={loja.id} className={styles.cards}>
              <div className={styles.cardImg}>
                <Image
                  src={"https://i.imgur.com/tdi3NGa.png"}
                  width={100}
                  height={100}
                  alt="imagem do perfil"
                />
              </div>
              <div className={styles.cardInfo}>
                <h3>Nome</h3>
                <p>4.5 X</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <Link href={"feed/" + loja.id}>
                  <button>Ver Perfil</button>
                </Link>
              </div>
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
    const response = await fetch("http://localhost:3000/api/feed");
    // const response = await fetch("https://petservice.vercel.app/api/petshops");
    const lojas = await response.json();

    return {
      props: {
        lojas,
      },
    };
  }
}
