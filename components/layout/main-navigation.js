import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleLogout() {
    signOut().then(router.push("/"));
  }

  return (
    <header>
      <Link href="/">
        <a>
          <div>PetService</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/tutor">Profile</Link>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
