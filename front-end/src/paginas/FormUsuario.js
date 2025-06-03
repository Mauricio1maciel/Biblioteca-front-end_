//Qustão 3 Requisito funcional - Usuários
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormCategoria(){
    const navegacao = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telafone, setTelafone] = useState('');
    const [nascimento, setNascimento] = useState('');

    const voltar = ()=>{
        navegacao('/listausuario');
    };

    const selecionar = async () => {
        let {data} = await axios.get(`http://localhost:4000/usuario/${id}`);
        setNome(data.nome);
        setCpf(data.cpf);
        setEmail(data.email);
        setTelafone(data.telafone);
        setNascimento(data.nascimento)
    }

    const alterar = async () => {
        let body = {
            "nome": nome,
            "cpf": cpf,
            "email" : email,
	        "telafone": telafone,
            "nascimento" : nascimento
        };

        await axios.put(`http://localhost:4000/usuario/${id}`,body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "nome": nome,
            "cpf": cpf,
            "email" : email,
	        "telafone": telafone,
            "nascimento" : nascimento
        };

        await axios.post(`http://localhost:4000/usuario`,body);
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
        await axios.delete(`http://localhost:4000/usuario/${id}`);
        voltar();
    }

    useEffect(()=>{
        if (id){
            selecionar();
        }
    },[])


    return(
        <>
        <TituloCadastro id={id} titulo="Usuario"/>
        
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
                   Nome
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {nome}
                    onChange = {(evento)=> setNome(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   CPF
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {cpf}
                    onChange = {(evento)=> setCpf(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Email
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {email}
                    onChange = {(evento)=> setEmail(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Telefone
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {telafone}
                    onChange = {(evento)=> setTelafone(evento.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                   Nascimento
                </label>
                <input
                    type="text"
                    className="form-control"
                    value = {nascimento}
                    onChange = {(evento)=> setNascimento(evento.target.value)}
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