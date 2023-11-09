import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './App.css';

Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

function InserirDadosModal({ isOpen, onRequestClose }) {
  const [login, setlogin] = useState('');
  const [senha, setsenha] = useState('');
  const [confirmasenha, setconfirmasenha] = useState('');
  const [nome, setnome] = useState('');
  const [endereco, setendereco] = useState('');
  const [bairro, setbairro] = useState('');
  const [cep, setcep] = useState('');
  const [cidade, setcidade] = useState('');
  const [uf, setuf] = useState('');
  const [celular, setcelular] = useState('');
  const [generosfav, setgenerosfav] = useState('');
  const [autoresfav, setautoresfav] = useState('');
  const [func, setfunc] = useState('');

  const handleInserir = async () => {
    try {
      const response = await axios.post('https://localhost:44323/api/usuario', {
        login:login,
        senha:senha,
        confirmasenha:confirmasenha,
        nome:nome,
        endereco:endereco,
        bairro:bairro,
        cep:cep,
        cidade:cidade,
        uf:uf,
        celular:celular,
        generosfav:generosfav,
        autoresfav:autoresfav,
        func:func
      });

      // Lógica para lidar com a resposta (pode ser um redirecionamento ou atualização da lista, por exemplo)
      console.log('Inserção bem-sucedida', response.data);

      // Fechar o modal após o sucesso
      onRequestClose();
    } catch (error) {
      console.error('Erro ao inserir dados', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Inserir Dados"
    >
      <h2>Inserir Dados</h2>
      <form>
        <label>Login:</label>
        <input type="text" value={login} onChange={(e) => setlogin(e.target.value)} />
        <label>Senha:</label>
        <input type="text" value={senha} onChange={(e) => setsenha(e.target.value)} />
        <label>Confirmar Senha:</label>
        <input type="text" value={confirmasenha} onChange={(e) => setconfirmasenha(e.target.value)} />
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setnome(e.target.value)} />
        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={(e) => setendereco(e.target.value)} />
        <label>Bairro:</label>
        <input type="text" value={bairro} onChange={(e) => setbairro(e.target.value)} />
        <label>Cep:</label>
        <input type="text" value={cep} onChange={(e) => setcep(e.target.value)} />
        <label>Cidade:</label>
        <input type="text" value={cidade} onChange={(e) => setcidade(e.target.value)} />
        <label>UF:</label>
        <input type="text" value={uf} onChange={(e) => setuf(e.target.value)} />
        <label>Celular:</label>
        <input type="text" value={celular} onChange={(e) => setcelular(e.target.value)} />
        <label>Generos Favoritos:</label>
        <input type="text" value={generosfav} onChange={(e) => setgenerosfav(e.target.value)} />
        <label>Autor Favoritos:</label>
        <input type="text" value={autoresfav} onChange={(e) => setautoresfav(e.target.value)} />
        <label>Funcionario:</label>
        <input type="text" value={func} onChange={(e) => setfunc(e.target.value)} />
        <button onClick={handleInserir}>Inserir</button>
      </form>
    </Modal>
  )
}

export default InserirDadosModal