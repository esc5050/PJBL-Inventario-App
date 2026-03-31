import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    preco_recomendado: "",
    preco_maximo: "",
    imagem: "",
  });

  const [editId, setEditId] = useState(null);

  // buscar itens
  const fetchItens = async () => {
    const res = await axios.get("http://localhost:3001/itens");
    setItens(res.data);
  };

  useEffect(() => {
    fetchItens();
  }, []);

  // atualizar formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // adicionar ou editar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // EDITAR
      await axios.put(`http://localhost:3001/itens/${editId}`, form);
      setEditId(null);
    } else {
      // CRIAR
      await axios.post("http://localhost:3001/itens", form);
    }

    setForm({
      nome: "",
      preco_recomendado: "",
      preco_maximo: "",
      imagem: "",
    });

    fetchItens();
  };

  // deletar
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/itens/${id}`);
    fetchItens();
  };

  // preencher para editar
  const handleEdit = (item) => {
    setForm({
      nome: item.nome,
      preco_recomendado: item.preco_recomendado,
      preco_maximo: item.preco_maximo,
      imagem: item.imagem,
    });
    setEditId(item.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventário</h1>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="preco_recomendado"
          placeholder="Preço recomendado"
          value={form.preco_recomendado}
          onChange={handleChange}
        />
        <input
          name="preco_maximo"
          placeholder="Preço máximo"
          value={form.preco_maximo}
          onChange={handleChange}
        />
        <input
          name="imagem"
          placeholder="URL da imagem"
          value={form.imagem}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      {/* LISTA */}
      {itens.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.nome}</h3>
          <p>Preço recomendado: {item.preco_recomendado}</p>
          <p>Preço máximo: {item.preco_maximo}</p>
          <img src={item.imagem} width="100" alt="item" />

          <br />

          <button onClick={() => handleEdit(item)}>
            Editar
          </button>

          <button onClick={() => handleDelete(item.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;