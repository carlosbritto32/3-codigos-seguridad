import React from "react";

// function UseState(props) { si escribo props, al momento d llamar name debe ser props.name
function UseState({ name }) {
  const [error, setError] = React.useState(false);

  return (
    <React.Fragment>
      <h2>Eliminar {name}</h2>

      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: el codigo es incorrecto</p>}

      <input placeholder="Codigo de seguridad" />

      <button
        // onClick={() => setError((prevState) => !prevState)} es igual que el de abajo
        onClick={() => setError(!error)}
      >
        Comprobar
      </button>
    </React.Fragment>
  );
}

export { UseState };
