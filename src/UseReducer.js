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
            type: actionTypes.confirm,
          });
        } else {
          // onError();
          dispatch({
            type: actionTypes.error,
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
              type: actionTypes.write,
              payload: e.target.value,
            });
          }}
        />
        <button
          // onClick={() => setError((prevState) => !prevState)} es igual que el de abajo
          onClick={() => {
            // onCheck();
            dispatch({
              type: actionTypes.check,
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
              type: actionTypes.delete,
            });
          }}
        >
          Si, eliminar
        </button>

        <button
          onClick={() => {
            // onReset();
            dispatch({
              type: actionTypes.reset,
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
              type: actionTypes.reset,
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

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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
