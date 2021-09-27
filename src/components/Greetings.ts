import { customElement, LitElement, property, html } from "lit-element";
import { User } from "../domain/user";
import { store } from "../store";
import { login, logout } from "../store/slices/user";
import { connect } from "../store/utils";

@customElement("app-greetings")
@connect(store, (s) => s.user, {
  login: login,
  logout: logout,
})
export class Greetings extends LitElement {
  onPropsChanged(user: User) {
    this.user = user;
  }

  @property({ type: Object, reflect: true })
  user!: User;

  onLogin() {
    this.dispatchEvent(new CustomEvent("login", { detail: "Luciano" }));
  }

  onLogout() {
    this.dispatchEvent(new CustomEvent("logout"));
  }

  render() {
    const {
      user: { name, isLogged },
    } = this;

    return html`<h3>
      Hi ${name}
      <button @click=${isLogged ? this.onLogout : this.onLogin}>
        ${isLogged ? "Logout" : "Login"}
      </button>
    </h3>`;
  }
}
