import styles from "../styles/Vacinas.module.css";

export default function Vacinas() {
  const vacinas = [
    { id: 1, pet: "Totó", data: "02/02/10", tipo: "Antirrabica" },
    { id: 2, pet: "Rex", data: "02/02/16", tipo: "Covid" },
    { id: 3, pet: "Conan", data: "02/02/14", tipo: "Gripe" },
    { id: 4, pet: "Dalila", data: "02/02/12", tipo: "Antitetânica" },
  ];
  return (
    <div className={styles.main}>
      <h1>Histórico de Vacinas</h1>
      <button>Adicionar</button>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome do Pet</th>
            <th>Data de aplicação da Vacina</th>
            <th>Vacina aplicada</th>
            <th>Ações</th>
          </tr>
        </thead>

        {vacinas.map((vacina) => (
          <tr>
            <td>{vacina.pet}</td>
            <td>{vacina.data}</td>
            <td>{vacina.tipo}</td>
            <td className={styles.main}>
              <button>Editar</button>
              <button>Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
