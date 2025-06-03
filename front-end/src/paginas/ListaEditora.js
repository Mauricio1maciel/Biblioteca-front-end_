//Questao 1 Requisito funcional - Editoras
import Titulolista from "../componentes/TituloLista";
import axios from "axios";
import { useState , useEffect } from "react";

export default function ListaCategoria(){
  //Declarando uma variável usuState 
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/editora`);
    console.log(data);
    setDados(data);
  }

  useEffect( ()=>{
    listar();
  }, []);


    return(
        <>
         <Titulolista titulo = "Editora"
        descricao = "Gerencia aqui as Editora dos livros da biblioteca"
        rota = "/cadastroeditora" />


        <div className="row">
  <div className="col">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Código</th>
          <th scope="col">Editora</th>
          <th scope="col">CNPJ</th>
          <th scope="col">Endereço</th>
        </tr>
      </thead>
      <tbody>
        { dados.map( (d, i)=>(
          <tr>
            <td>
          <a className="btn btn-primary"
             href={`/cadastroeditora/${d.ideditora}`} >Alterar</a>
          </td>
          <td>{d.ideditora}</td>
          <td>{d.nomeeditora}</td>
          <td>{d.cnpj}</td>
          <td>{d.endereco}</td>
        </tr>
        )  )}
        
      </tbody>
    </table>
  </div>
</div>

        </>

        
    );
};