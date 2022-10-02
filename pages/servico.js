import { buscarUser } from "../lib/prisma";
import { getSession } from "next-auth/react";
import styles from "../styles/servico.module.css"


export default function Servicos({ data }) {
  return (
    <main className={styles.main}>



      <div className={styles.subMenu}>

        <h1> SERVIÇOS </h1>

      </div>

      <ul>

        {data.servicos.map(item => (


          <li className={styles.lista}>{item.nmServ.NomeServico}</li>

        ))}
      </ul>

    </main>

  )
}

export async function getServerSideProps(context) {

  const userSession = await getSession(context)

  const user = await buscarUser(userSession.user.email)

  const response = await fetch(
    `http://localhost:3000/api/petVetId/${user.id}`
  );

  const data = await response.json();
  console.log(data)

  return {
    props: {
      data
    }
  }
}













