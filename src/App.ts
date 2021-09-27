import { customElement, html, LitElement } from "lit-element";

import "./components/BuyingList";
import "./components/Greetings";

@customElement("web-app")
export class App extends LitElement {
  render() {
    return html`<h1>LitElement + Redux + custom connect</h1>
      <app-greetings></app-greetings>
      <buying-list></buying-list>`;
  }
}
