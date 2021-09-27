import "./ProductsList";
import "./ProductForm";
import { customElement, LitElement, property, html } from "lit-element";
import { store } from "../store";
import { AutoAssign, connect } from "../store/utils";

@customElement("buying-list")
@connect(
  store,
  (s) => ({ hasProducts: s.buyingList.length >= 1 }),
  undefined,
  AutoAssign.Enabled,
)
export class BuyingList extends LitElement {
  @property({ type: Boolean })
  hasProducts: boolean = false;

  get noProducts() {
    return html`<span>No Products...</span>`;
  }

  render() {
    const { hasProducts } = this;

    return html`<h2>Products</h2>
      <product-form></product-form>
      ${hasProducts ? html`<products-list></products-list>` : this.noProducts}`;
  }
}
