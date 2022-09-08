import Link from "next/link";

export default function Pets() {
  const pets = [
    { id: "1", nome: "Totó" },
    { id: "2", nome: "Rex" },
  ];

  return (
    <>
      <h1>Tela de pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link href={"/pets/" + pet.id}>{pet.nome}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
