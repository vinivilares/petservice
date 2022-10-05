import styles from "../styles/Signup.module.css";
import Link from "next/link";

import { buscarUser } from "../lib/prisma";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Signup() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const tipoInputRef = useRef();
  const nomeInputRef = useRef();

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  async function enderecoHandler() {
    if (!endereco.cep) {
      return;
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${endereco.cep}/json/`
    );

    const data = await response.json();

    setEndereco({
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.bairro,
      uf: data.uf,
    });
  }

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredTipo = tipoInputRef.current.value;
    const enteredNome = nomeInputRef.current.value;

    // TODO add validação
    try {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        enteredTipo,
        enteredNome,
        endereco
      );
      // router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Crie sua conta</h1>
      <p>
        Já tenho uma conta. <Link href={"/"}>Voltar</Link>
      </p>
      <h2>Dados Básico</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.input}>
          <label>Tipo: </label>
          <select ref={tipoInputRef}>
            <option value={"tutor"}>Tutor</option>
            <option value={"veterinario"}>Veterinário</option>
            <option value={"petshop"}>Petshop</option>
          </select>
        </div>

        <div className={styles.input}>
          <label>Nome: </label>
          <input type={"text"} required ref={nomeInputRef} />
        </div>

        <div className={styles.input}>
          <label>Email: </label>
          <input type={"email"} required ref={emailInputRef} />
        </div>

        <div className={styles.input}>
          <label>Senha: </label>
          <input type={"password"} required ref={passwordInputRef} />
        </div>

        <h2>Endereço</h2>
        <div className={styles.input}>
          <label htmlFor="cep">CEP:</label>
          <input
            id="cep"
            type={"text"}
            onChange={({ target }) => {
              setEndereco({ ...endereco, cep: target.value });
            }}
            onBlur={enderecoHandler}
          />
        </div>

        <div className={styles.input}>
          <label htmlFor="rua">Rua:</label>
          <input
            id="rua"
            type={"text"}
            value={endereco.logradouro}
            onChange={({ target }) => {
              setEndereco({ ...endereco, logradouro: target.value });
            }}
          />
        </div>

        <div className={styles.input}>
          <label htmlFor="complemento">Complemento:</label>
          <input
            id="complemento"
            type={"text"}
            value={endereco.complemento}
            onChange={({ target }) => {
              setEndereco({ ...endereco, complemento: target.value });
            }}
          />
        </div>

        <div className={styles.input}>
          <label htmlFor="bairro">Bairro:</label>
          <input
            id="bairro"
            type={"text"}
            value={endereco.bairro}
            onChange={({ target }) => {
              setEndereco({ ...endereco, bairro: target.value });
            }}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="localidade">Cidade:</label>
          <input
            id="localidade"
            type={"text"}
            value={endereco.localidade}
            onChange={({ target }) => {
              setEndereco({ ...endereco, localidade: target.value });
            }}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="uf">UF:</label>
          <input
            id="uf"
            type={"text"}
            value={endereco.uf}
            onChange={({ target }) => {
              setEndereco({ ...endereco, uf: target.value });
            }}
          />
        </div>

        <div className={styles.submit}>
          <div className={styles.action}>
            <button type={"submit"}>Cadastrar</button>
          </div>

          <div className={styles.action}>
            <Link href={"/"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

// Código server side não mexer
export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  if (userSession) {
    const user = await buscarUser(userSession.user.email);

    return {
      redirect: {
        destination: user.tipo === "tutor" ? "/feed" : "/dashboard",
      },
    };
  }

  if (!userSession) {
    return {
      props: {
        userSession,
      },
    };
  }
}

async function createUser(email, password, tipo, nome, endereco) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, tipo, nome, endereco }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Algo deu errado!");
  }

  return data;
}
