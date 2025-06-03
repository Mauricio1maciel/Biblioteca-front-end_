import Titulolista from "../componentes/TituloLista";
import axios from "axios";
import { useState , useEffect } from "react";


function formatarData(dataStr) {
  if (!dataStr || dataStr.toString().length !== 8) return "Data inválida";

  const ano = dataStr.toString().substring(0, 4);
  const mes = dataStr.toString().substring(4, 6);
  const dia = dataStr.toString().substring(6, 8);

  return `${dia}/${mes}/${ano}`;
}
export default function Home(){
const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/livro`);
    console.log(data);
    setDados(data);
  }

  useEffect( ()=>{
    listar();
  }, []);


  
    return(
        <>
         <br />
   <div className="row justify-content-md-center">
    <div className="col-md-auto">
      <button type="button" className="btn btn-primary btn-lg">
        Large button
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Large button
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Large button
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Large button
      </button>
    </div>
  </div> 

  <br />


  
<div className="row">
  { dados.map( (d,i)=>(
<div className="col-12 col-md-6 col-lg-4 mb-4">
  <div className="card h-100 shadow-sm">
    <div className="row g-0 h-100">
      <div className="col-6">
        <img
          src={d.foto}
          className="img-fluid h-100 w-100 rounded-start"
          alt={d.titulo}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="col-6">
        <div className="card-body d-flex flex-column h-100">
          <h5 className="card-title">{d.titulo}</h5>
          <p className="card-text mb-1">Edição {d.edicao}</p>
          <p className="card-text mb-1">
            <small className="text-muted">{d.paginas} Páginas</small>
          </p>
          <p className="card-text mb-1">
            <small className="text-muted">Ano publicação: {formatarData(d.publicacao)}</small>
          </p>
          <p className="card-text mb-1">
            <strong>Condição física:</strong> {d.condicaofisica}
          </p>
          <p className="card-text mb-1">
            <strong>Localização:</strong> {d.localizacao}
          </p>
          <p className={`card-text ${d.emprestado ? 'text-danger' : 'text-success'} fw-semibold`}>
            {d.emprestado ? 'Livro emprestado' : 'Livro disponível'}
          </p>
          <p className="card-text small text-secondary flex-grow-1">
            {d.resumo}
          </p>
          <div className="mt-2">
            <a href='*' className="btn btn-primary btn-sm w-100">Emprestimo</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

) )}
  </div> 


        </>
    );
};