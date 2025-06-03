//Qustão 6 Requisito funcional - Empréstimo de livro
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FormEmprestimo() {
    const navegacao = useNavigate();
    const { id } = useParams(); 
    const [titulo, setTitulo] = useState('');
    const [idusuario, setIdusuario] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const SelecionarLivro = async () => {
        const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
    };

    const SelecionarUsuarios = async () => {
        const { data } = await axios.get(`http://localhost:4000/usuario`);
        setUsuarios(data);
    };

    const voltar = () => {
        navegacao('/');
    };

    const salvar = async () => {
        const body = {
            idlivro: id,
            idusuario: idusuario
        };

        await axios.post(`http://localhost:4000/emprestar`, body);
        voltar();
    };

    useEffect(() => {
        SelecionarLivro();
        SelecionarUsuarios();
    }, []);

    return (
        <div>
            <h2>Empréstimo de Livro</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Título do Livro</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Usuário</label>
                    <select
                        className="form-select"
                        value={idusuario}
                        onChange={(e) => setIdusuario(e.target.value)}
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.idusuario} value={usuario.idusuario}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => salvar()}
                >
                    Salvar
                </button>
                <button 
                type="button" 
                className="btn btn-secondary ms-2" 
                onClick={() => voltar()}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}
