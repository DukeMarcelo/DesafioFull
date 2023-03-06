import React, {useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import image from "./acn.png";

const dataInit = {
  cep: "",
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
};
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listCia,setListCia] = useState();
  const [listCia2,setListCia2] = useState();
  const [values, setValues] = useState(dataInit);
  const [data, setData] = useState(dataInit);
  const [cnpjCia, setCnpjCia] = useState("");
  const [ setEmpresa] = useState("");
  const [cep, setCep] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [age, setAge] = useState(0);
  const [rows, setRows] = useState([
    { empresa: "",
      nome: "",
      cepp: "",
      email: "",
      cnpj: "",
      rg:"",
      birthdate:"",
      selected: false, }, ]);

  const handleIdadeChange = (event) => {
    const age = calculateAge(event.target.value);
    setAge(age);
  };

 const handleChandeValues = (value) => {
    setValues((prevValue) => ({
    ...prevValue,
    [value.target.name]: value.target.value,
   }));
 };
 
  const handleClickButton = () => {
    alert("Cadastro salvo com sucesso!");
  Axios.post("http://localhost:3001/register1", {
      cnpjCia: values.cnpjCia,
      company: values.company,
      complemento: values.complemento,
      numero: values.numero,
      cep: values.cep,
      bairro: data.bairro,
      localidade: data.localidade,
      logradouro: data.logradouro,
      uf: data.uf,
    }).then((response) => {
      console.log(response);
  });
      rows.forEach((row) => {
        Axios.post("http://localhost:3001/register2", {
          cepp: row.cepp,
          cnpj: row.cnpj,
          email: row.email,
          nome: row.nome,
          birthdate: row.birthdate,
          rg: row.rg,
          empresa: row.empresa,
        }).then((response) => {
          console.log(response);
                 });
      });}
  
  const handleCnpjCiaChange = (event) => {
    const cnpjValue = event.target.value;
    setCnpjCia(cnpjValue);
    const updatedRows = rows.map((row) => ({
      ...row,
      empresa: cnpjValue ? cnpjValue.substr(0, 14) : "",
    }));
    setRows(updatedRows);
  };
  
  const cepCode = () => {
    if (cep.length < 8) {
      return;
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json`, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty("erro")) {
            setData(dataInit);
            alert("CEP informado não existe na base");
          } else {
            setData({
              ...values,
              cep: data.cep,
              logradouro: data.logradouro,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    cepCode();
  }, [cep]);


  const handleSearch = () => {
    Axios.get(`http://localhost:3001/Cia?cnpjCia=${searchTerm}`).then((response) => {
      setListCia(response.data);
    });
  };

  const handleSearch2 = () => {
    Axios.get(`http://localhost:3001/Vendor?empresa=${searchTerm}`).then((response) => {
      setListCia2(response.data);
    });
  };

  const handleInputChange = (event, index, field) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return {
          ...row,
          [field]: field === "cnpj" ? event.target.value.substr(0, 14) : event.target.value,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const addRow = () => {
    const newRow = {
      empresa: cnpjCia,
      nome: "",
      cepp: "",
      email: "",
      cnpj: "",
      rg:"",
      birthdate:"",
      selected: false,
    };
    setRows([...rows, newRow]);
    setShowMessage(false);
  };
  
const removeRow = () => {
const selectedRows = rows.filter((row) => row.selected);
if (selectedRows.length === 0) {
  alert("Você deve selecionar pelo menos um fornecedor!");
  return;
}

rows.findIndex((row) => row.selected);
const updatedRows = rows.filter((row) => !row.selected);

if (updatedRows.length === 0) {
  setRows(updatedRows);
  setShowMessage(true);
} else {
  setRows(updatedRows);
}};

     
return (
  <div className="texting">
    <img src={image} alt="Logo da ACN" />
    <div className="board">
      <h1 style={{ textAlign: "center" }}>Cadastro da Empresa</h1>
      
      <label> CNPJ :
      <input type="number" maxLength="14" width="100px"  placeholder="Digite o CNPJ :" 
  onChange={(event) => {handleCnpjCiaChange(event); handleChandeValues(event);}}
  onBlur={(event) => {handleCnpjCiaChange(event);}}
    name="cnpjCia" className="container-input" style={{ width: "105px" }}/></label>

<label>Nome da Empresa :
       <input type="text" placeholder="Digite o nome da Empresa:" className="container-input" style={{ width: "300px" }}
          name= "company"  onChange={handleChandeValues}/></label>
 <label>CEP: 
      <input  type="number" pattern="\d{0,8}" placeholder="Digite seu CEP" className="container-input"
       style={{ width: "110px" }}  name="cep" value={cep} onChange={(event) => {setCep(event.target.value);
    handleChandeValues(event);}}/></label>

        <label>Endereço:  
        <input className="container-input" type="text" disabled value={data.logradouro} placeholder="Endereço/Rua:" style={{ width: "250px" }} onChange={handleChandeValues}  name="logradouro"/></label>  
         
         <label>Número: 
        <input className="container-input" type="number" placeholder="numero" maxLength="6" style={{ width: "60px" }}
          name="numero" onChange={handleChandeValues}/></label>

        <label>Complemento: 
        <input className="container-input" type="text" placeholder="Compl." maxLength="10" style={{ width: "70px" }}
         name="complemento" onChange={handleChandeValues}/></label>

         <p >
          <label>Bairro: <input className="container-input" type="text" disabled value={data.bairro}   placeholder="Bairro: " onChange={handleChandeValues}  name="bairro"/></label>

       <label>Cidade: <input className="container-input" type="text" disabled value={data.localidade}   placeholder="Cidade: " onChange={handleChandeValues}  name="localidade"/></label>

       <label>UF: <input className="container-input" type="text" disabled value={data.uf}   placeholder="UF: " onChange={handleChandeValues}  name="UF"/></label>
</p>
 <h2> Cadastro de vendors </h2>
      {rows.map((item, index) => (
        
        <div key={index} style={{ display: 'flex', flexWrap: 'wrap' }}>
         
<label>Selecionar:
            <input className="container-input" type="checkbox" checked={item.selected} onChange={(event) =>
                handleInputChange(event, index, "selected") }/> </label>

<label> CNPJ da Empresa de Origem:
            <input className="container-input" type="text" disabled value={item.empresa} placeholder="CPF/CNPJ da Empresa"  maxLength="14"
              onChange={(event) => setEmpresa({ nome_empresa: event.target.value })}/></label>

<label> Digite CPF/ CNPJ do vendor:
            <input className="container-input" type="text" value={item.cnpj} placeholder="Digite o CPF/CNPJ do Vendor"  maxLength="14"
              onChange={(event) => handleInputChange(event, index, "cnpj")}/></label>

<label> Digite Nome do Vendor:
            <input className="container-input" type="text" value={item.nome}name="nome" placeholder="Nome do Vendor"
              onChange={(event) => handleInputChange(event, index, "nome")}/></label>

<label>Digite CEP vendor: 
             <input className="container-input" type="text" value={item.cepp} name="cepp" placeholder="Digite o CEP do Vendor" maxLength="8"
              onChange={(event) => handleInputChange(event, index, "cepp")}/></label>

<label>Digite Email do Vendor:
            <input className="container-input" type="text" placeholder="E-mail do vendor" value={item.email} name="email" 
              onChange={(event) => handleInputChange(event, index, "email")}/></label>
<p>
{item.cnpj.length === 11 && (
<>
  <div style={{ display: "flex", alignItems: "center" }}>
    <label >RG:</label>
    <input
      placeholder="RG"
      type="text"
      value={item.rg}
      name="rg"
      onChange={(event) => handleInputChange(event, index, "rg")}
    />
    <label htmlFor="birthdate">Data Nasc:</label>
    <input
      type="date"
      id="birthdate"
      name="birthdate"
      value={item.birthdate}
      onChange={(event) => {
        handleIdadeChange(event);
        handleInputChange(event, index, "birthdate");
      }}
    />
  </div>
</>
              )}</p>
        </div>))}

      {showMessage ? (
          <p style={{ color: "red" }}>Não há nenhum fornecedor cadastrado.</p>
                  ) : null}
                <button className="botao" onClick={addRow}>Adicionar linha</button>
                <button className="botao" onClick={removeRow}>Remover linha</button>

                <div style={{ marginTop: "20px" }}>
                <button className="botao" onClick= {() => handleClickButton()} disabled={data.uf === "PR" && age < 18 && age > 0}>                   
                     Salvar Cadastro </button>
                    
        <div></div>
        
        {data.uf === "PR" && age < 18 && age > 0 && (
        <p>Para a região do Paraná, só aceitamos vendor maiores de idade.</p>)}

  </div>
  </div>
  <div className="board2">
  <h2>EMPRESAS</h2>
    <label>Para pesquisar as Empresas com seus respectivos fornecedores, digite o numero do CNPJ da empresa: 
  <input className="container-input" placeholder="CNPJ/CPF da empresa" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></label>
  <p>
  <button className="botao" onClick={() => { handleSearch(); handleSearch2(); }}>Pesquisa das Empresas Cadastradas</button>
  </p>
      <p>
  {typeof listCia !== "undefined" &&
  listCia.map((value) =>{
    return (
      <p>
        CNPJ: {value.cnpjCia}, Empresa: {value.company} <br />
        Rua:{value.logradouro}, Num:{value.numero}, Compl.:{value.complemento}
        , CEP: {value.cep}, Bairro: {value.bairro}, Cidade: {value.localidade}, Uf:{value.uf}
      </p>
      
    );
  })}
</p>

  <div></div></div>
 <h2>FORNECEDORES</h2>

 {typeof listCia2 !== "undefined" &&
  listCia2.map((value) => {
    return(
    <Card 
            Key={value.id}
            listCard2={listCia2}
            setlistCard2={setListCia2}
            cepp={value.cepp}
            cnpj={value.cnpj}
            email={value.email}
            empresa={value.empresa}
            nome={value.nome}
            birthdate={value.birthdate}
            rg={value.rg}
            id={value.idvendor2}
                
                
></Card>

  );
  })}

  </div>
    )
            }
  export default App;