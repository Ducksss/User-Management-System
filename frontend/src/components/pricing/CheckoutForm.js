import React, { useDebugValue } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";

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
        alert(result.token.id)
        axios.post(`http://localhost:8003/api/u/pricing/subscribe`, {
          token : result.token.id,
          amount : "$1",
          currency : "usd",

        })
            .then((response) => {
                
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
          <h3 name="product_name" value="hi"className="product-title">Apple MacBook Pro</h3>
          <h4 name="product_price" value="hi" className="product-price">$999</h4>
        </label>
          <CardSection />
          <input type="password" name="password" placeholder="Password" />
          
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