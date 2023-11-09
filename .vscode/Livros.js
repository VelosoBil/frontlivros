import { useEffect, useState } from 'react';
import logo from './Assets/usuario8.png';
import './App.css';
//import 'bootstrap,dist,css,bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';


function App() {
  const baseUrl = 'https://localhost:44323/api';
  const [data,setData] = useState([]);
  const[modaladicionar,setmodaladicionar]= useState(false);
  const[modaleditar,setmodaleditar]= useState(false);
  const[modaldeletar,setmodaldeletar]= useState(false);
  const[LivrostSelect,setLivroselect]= useState({
    id: '',
    titulo: '',
    autor: '',
    genero: '',
    biografia: '',
    endereco: '',
    editora: '',
    status: ''
  })
  const Livroselecionado = (livro,opçao)=>{
    setlivroselect(livro);
    (opçao==='editar')?
     abrirfecharmodaleditar(): abrirfecharmodaldeletar()
  }

  const abrirfecharmodaladicionar=()=>{
    setmodaladicionar(!modaladicionar);
  }
  const abrirfecharmodaleditar=()=>{
    setmodaleditar(!modaleditar);
  }
  const abrirfecharmodaldeletar=()=>{
    setmodaldeletar(!modaldeletar);
  }
  const handleChange=e=>{
    const {name,value} = e.target;
    setlivroselect({
      ...userselect,[name]:value
    })}
    console.log(livro)
  
  const pedidoget= async() =>{
    await axios.get(baseUrl+ "/livros")
    .then (Response=>{
      setData(Response.data);
    }).catch(error=>{
      console.log(error);
    })    
  }
 
  useEffect(()=>{
    pedidoget();
  })

  
    const pedidoPost= async() =>{
      delete Livro.id;
      await axios.post(baseUrl +"/livros" , livro)
      .then (Response=>{
        setData(data.concat(Response.data));
        abrirfecharmodaladicionar();
      }).catch(error=>{
        console.log(error);
      })
    }
  

    const pedidoPut= async() =>{
      delete livro.id;
      await axios.put(baseUrl + '/livros' + Livro.id)
      .then (Response=>{
        var resposta = Response.data;
        var dadosauxiliar = data;
        dadosauxiliar.map(LivroPut=>{
          if(livro.id=== LivroPut.id){
            livro.login = resposta.login;
            livro.titulo = resposta.titulo;
            livro.autor = resposta.autor;
            livro.genero = resposta.genero;
            Livro.biografia = resposta.biografia;
            Livro.editora = resposta.editora;
            Livro.status = resposta.status
          }
        });
        abrirfecharmodaleditar();
        }).catch(error=>{
          console.log(error);
      }) 
    }
    const pedidoDelete= async() =>{
      delete Livro.id;
      await axios.put(baseUrl + '/livros/'+ LivroPut.id)
      .then (Response=>{
        setData(data.filter(Livro=>Response.data));
        abrirfecharmodaldeletar();
      }).catch(error=>{
        console.log(error);
      })
    }
  return (
    <div className='App'>
      <br/>
      <h3> Cadastro de Livros</h3>
      <header >
      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' crossorigin='anonymous'/>
        <img src={logo}  alt='logo' />
        <button className='btn btn-success' onClick={()=> abrirfecharmodaladicionar()}>Adicionar novo Usuario</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>id</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Genero</th>
            <th>Biografia</th>
            <th>Esitora</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        {data.map(livro=>(
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.genero}</td>
              <td>{livro.biografia}</td>
              <td>{livro.bigrafia}</td>
              <td>{userFuncionario}</td>
              <td>{user.status}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> Livro(LivroPut,'editar')}>Editar</button>
                <button className='btn btn-danger' onClick={()=> Livro(LivroPut,'deletar')}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      <Modal isOpen={modaladicionar}>
          <ModalHeader>Adicionar Usuarios</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <br/>
              <imput type='text' className='form-control' name='titulo' onChange={handleChange}/>
              <br/>
              <label>Titulo:</label>
              <br/>
              <imput type='text' className='form-control' name='autor' onChange={handleChange}/>
              <br/>
              <label>Autor:</label>
              <br/>
              <imput type='text' className='form-control' name='genero' onChange={handleChange}/>
              <br/>
              <label>genero:</label>
              <br/>
              <imput type='text' className ='form-control' name='biografia' onChange={handleChange}/>
              <br/>
              <label>Buigrafia:</label>
              <br/>
              <imput type='Editora' className = 'control' name='editora' onChange ={handleChange}/>
              <br/>
              <label>Funcionario:</label>
              <br/>
              <imput type='Status' className ='form-control' name='status' onChange={handleChange}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=> pedidoPost()}>Salvar</button>
            <button className='btn btn-danger' onClick={()=> abrirfecharmodaladicionar()}>Cancelar</button>
          </ModalFooter>
          </Modal>
        <Modal isOpen={modaleditar}>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>ID:</label>
              <br/><imput type='text'  className ='form-control'  name='id' onChange={handleChange} readOnly
              value={Livro && userselect.id}/>
              <label>Titulo:</label>
              <br/>
              <imput type='text' className='form-control' name='titulo' onChange={handleChange} size='25'
              value={Livro && LivroPut.titulo}/>
              <br/>
              <label>Autor:</label>
              <br/>
              <imput type='text' className='form-control' name='autor' onChange={handleChange} size='25'
              value={Livro && LivroPut.autor}/>
              <br/>
              <label>Genero:</label>
              <br/>
              <imput type='text' className='form-control' name='genero' onChange={handleChange} size='25'
              value={Livro && LivroPut.genero}/>
              <br/>
              <label>Biografia:</label>
              <br/>
              <imput type='text' className ='form-control' name='Biografia' onChange={handleChange}
              value={Livro && LivroPut.bigrafia}/>
              <br/>
              <label>Editora:</label>
              <br/>
              <imput type='text' className = 'form-control' name='editora' onChange ={handleChange}
              value={Livro && LivroPut.editora}/>
              <br/>
              <label>Status:</label>
              <br/>
              <imput type='text' className ='form-control' name='func' onChange={handleChange}
              value={Livro && LivroPut.status}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=>pedidoPut()}>Editar</button>
            <button className='btn btn-danger' onClick={()=>abrirfecharmodaleditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isopen={modaldeletar}>
          <modalBody>
              Confirmar a exclusão desse usuario:{usuarioselecionado && usuarioselecionado.id}?
          </modalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=>pedidoDelete()}>Sim</button>
            <button className='btn btn-danger' onClick={()=>abrirfecharmodaleditar()}>Não</button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default App
