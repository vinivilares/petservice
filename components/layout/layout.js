import MainNavigation from "./main-navigation";
import { useSession } from "next-auth/react";

function Layout(props) {
  const { data: session, status } = useSession();
  return (
    <>
      <main>
        {session ? <MainNavigation /> : null}
        {props.children}
      </main>
    </>
  );
}

export default Layout;
