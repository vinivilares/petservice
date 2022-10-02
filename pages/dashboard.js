import { getSession } from "next-auth/react";
import { buscarUser } from "../lib/prisma";

export default function Dashobard({ user }) {
  return (
    <>
      <h1>Dashobard</h1>
      <p>{user.email}</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);

  console.log(userSession);

  if (!userSession) {
    return {
      redirect: {
        destination: "/",
      },
    };
  } else {
    const user = await buscarUser(userSession.user.email);
    if (user.tipo === "tutor") {
      return {
        redirect: {
          destination: "/feed",
        },
      };
    }
    return {
      props: {
        user,
      },
    };
  }
}
