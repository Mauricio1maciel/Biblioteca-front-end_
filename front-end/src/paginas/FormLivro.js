//Questão 2 Requisito funcional - Livros
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormAutor(){
    const navegacao = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [edicao, setEdicao] = useState('');
    const [paginas, setPaginas] = useState('');
    const [publicacao, setPublicacao] = useState('');
    const [foto, setFoto] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [resumo, setResumo] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [condicaofisica, setCondicaofisica] = useState('');
    const [emprestado, setEmprestado] = useState(false);
    const [ideditora, setIdeditora] = useState('');
    const [idcategoria, setIdcategoria] = useState('');


    const [editoras, setEditoras] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const voltar = ()=>{
        navegacao('/');
    };

    const selecionar = async () => {
        let {data} = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
        setEdicao(data.edicao);
        setPaginas(data.paginas);
        setPublicacao(data.publicacao);
        setFoto(data.foto);
        setLocalizacao(data.localizacao);
        setResumo(data.resumo);
        setAtivo(data.ativo);
        setCondicaofisica(data.condicaofisica);
        setEmprestado(data.emprestado);
        setIdeditora(data.ideditora);
        setIdcategoria(data.idcategoria);
    }

    const carregarEditoras = async () => {
        const { data } = await axios.get('http://localhost:4000/editora');
        setEditoras(data);
    };

    const carregarCategorias = async () => {
        const { data } = await axios.get('http://localhost:4000/categoria');
        setCategorias(data);
    };

    const alterar = async () => {
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "ativo": ativo,
            "condicaofisica": condicaofisica,
            "emprestado": emprestado,
            "ideditora": ideditora,
		    "idcategoria": idcategoria
        };

        await axios.put(`http://localhost:4000/livro/${id}`,body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "titulo": titulo,
            "edicao": edicao,
            "paginas": paginas,
            "publicacao": publicacao,
            "foto": foto,
            "localizacao": localizacao,
            "resumo": resumo,
            "ativo": ativo,
            "condicaofisica": condicaofisica,
            "emprestado": emprestado,
            "ideditora": ideditora,
		    "idcategoria": idcategoria
        };

        await axios.post(`http://localhost:4000/livro`,body);
        voltar();
    }

    const salvar = async () => {
        if (id) {
            alterar();
        }
        else{
            inserir();
        }
    }
    const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    }

    useEffect(()=>{
        carregarEditoras();
        carregarCategorias();
        if (id){
            selecionar();
        }
    },[])


    return(
        <>
        <TituloCadastro id={id} titulo="Livro"/>
        
        <form>
            {id && (
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                Código
                </label>
                <input
                type="text"
                className="form-control"
                value = {id}
                />
            </div>
            )}
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Titulo
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {titulo}
                    onChange = {(evento)=> setTitulo(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Edicao
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {edicao}
                    onChange = {(evento)=> setEdicao(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Paginas
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {paginas}
                    onChange = {(evento)=> setPaginas(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Publicação
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {publicacao}
                    onChange = {(evento)=> setPublicacao(evento.target.value)}
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Localização
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {localizacao}
                    onChange = {(evento)=> setLocalizacao(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Condição fisica
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {condicaofisica}
                    onChange = {(evento)=> setCondicaofisica(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Resumo
                </label>
                <textarea className="form-control"
                    value = {resumo}
                    onChange = {(evento)=> setResumo(evento.target.value)}
                >
                </textarea>
            </div>
            <div className="mb-3">
                    <label className="form-label">Editora</label>
                    <select className="form-select" value={ideditora} onChange={e => setIdeditora(e.target.value)}>
                        <option value="">Selecione uma editora</option>
                        {editoras.map(editora => (
                            <option key={editora.ideditora} value={editora.ideditora}>
                                {editora.nomeeditora}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" value={idcategoria} onChange={e => setIdcategoria(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.idcategoria} value={categoria.idcategoria}>
                                {categoria.nomecategoria}
                            </option>
                        ))}
                    </select>
                </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Foto
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {foto}
                    onChange = {(evento)=> setFoto(evento.target.value)}
                />
                <img className="img-thumbnail"
                    src={foto}
                    style={{width:'250px'}}
                />
            </div>
            <button type="button" 
                    className="btn btn-primary"
                    onClick = {() => salvar()}
            >
                Salvar
            </button>
            <button type="button" 
                    className="btn btn-secondary" 
                    onClick = {() => voltar()}
            >
                Cancelar
            </button>
            {id &&(
            <button type="button" 
            className="btn btn-danger"
            onClick = {()=> excluir()}>
                Excluir
            </button>
            )}
        </form>

        </>
    );
};