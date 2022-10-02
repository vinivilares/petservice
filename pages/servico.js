
export default function getServicos({data}) {
  return (
    <main className="teste">
      <br/>
      <br/>
      <br/>

      <div>

        <h1> SERVIÇOS </h1>

        <div className="imag">
          
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665629.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665628.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/748/748122.png'/>   
        </div>
      </div>
      <ul>
        {data.map(item =>(
      
        
          <li >{item.title}</li>

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
      title: "Banho e Tosa",
    },
    {
      id: 2,
      title: "Consulta",
    },
    {
      id: 3,
      title: "Serviço de veterinario",
    },
    {
      id: 4,
      title: "Internação ",
    },
    {
      id: 5,
      title: "teste2",
    }
  ];
  return{
    props:{
      data
    }
  }
}




