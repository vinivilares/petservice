import {getSession} from "next-auth/react"
import {buscarUser} from "../lib/prisma"

export default function Servicos({data}) {
  return (
    <main className="teste">

      <br/>
      <br/>
 625k     <br/>

      <div>

        <h1> SERVIÇOS </h1>

        <div className="imag">
          
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665629.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/1665/1665628.png'/>
          <img url = 'https://cdn-icons-png.flaticon.com/512/748/748122.png'/>   
        </div>
      </div>

      {/* <ul>
        {data.servicos.map(item =>(
      
        
          <li >{item.descricao}</li>

        ))}
        <li>

        </li>
      </ul>  */}
    
    </main>
  )
}
// pegando o contexto (quam essa logado na pag.)
export async function getServerSideProps(context) {

   const userSession = await getSession(context) 

   const user = await buscarUser(userSession.user.email)

   const response = await fetch(
     `http://localhost:3000/api/petVetId/${user.id}`);
     console.log(user.id)
    
   const data = await response.json();
   
  return{
    props:{
      data : servicos
    }
  }
}




