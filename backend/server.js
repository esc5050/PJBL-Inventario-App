const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1100",
  database: "inventario_db",
});

// testar conexão
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

// ================= ROTAS =================

// GET (listar itens)
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// POST (criar item)
app.post("/itens", (req, res) => {
  const { nome, preco_recomendado, preco_maximo, imagem } = req.body;

  const sql =
    "INSERT INTO itens (nome, preco_recomendado, preco_maximo, imagem) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [nome, preco_recomendado, preco_maximo, imagem],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Item criado com sucesso!" });
    }
  );
});

// PUT (atualizar)
app.put("/itens/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco_recomendado, preco_maximo, imagem } = req.body;

  const sql =
    "UPDATE itens SET nome=?, preco_recomendado=?, preco_maximo=?, imagem=? WHERE id=?";

  db.query(
    sql,
    [nome, preco_recomendado, preco_maximo, imagem, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Item atualizado!" });
    }
  );
});

// DELETE
app.delete("/itens/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM itens WHERE id=?", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Item deletado!" });
  });
});

// iniciar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});