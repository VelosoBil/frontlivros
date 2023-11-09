import { useEffect, useState } from 'react';
import logo from './Assets/usuario8.png';
import './App.css';
//import 'bootstrap,dist,css,bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';



function App() {
  const baseUrl = 'https://localhost:44323/api/usuario';
  const [data,setData] = useState([]);
 // const [updatedata,setUpdateData] = useState(true);
  const[modaladicionar,setmodaladicionar]= useState(false);
  const[modaleditar,setmodaleditar]= useState(false);
  const[modaldeletar,setmodaldeletar]= useState(false);
  const[userselect,setuserselect]= useState({
    id: '',
    login: '',
    senha: '',
    confirmasenha: '',
    nome: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    celular: '',
    generosfav: '',
    autoresfav: '',
    func: ''
  })
  

  const usuarioselecionado = (usuariolab,opçao)=>{
    setuserselect(usuariolab);
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
    setuserselect({
      ...userselect,[name]:value
    })
    console.log(userselect)
  }
  async function pedidoget() {
    await axios.get(baseUrl)
    .then (Response=>{
      setData(Response.data);
    }).catch(error=>{
      console.log(error);
    })    
  }

  
    async function pedidoPost () {
      //delete userselect.id;
      await axios.post(baseUrl,usuarioselecionado)
      .then (Response=>{
        setData(data.concat(Response.data));
       // setUpdateData (True);
        abrirfecharmodaladicionar();
      }).catch(error=>{
        console.log(error);
      })
     
    }
    async function pedidoPut(){
       axios.put = (baseUrl + "/" +  userselect.id,userselect)
      .then (Response=>{
        var resposta = Response.data;
        var dadosauxiliar = data;
        dadosauxiliar.map(userr=>{
          if(userr.id === usuarioselecionado.id){
            userr.login = resposta.login;
            userr.senha = resposta.senha;
            userr.confirmasenha = resposta.confirmasenha;
            userr.nome = resposta.nome;
            userr.endereco = resposta.endereco;
            userr.bairro = resposta.bairro;
            userr.cep = resposta.cep;
            userr.cidade = resposta.cidade;
            userr.uf = resposta.uf;
            userr.celular = resposta.celular;
            userr.generosfav = resposta.generosfav;
            userr.autoresfav = resposta.autoresfav;
            userr.func = resposta.func; 
          }
        })
        //setUpdateData (True);
        abrirfecharmodaleditar();
        
        }).catch(error=>{
          console.log(error);
      }) 
    }
    
    const pedidoDelete= async() =>{
      delete usuarioselecionado.id;
      await axios.put(baseUrl + "/"+ usuarioselecionado.id,usuarioselecionado)
      .then (Response=>{
        setData(data(Response.data));
        //setUpdateData (True);
        abrirfecharmodaldeletar();
      }).catch(error=>{
        console.log(error);
      })
    }
   
    useEffect(()=>{
      pedidoget();
  })

  return (
    <div className="App">
      <br/>
      <h3 > Cadastro de Usuarios</h3>
      <header >
      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' crossorigin='anonymous'/>
        <img src={logo}  alt='logo' />
        <button className='btn btn-success' onClick={()=> abrirfecharmodaladicionar()}>Adicionar novo Usuario</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>id</th>
            <th>login</th>
            <th>senha</th>
            <th>confirmasenha</th>
            <th>nome</th>
            <th>endereco</th>
            <th>bairro</th>
            <th>cep</th>
            <th>cidade</th>
            <th>uf</th>
            <th>celular</th>
            <th>generosfav</th>
            <th>autoresfav</th>
            <th>func</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
        {data.map(userapp=>(
            <tr key={userapp.id}>
              <td>{userapp.id}</td>
              <td>{userapp.login}</td>
              <td>{userapp.senha}</td>
              <td>{userapp.confirmasenha}</td>
              <td>{userapp.nome}</td>
              <td>{userapp.endereco}</td>
              <td>{userapp.bairro}</td>
              <td>{userapp.cep}</td>
              <td>{userapp.cidade}</td>
              <td>{userapp.uf}</td>
              <td>{userapp.celular}</td>
              <td>{userapp.generosfav}</td>
              <td>{userapp.autoresfav}</td>
              <td>{userapp.func}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> usuarioselecionado(userapp,'editar')}>Editar</button>
                <button className='btn btn-danger' onClick={()=> usuarioselecionado(userapp,'deletar')}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      <Modal isOpen={modaladicionar}>
          <ModalHeader>Adicionar Usuarios</ModalHeader>
          <ModalBody>
            <div className='form-group'>
            <label>Id:</label>
              <br/>
              <input type="text"  name =  "id" onChange={handleChange} placeholder="ID em branco"/>
              <br/>
              <label>Login:</label>
              <br/>
              <input type="text"  name =  "login" onChange={handleChange} placeholder="Insira login"/>
              <br/>
              <label>Senha:</label>
              <br/>
              <input type="text"  name =  "senha" onChange={handleChange} placeholder="Insira senha"/>
              <br/>
              <label>Confirmasenha:</label>
              <br/>
              <input type="text"  name =  "confirmasenha" onChange={handleChange} placeholder="Confirmar a senha"/>
              <br/>
              <label>Nome:</label>
              <br/>
              <input type="text"  name =  "nome" onChange={handleChange} placeholder="Insira o nome"/>
              <br/>
              <label>Endereço:</label>
              <br/>
              <input type="text"  name =  "endereco" onChange={handleChange} placeholder="Insira o endereço"/>
              <br/>
              <label>Bairro:</label>
              <br/>
              <input type="text"  name =  "bairro" onChange={handleChange} placeholder="Insira o bairro"/>
              <br/>
              <label>Cep:</label>
              <br/>
              <input type="text"  name =  "cep" onChange={handleChange} placeholder="Insira o cep"/>
              <br/>
              <label>Cidade:</label>
              <br/>
              <input type="text"  name =  "cidade" onChange={handleChange} placeholder="Insira a cidade"/>
              <br/>
              <label>Uf:</label>
              <br/>
              <input type="text" name =  "uf" onChange={handleChange} placeholder="Insira a UF"/>
              <br/>
              <label>Celular:</label>
              <br/>
              <input type="text"  name =  "celular" onChange={handleChange} placeholder="Insira o celular"/>
              <br/>
              <label>Generos Favorito:</label>
              <br/>
              <input type="text"  name =  "generosfav" onChange={handleChange} placeholder="Genero Favorito"/>
              <br/>
              <label>Autores favoritos:</label>
              <br/>
              <input type="text"  name =  "autoresfav" onChange={handleChange} placeholder="Autor Favorito"/>
              <br/>
              <label>Funcionario:</label>
              <br/>
              <input type="text"  name =  "func" onChange={handleChange} placeholder="Marque se é funcionario"/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=>pedidoPost()}>Adicionar</button>
            <button className='btn btn-danger' onClick={()=> abrirfecharmodaladicionar()}>Cancelar</button>
          </ModalFooter>
          </Modal>
        
        <Modal isOpen={modaleditar}>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>ID:</label>
              <br/>
              <input type="text"  name =  "id" onChange={handleChange} placeholder="ID"
              value={userselect && userselect.id}/>
              <br/>
              <label>Login:</label>
              <br/>
              <input type="text"  name =  "login" onChange={handleChange} placeholder="login"
              td={userselect && userselect.login}/>
              <br/>
              <label>Senha:</label>
              <br/>
              <input type="text"  name =  "senha" onChange={handleChange} placeholder="Senha"
              value={userselect && userselect.senha}/>
              <br/>
              <label>Confirmasenha:</label>
              <br/>
              <input type="text"  name =  "confirmasenha" onChange={handleChange} placeholder="confirmasenha"
              value={userselect && userselect.confirmasenha}/>
              <br/>
              <label>Nome:</label>
              <br/>
              <input type="text"  name =  "nome" onChange={handleChange} placeholder="nome"
              value={userselect && userselect.nome}/>
              <br/>
              <label>End:</label>
              <br/>
              <input type="text"  name =  "endereco" onChange={handleChange} placeholder="endereco"
              value={userselect && userselect.endereco}/>
              <br/>
              <label>Bairro:</label>
              <br/>
              <input type="text"  name =  "bairro" onChange={handleChange} placeholder="bairro"
              value={userselect && userselect.bairro}/>
              <br/>
              <label>Cep:</label>
              <br/>
              <input type="text"  name =  "cep" onChange={handleChange} placeholder="cep"
              value={userselect && userselect.cep}/>
              <br/>
              <label>Cidade:</label>
              <br/>
              <input type="text"  name =  "cidade" onChange={handleChange} placeholder="cidade"
              value={userselect && userselect.cidade}/>
              <br/>
              <label>Uf:</label>
              <br/>
              <input type="text"  name =  "uf" onChange={handleChange} placeholder="uf"
              value={userselect && userselect.uf}/>
              <br/>
              <label>Celular:</label>
              <br/>
              <input type="text"  name =  "celular" onChange={handleChange} placeholder="celular"
              value={userselect && userselect.celular}/>
              <br/>
              <label>Generos Favorito:</label>
              <br/>
              <input type="text"  name =  "generosfav" onChange={handleChange} placeholder="generosfav"
              value={userselect && userselect.generosfav}/>
              <br/>
              <label>Autores favoritos:</label>
              <br/>
              <input type="text"  name =  "autoresfav" onChange={handleChange} placeholder="autoresfav"
              value={userselect && userselect.autoresfav}/>
              <br/>
              <label>Funcionario:</label>
              <br/>
              <input type="text"  name =  "funcionario" onChange={handleChange} placeholder="funcionario"
              value={userselect && userselect.func}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=>pedidoPut()}>Editar</button>
            <button className='btn btn-danger' onClick={()=>abrirfecharmodaleditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isopen={modaldeletar}>
          <modalBody>
              Confirmar a exclusão desse usuario:{userselect && userselect.id}?
          </modalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=>pedidoDelete()}>Sim</button>
            <button className='btn btn-second' onClick={()=>abrirfecharmodaldeletar()}>Não</button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default App
