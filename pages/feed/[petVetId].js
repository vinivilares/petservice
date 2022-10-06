import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/petVetId.module.css";

export default function PetVetId({ petVetId }) {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Image
          src={"https://i.imgur.com/tdi3NGa.png"}
          width={300}
          height={300}
          alt="Imagem do estabelecimento"
          className={styles.img}
        />
        <div className={styles.dados}>
          <h1>{petVetId.dados.nome}</h1>
          <p className={styles.dadosTipo}>{petVetId.dados.tipo}</p>
          <h2>Endereço</h2>
          <p>
            Endereço: {petVetId.endereco.logradouro}, {petVetId.endereco.bairro}
            , {petVetId.endereco.localidade} - {petVetId.endereco.uf}
          </p>
          <p>CEP: {petVetId.endereco.cep}</p>
        </div>
      </div>

      <div className={styles.servicos}>
        <h2>Serviços</h2>
        <ul className={styles.listServicos}>
          {petVetId.servicos.map((servico) => (
            <li key={servico.id}>
              {/* <input
                type={"checkbox"}
                onChange={(target) => console.log(servico.id)}
              /> */}
              <p>{servico.nmServ.NomeServico}</p>
              <p>{servico.descricao}</p>
              <p>R$ {servico.preco}</p>
            </li>
          ))}
        </ul>
        {console.log(petVetId)}
      </div>
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
