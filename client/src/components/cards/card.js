import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () =>{
        setOpen(true);
    };

  return (
    <>
      <FormDialog 
      open={open} 
      setOpen={setOpen}
      cnpj={props.cnpj}
      nome={props.nome}
      cepp={props.cepp}
      email={props.email}
      id={props.id}
      birthdate={props.birthdate}
      rg={props.rg}  
      listCard={props.listCard}
      setListCard={props.setListCard}
     
      />
      <div className="card-container" onClick={() =>
    handleClickCard()}>
      <h1 className="card-title">CNPJ/CPF: {props.cnpj}</h1>
      <h2 className="card-subtitle">Empresa: {props.nome}</h2>
      <p className="card-text">CEP: {props.cepp}, email:{props.email}, RG:{props.rg}, Data de Nascimento: {props.birthdate}, ID: {props.id}</p>
    </div>
    </>
  );
}

