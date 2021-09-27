import { customElement, html, LitElement } from "lit-element";
import { emitFormValues } from "../html-utils";
import { store } from "../store";
import { addProduct } from "../store/slices/buyingList";
import { connect } from "../store/utils";

@customElement("product-form")
@connect(
  store,
  undefined,
  /** As an object. */ {
    create: addProduct,
  },
)
export class ProductForm extends LitElement {
  onAdd: (e: Event) => void;

  constructor() {
    super();
    this.onAdd = emitFormValues(this, "create");
  }

  render() {
    return html`<form @submit=${this.onAdd}>
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value=""
        minlength="2"
        required
      />
      <label for="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value="1"
        min="1"
        max="99"
      />
      <button>Add</button>
    </form>`;
  }
}
