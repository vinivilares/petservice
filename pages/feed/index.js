import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSession } from "next-auth/react";
import styles from "../../styles/Feed.module.css";
import Search from "../../components/icons/search";

export default function Feed({ lojas }) {
  const [busca, setBusca] = useState("");

  const lojasFiltradas = lojas.filter((loja) =>
    loja.nome.toLowerCase().includes(busca)
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
          placeholder="Buscar por nome"
        />
        <h2>Serviços</h2>
        <div>
          <input type={"checkbox"} id="petshop" />
          <label htmlFor="petshop">PetShop</label>
        </div>

        <div>
          <input type={"checkbox"} id="veterinario" />
          <label htmlFor="veterinario">Veterinário</label>
        </div>

        <div>
          <input type={"checkbox"} id="banhoTosa" />
          <label htmlFor="banhoTosa">Banho e tosa</label>
        </div>

        <div>
          <input type={"checkbox"} id="cirurgia" />
          <label htmlFor="cirurgia">Cirurgia</label>
        </div>

        <div>
          <input type={"checkbox"} id="outros" />
          <label htmlFor="outros">Outros</label>
        </div>

        <div>
          <input type={"submit"} id="outros" />
        </div>
      </form>

      <ul className={styles.lista}>
        {lojasFiltradas.map((loja) => (
          <li className={styles.card} key={loja.id}>
            <div className={styles.leftColumn}>
              <Image
                src={"https://i.imgur.com/tdi3NGa.png"}
                width={150}
                height={150}
                alt="imagem do perfil"
              />
            </div>

            <div className={styles.rightColumn}>
              <h3>{loja.nome}</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <Link href={"feed/" + loja.id}>
                <button>Ver Perfil</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
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
    // const response = await fetch("https://petservice.vercel.app/api/feed");
    const lojas = await response.json();

    return {
      props: {
        lojas,
      },
    };
  }
}
