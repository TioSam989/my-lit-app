import { customElement, html, LitElement, property } from "lit-element";
import { Products } from "../domain/buyingList";
import { store } from "../store";
import { AutoAssign, connect } from "../store/utils";

@customElement("products-list")
@connect(
  store,
  (s) => ({ products: s.buyingList }),
  undefined,
  /** Will assign the products from the selector above to the products property below. */
  AutoAssign.Enabled,
)
export class ProductsList extends LitElement {
  @property({ type: Array, reflect: true })
  products: Products = [];

  render() {
    const { products } = this;
    return html`<ul>
      ${products.map(
        ({ name, quantity }) => html`<li>${name} (${quantity})</li>`,
      )}
    </ul>`;
  }
}
