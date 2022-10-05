import { useRouter } from "next/router";
import styles from "../../styles/petVetId.module.css";

export default function PetVetId({ petVetId }) {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <h1>{petVetId.dados.nome}</h1>
      <p>{petVetId.dados.tipo}</p>
      <h2>Endereço</h2>
      <p>
        Endereço: {petVetId.endereco.logradouro}, {petVetId.endereco.bairro},{" "}
        {petVetId.endereco.localidade} - {petVetId.endereco.uf}
      </p>
      <p>CEP: {petVetId.endereco.cep}</p>
      <h2>Serviços</h2>
      <ul>
        {petVetId.servicos.map((servico) => (
          <li key={servico.id}>{servico.nmServ.NomeServico}</li>
        ))}
      </ul>
      {console.log(petVetId)}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `http://localhost:3000/api/petVetId/${context.params.petVetId}`
  );
  const data = await response.json();
  // const endereco = await buscarEndereco(id.enderecoId);

  // console.log(endereco);

  console.log(data);
  return {
    props: {
      petVetId: data,
    },
  };
}
