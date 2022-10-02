import { useRouter } from "next/router";
import styles from "../../styles/petVetId.module.css";

export default function PetVetId({ petVetId }) {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <h1>{petVetId.nome}</h1>
      <p>{petVetId.tipo}</p>
      <h2>Endereço</h2>
      <p>CEP: {petVetId.cep}</p>
      <p>
        Endereço: {petVetId.logradouro}, {petVetId.bairro},{" "}
        {petVetId.localidade} - {petVetId.uf}
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const dados = await fetch(
    `http://localhost:3000/api/petVetId/${context.params.petVetId}`
  );
  const res = await dados.json();
  // const endereco = await buscarEndereco(id.enderecoId);

  // console.log(endereco);

  console.log(res);
  return {
    props: {
      petVetId: res,
    },
  };
}
