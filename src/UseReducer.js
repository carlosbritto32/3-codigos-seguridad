import React from "react";

const SECURITY_CODE = "pacha";

// function UseState(props) { si escribo props, al momento d llamar name debe ser props.name
function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // USE EFFECT!
  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          // onConfirm();
          dispatch({
            type: "CONFIRM",
          });
        } else {
          // onError();
          dispatch({
            type: "ERROR",
          });
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
            // onWrite(e.target.value);
            dispatch({
              type: "WRITE",
              payload: e.target.value,
            });
          }}
        />
        <button
          // onClick={() => setError((prevState) => !prevState)} es igual que el de abajo
          onClick={() => {
            // onCheck();
            dispatch({
              type: "CHECK",
            });
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
            // onDelete();
            dispatch({
              type: "DELETE",
            });
          }}
        >
          Si, eliminar
        </button>

        <button
          onClick={() => {
            // onReset();
            dispatch({
              type: "RESET",
            });
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
            // onReset();
            dispatch({
              type: "RESET",
            });
          }}
        >
          Recuperar UseState
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  CONFIRM: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  WRITE: {
    ...state,
    value: payload,
  },
  DELETE: {
    ...state,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
