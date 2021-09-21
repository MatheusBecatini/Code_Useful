import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import buscarDados from "./Services";

function App() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const handleGet = async () => {
    setCarregando(true);
    const retorno = await buscarDados();
    console.log(retorno);
    setDados(retorno);
    setCarregando(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Buscando dados do google docs</h1>
        {carregando ? (
          <p>Carregando ...</p>
        ) : (
          <button onClick={() => handleGet()}>Buscar</button>
        )}

        {dados &&
          !carregando &&
          dados.length > 0 &&
          dados.map((item, index) => {
            return (
              <p key={index}>
                {item.nome}, {item.idade}, {item.dataNascimento}
              </p>
            );
          })}
      </header>
    </div>
  );
}

export default App;
