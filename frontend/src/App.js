import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itens, setItens] = useState([]);

  // buscar itens
  const fetchItens = async () => {
    const res = await axios.get("http://localhost:3001/itens");
    setItens(res.data);
  };

  useEffect(() => {
    fetchItens();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventário</h1>

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
          <img src={item.imagem} width="100" />
        </div>
      ))}
    </div>
  );
}

export default App;