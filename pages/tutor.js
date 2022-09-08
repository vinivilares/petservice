import { getSession } from "next-auth/react";
import Link from "next/link";
import { buscarUser } from "../lib/prisma";

export default function Tutor({ user }) {
  return (
    <>
      <p>{user.email}</p>
      <Link href={`/tutor/pets`}>Meus Pets</Link>
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
  } else {
    const user = await buscarUser(userSession.user.email);
    if (user.tipo !== "tutor") {
      return {
        redirect: {
          destination: "/dashboard",
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
