const express = require ("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

        const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"senha",
        database:"cia",
        });

        app.use(cors());
        app.use(express.json());

        app.get('/Cia', (req, res) => {
          const cnpjCia = req.query.cnpjCia;
          db.query('SELECT * FROM company2 WHERE cnpjCia = ?', [cnpjCia], (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).send('Erro ao realizar a consulta');
            } else {
              res.json(results);
            }
          });
        });

        app.get('/Vendor', (req, res) => {
          const empresa = req.query.empresa;
          db.query('SELECT * FROM vendor2 WHERE empresa = ?', [empresa], (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).send('Erro ao realizar a consulta');
            } else {
              res.json(results);
            }
          });
        });

      app.post("/register1", (req, res) => {
           const {cnpjCia} = req.body;
           const {company} = req.body; 
           const {complemento} = req.body;
           const {numero} = req.body;
           const {cep} = req.body;
           const {bairro} = req.body;
           const {localidade} = req.body;
            const {logradouro} = req.body;
            const {uf} = req.body;

let SQL = "INSERT INTO company2 (cnpjCia,company,complemento,numero,cep,bairro,localidade,logradouro,uf) VALUES (?,?,?,?,?,?,?,?,?)";
 db.query(SQL, [cnpjCia,company,complemento,numero,cep,bairro,localidade,logradouro,uf], (err, result ) =>{console.log(err);});});
  
 app.post("/register2", (req,res) => {
            const {cepp} = req.body;
            const {cnpj} = req.body;
            const {email} = req.body;
            const {nome} = req.body;
            const {birthdate} = req.body;
            const {rg} = req.body;
            const {empresa} = req.body;
             
            let SQL = "INSERT INTO vendor2 (empresa,cepp,cnpj,email,nome,birthdate,rg) VALUES (?,?,?,?,?,?,?)";
             
           db.query(SQL, [empresa,cepp,cnpj,email,nome,birthdate,rg], (err, result ) =>{
             console.log(err);
            });
        }); 

   app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    
    let SQL = "DELETE FROM cia.vendor2 WHERE idvendor2= ?"

    db.query (SQL, [id], (err, result) => {
      if(err) console.log(err);
      else res.send(result);
    });});

  app.put("/Edit", (req,res) => {
    const {id}  = req.body;
    const {cepp} = req.body;
    const {email} = req.body;
    const {nome} = req.body;
    const {birthdate} = req.body;
    const {cnpj} = req.body;
    const {rg} = req.body;
  
    let SQL = "UPDATE vendor2 SET cepp= ?, cnpj= ?, email= ?, nome= ?, birthdate= ?, rg= ? WHERE idvendor2= ?";

    db.query(SQL, [cepp,cnpj,email,nome,birthdate,rg,id], (err, result)=> {
      if (err) console.log(err);
      else res.send(result);
    });
  })

app.listen(3001, () => {
    console.log("rodando servidor");
});