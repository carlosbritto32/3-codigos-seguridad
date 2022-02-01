import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
      loading: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el código de seguridad.</p>

        {this.state.error && <p>Error: el codigo es incorrecto</p>}
        {this.state.loading && <p>Cargando...</p>}

        <input placeholder="Codigo de seguridad" />

        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </React.Fragment>
    );
  }
}

export { ClassState };
