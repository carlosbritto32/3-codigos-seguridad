import React from "react";

const SECURITY_CODE = "pinky";

// function UseState(props) { si escribo props, al momento d llamar name debe ser props.name
function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    loading: false,
    error: false,
    deleted: false,
    confirmed: false,
  });

  // CONSTANTES DECLARATIVAS!!
  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
      value: "",
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  // USE EFFECT!
  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 1000);
    }
  }, [state.loading]);

  // CODIGO ORIGINAL AL QUE LE PREGUNTAMOS QUE EJECUTAR!
  if (!state.deleted && !state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando..</p>}

        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(e) => {
            onWrite(e.target.value);
            // setValue(e.target.value);
          }}
        />
        <button
          // onClick={() => setError((prevState) => !prevState)} es igual que el de abajo
          onClick={() => {
            // setLoading(true)
            onCheck();
          }}
        >
          Comprobar
        </button>
      </React.Fragment>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar Use State</h2>
        <p>¿Seguro quieres eliminar UseState</p>

        <button
          onClick={() => {
            onDelete();
          }}
        >
          Si, eliminar
        </button>

        <button
          onClick={() => {
            onReset();
          }}
        >
          no, volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Use State fue eliminado</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Recuperar UseState
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
