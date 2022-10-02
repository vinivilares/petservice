import Link from "next/link";
import { useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Index.module.css";

import { buscarUser } from "../lib/prisma";

export default function Home() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    await router.push("/")
  }
  return (
    <div className={styles.main}>
      <div>
        <h1>PetService</h1>
        <p>
          O PetService tem como intuito criar uma ponte entre donos de animais,
          veterinários, clínicas e lojas Pet.
        </p>
      </div>

      <form onSubmit={submitHandler} className={styles.loginForm}>
        <div>
          <div className={styles.controllers}>
            <input
              type="email"
              ref={emailInputRef}
              placeholder="email@email.com"
            />
          </div>
          <div className={styles.controllers}>
            <input
              type="password"
              ref={passwordInputRef}
              placeholder="**********"
            />
          </div>
          <div className={styles.loginButton}>
            <button type="submit">Entrar</button>
          </div>
        </div>
        <div className={styles.criarConta}>
          <p>
            Não tem uma conta ?
            <button>
              <Link href="/signup">Criar Conta</Link>
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

// Código server side "Não mexer"
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

  return {
    props: {
      userSession,
    },
  };
}
