// src/components/login/Login.js
// --------------------------------------------------------
// Page de connexion admin.
// Note: ton backend FastAPI attend un vrai formulaire
// "application/x-www-form-urlencoded" (OAuth2PasswordRequestForm).
// On envoie donc un URLSearchParams, pas du JSON.
// --------------------------------------------------------
import { Component } from "react";
import withNavigation from "../menu/withNavigation";
import instance from "../../axiosConfig";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      erreur: "",
    };

    this.getToken = this.getToken.bind(this);
    this.setResponseData = this.setResponseData.bind(this);
  }

  render() {
    return (
      <>
        <h2>Connexion admin</h2>

        {this.state.erreur && (
          <p style={{ color: "red" }}>{this.state.erreur}</p>
        )}

        <label htmlFor="usager">Usager : </label>
        <input
          type="text"
          id="usager"
          value={this.state.username}
          onChange={(e) => this.setUsername(e.target.value)}
        />
        <br />

        <label htmlFor="motdepasse">Mot de passe : </label>
        <input
          type="password"
          id="motdepasse"
          value={this.state.password}
          onChange={(e) => this.setPassword(e.target.value)}
        />
        <br />

        <button onClick={this.getToken}>Se connecter</button>
      </>
    );
  }

  // setters simples pour le state
  setUsername(value) {
    this.setState({ username: value });
  }

  setPassword(value) {
    this.setState({ password: value });
  }

  // Appelle /token avec un formulaire urlencoded
  getToken() {
    const form = new URLSearchParams();
    form.append("username", this.state.username);
    form.append("password", this.state.password);

    instance
      .post("/token", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(this.setResponseData)
      .catch((err) => {
        console.log(err);
        this.setState({
          erreur: "Login pas bon (usager ou mot de passe).",
        });
      });
  }

  // Stocke le token et envoie l’usager au dashboard admin
  setResponseData(response) {
    localStorage.setItem(
      "AUTH_TOKEN",
      response.data.token_type + " " + response.data.access_token
    );

    this.props.navigate("/admin");
  }
}

export default withNavigation(Login);
