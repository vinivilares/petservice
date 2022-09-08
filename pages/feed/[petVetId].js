import { useRouter } from "next/router";

export default function PetVetId() {
  const router = useRouter();
  const { petVetId } = router.query;

  return <h1>{petVetId}</h1>;
}
