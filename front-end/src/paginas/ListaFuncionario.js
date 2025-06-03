//Questão 3 Requisito funcional - Usuários
import Titulolista from "../componentes/TituloLista";
import axios from "axios";
import { useState , useEffect } from "react";

export default function ListaCategoria(){
  //Declarando uma variável usuState 
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/funcionario`);
    console.log(data);
    setDados(data);
  }

  useEffect( ()=>{
    listar();
  }, []);


    return(
        <>
         <Titulolista titulo = "Funcionario"
        descricao = "Gerencia aqui os Funcionarios da biblioteca"
        rota = "/cadastrofuncionario" />


        <div className="row">
  <div className="col">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Código</th>
          <th scope="col">Nome</th>
          <th scope="col">CPF</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Nascimento</th>
          <th scope="col">Salario</th>
          <th scope="col">Contratação</th>
        </tr>
      </thead>
      <tbody>
        { dados.map( (d, i)=>(
          <tr>
            <td>
          <a className="btn btn-primary"
             href={`/cadastrofuncionario/${d.idfuncionario}`} >Alterar</a>
          </td>
          <td>{d.idfuncionario}</td>
          <td>{d.nomefuncionario}</td>
          <td>{d.cpf}</td>
          <td>{d.email}</td>
          <td>{d.telefone}</td>
          <td>{d.nascimento}</td>
          <td>{d.salario}</td>
          <td>{d.contratacao}</td>
        </tr>
        )  )}
        
      </tbody>
    </table>
  </div>
</div>

        </>

        
    );
};