import Link from "next/link";
import { useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

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

    router.push("/")
  }
  return (
    <>
      <div>
        <h1>PetService</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui esse quas
          culpa tempore magnam mollitia praesentium velit! Omnis, ut recusandae
          veniam ipsum, quam vero, aperiam obcaecati vel maxime veritatis enim!
        </p>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="email">Senha:</label>
            <input type="password" ref={passwordInputRef} />
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
          <div>
            <p>
              Não tem uma conta ?
              <button>
                <Link href="/signup">Criar Conta</Link>
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
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
