import styles from "../styles/Signup.module.css";

import { buscarUser } from "../lib/prisma";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Signup() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const tipoInputRef = useRef();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredTipo = tipoInputRef.current.value;

    // TODO add validação
    try {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        enteredTipo
      );
      console.log(result);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h1 className={styles.title}>Crie sua conta</h1>
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
          <label>Email: </label>
          <input type={"email"} required ref={emailInputRef} />
        </div>

        <div className={styles.input}>
          <label>Senha: </label>
          <input type={"password"} required ref={passwordInputRef} />
        </div>

        <div className={styles.action}>
          <button type={"submit"}>Cadastrar</button>
        </div>
      </form>
    </>
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

async function createUser(email, password, tipo) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, tipo }),
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
