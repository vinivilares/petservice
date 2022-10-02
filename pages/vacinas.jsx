import styles from "../styles/Vacinas.module.css";
import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";

export default function Vacinas({ pets }) {
  // const pets = [
  //   { id: 1, pet: "Totó", data: "02/02/10", tipo: "Antirrabica" },
  //   { id: 2, pet: "Rex", data: "02/02/16", tipo: "Covid" },
  //   { id: 3, pet: "Conan", data: "02/02/14", tipo: "Gripe" },
  //   { id: 4, pet: "Dalila", data: "02/02/12", tipo: "Antitetânica" },
  // ];
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
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.nome}</td>
              {console.log(pet.Vacina.nome)}
              <td>{pet.Vacina.data}</td>
              <td>{pet.Vacina.nome}</td>
              <td className={styles.main}>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);
  const tutor = await buscarUser(userSession.user.email);
  const response = await fetch("http://localhost:3000/api/tutor/" + tutor.id);
  const pets = await response.json();

  return {
    props: { pets: pets },
  };
}
