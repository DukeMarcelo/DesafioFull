import React, {useState} from "react";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";

export default function FormDialog(props) {
const[editValues, setEditValues] = useState({
    empresa:props.empresa,
    cepp:props.cepp,
    cnpj:props.cnpj,
    email:props.email,
    nome:props.nome,
    birthdate:props.birthdate,
    rg:props.rg,
    id:props.id,
});

    const handleEditCia = ()=>{
        Axios.put("http://localhost:3001/Edit", {
            empresa:editValues.empresa,
            cepp:editValues.cepp,
            cnpj:editValues.cnpj,
            email:editValues.email,
            nome:editValues.nome,
            birthdate:editValues.birthdate,
            rg:editValues.rg,
            id:editValues.id,
        })
        handleClose();
    };

    const handleDeleteVendor = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
      };
   
  const handleClose = () => {
    props.setOpen(false);
  };

const  handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
        ...prevValues,
        [values.target.id]: values.target.value,
    }));
};

  return (
      <Dialog 
      open={props.open}  
      onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >    
        <DialogTitle id="form-dialog-title">Editar os dados do Vendor</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="cnpj"
            label="Alterar CNPJ"
            defaultValue={props.cnpj}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            onInput={(event) => {
                event.target.value = event.target.value.slice(0, 18);
            }}
            />
         <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Alterar Nome"
            defaultValue={props.nome}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
                   <TextField
            autoFocus
            margin="dense"
            id="cepp"
            label="Alterar CEP"
            defaultValue={props.cepp}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
                   <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Alterar Email"
            defaultValue={props.email}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
                          <TextField
            autoFocus
            margin="dense"
            id="rg"
            label="Alterar RG"
            defaultValue={props.rg}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
                          <TextField
            autoFocus
            margin="dense"
            id="birthdate"
            label="Data de nascimento"
            defaultValue={props.birthdate}
            onChange={handleChangeValues}
            type="date"
            fullWidth
          />
                                    <TextField
            autoFocus
            margin="dense"
            id="id"
            label="id"
            disabled
            defaultValue={props.id}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">            
            Cancel
          </Button>
          <Button onClick={handleEditCia} color="primary">            
            Salvar
          </Button>
          <Button onClick={handleDeleteVendor} color="primary">            
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
  );
}
