import { useRouter } from "next/router";

export default function PetId() {
  const router = useRouter();
  const { petId } = router.query;

  return <p>Tela do pet {petId}</p>;
}
