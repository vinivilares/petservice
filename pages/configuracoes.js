import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";
import { useRouter } from "next/router";

export default function Configuracoes({ user }) {
  const router = useRouter();
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <h1>Configurações</h1>
      <form>
        <div>
          <label>Nome: </label>
          <input type={"email"} value={user.nome} />
        </div>

        <div>
          <label>Email: </label>
          <input type={"email"} value={user.email} />
        </div>

        <div>
          <input type={"submit"} value="Salvar" />
          <button onClick={() => router.push("/")}>Cancelar</button>
          <button>Excluir Conta</button>
        </div>
      </form>
    </>
  );
}

// Código server side "Não mexer"
export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  if (!userSession) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const user = await buscarUser(userSession.user.email);
  return {
    props: {
      user,
    },
  };
}
