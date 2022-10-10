import { buscarUser } from "../lib/prisma";
import { getSession } from "next-auth/react";
import styles from "../styles/servico.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Servicos({ data, data1, user }) {
  const router = useRouter();
  const [servico, setServico] = useState({
    id: "",
    nome: "SELECIONE",
    descricao: "",
    valor: "",
    update: false,
  });
  // add servico
  const submitServico = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/petVetId/${user}`, {
      method: servico.update ? "PUT" : "POST",
      body: JSON.stringify(servico),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.reload();
  };

  //deletar serviço
  const deleteServico = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/petVetId/${user}`, {
      method: "DELETE",
      body: JSON.stringify(servico),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.reload();
  };
  // update
  const updateServico = async (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles.main}>
      <div className={styles.subMenu}>
        <h1> SERVIÇOS </h1>
      </div>
      {/* <div className={styles.botao}>
        <button>Add</button>
      </div> */}
      <div className={styles.add}>
        {servico.update ? (
          <h1>ATUALIZAR SERVIÇO</h1>
        ) : (
          <h1>ADICIONAR SERVIÇOS</h1>
        )}

        <form method="POST" onSubmit={submitServico}>
          <label>NOME DO SERVICO : </label>
          <select
            aria-label="Nome"
            id="nome"
            value={servico.nome}
            onChange={({ target }) => {
              setServico({ ...servico, nome: target.value });
            }}
          >
            <option>SELECIONE</option>
            {data1.map((item) => (
              <option key={item.id}>{item.NomeServico}</option>
            ))}
          </select>

          <label>DESCRIÇÃO : </label>
          <input
            id="descricao"
            placeholder="Digite a descrição do produto"
            type={"text"}
            value={servico.descricao}
            onChange={({ target }) => {
              setServico({ ...servico, descricao: target.value });
            }}
          />

          <label>VALOR : </label>
          <input
            id="valor"
            type={"number"}
            placeholder="Digite o valor do Serviço"
            value={servico.valor}
            onChange={({ target }) => {
              setServico({ ...servico, valor: target.value });
            }}
          />

          {servico.update ? (
            <button type="submit">ATUALIZAR</button>
          ) : (
            <button type="submit">ADICIONAR</button>
          )}
        </form>
      </div>
      <div className={styles.box}>
        {data.servicos.map((item) => (
          <div className={styles.serv} key={item.id}>
            <h3>{item.nmServ.NomeServico}</h3>

            <p>{item.descricao}</p>

            <legend>VALOR: R${item.preco}</legend>

            <button
              onClick={() =>
                setServico({
                  id: item.id,
                  nome: item.nmServ.NomeServico,
                  descricao: item.descricao,
                  valor: item.preco,
                  update: true,
                })
              }
            >
              Editar
            </button>

            <button
              onMouseOver={() => setServico({ ...servico, id: item.id })}
              onClick={deleteServico}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  const user = await buscarUser(userSession.user.email);

  const response = await fetch(`http://localhost:3000/api/petVetId/${user.id}`);

  const data = await response.json();

  const res = await fetch(`http://localhost:3000/api/petVetId/nmservico`);

  const data1 = await res.json();

  return {
    props: {
      data,
      data1,
      user: user.id,
    },
  };
}
