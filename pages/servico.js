

export default function Servicos({data}) {
  return (
    <main className="teste">

      <br/>
      <br/>
      <br/>

      <div>

        <h1> SERVIÇOS </h1>
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665629.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665628.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/748/748122.png'/>   
        
      </div>

       <ul>

        {data.map(item =>(
      
        
          <li >{item.nome}</li>

        ))}
        <li>

        </li>
      </ul>  
    
    </main>
  
  )
}

export async function getServerSideProps() {

  
  const data = [
    {
      id: 1,
      nome: "Banho e Tosa",
    },
    {
      id: 2,
      nome: "Consulta",
    },
    {
      id: 3,
      nome: "Serviço de veterinario",
    },
    {
      id: 4,
      nome: "Internação ",
    },
    {
      id: 5,
      nome: "teste2",
    }
  ];
  return{
    props:{
      data
    }
  }
}














