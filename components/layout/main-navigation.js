import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./main-navigation.module.css";
import Home from "../icons/home";
import Settings from "../icons/settings";
import Pets from "../icons/pets";
import Vacina from "../icons/vacina";
import Servicos from "../icons/servicos";

function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  function handleLogout() {
    signOut();
  }

  function handleConfig() {
    submenu.style.display == "block"
      ? (submenu.style.display = "none")
      : (submenu.style.display = "block");
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <h2>PetService</h2>
      </Link>
      <nav className={styles.menu}>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <Link href="/">
                <li className={styles.icon}>
                  <Home />
                </li>
              </Link>

              <Link href="/pets">
                <li className={styles.icon}>
                  <Pets />
                </li>
              </Link>

              <Link href="/servico">
                <li className={styles.icon}>
                  <Servicos />
                </li>
              </Link>

              <Link href="/vacinas">
                <li className={styles.icon}>
                  <Vacina />
                </li>
              </Link>

              <li className={styles.configuracoes} onClick={handleConfig}>
                <Settings />
              </li>

              <ul id="submenu" className={styles.submenu}>
                <li>
                  <Link href={"/configuracoes"}>Meu Perfil</Link>
                </li>
                <li onClick={signOut}>Sair</li>
              </ul>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
