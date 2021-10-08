import React, { useDebugValue } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";
import Swal from "sweetalert2";
let Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
class CheckoutForm extends React.Component {

  handleSubmit = async event => {
    event.preventDefault();
    console.log(event.target.name)
    const data = new FormData(event.target);
    console.log(data)
    // Access FormData fields with `data.get(fieldName)`
    // For example, converting to upper case
    data.set('product_info', data.get('product_info'));
    console.log(data.product_info)
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      //Backend api
      axios.post(`http://localhost:8003/api/u/pricing/subscribe`, {
        token: result.token.id,
        amount: "$1",
        currency: "usd",
      })
        .then((response) => {
          Toast.fire({
            icon: "success",
            title: "Success!",
            text: "Item has successfully been bought",
          });
        })
        .catch((error) => {

        });
      console.log(result.token);
    }
  };

  render() {
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <label class="product-info">
            <h3 name="product_name" value="hi" className="product-title">Apple MacBook Pro</h3>
            <h4 name="product_price" value="hi" className="product-price">$999</h4>
          </label>
          <CardSection />
          <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}