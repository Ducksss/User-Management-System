import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { withRouter } from 'react-router-dom';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Redirect } from 'react-router-dom';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import tw from 'twin.macro';
// import Config from '../Config';
const MainContent = tw.div`mt-12 flex flex-col items-center w-full`;
const DetailRow = tw.div`border rounded-lg border-gray-400  w-8/12 `;

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`;

// const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const HeaderRow = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`;


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const Subscribe = ({ location }) => {

  // Get the lookup key for the price from the previous page redirect.
  const [clientSecret] = useState(location.state.clientSecret);
  const [subscriptionId] = useState(location.state.subscriptionId);
  const [name, setName] = useState('Jenny Rosen');
  const [messages, _setMessages] = useState('');
  const [paymentIntent, setPaymentIntent] = useState();

  // helper for displaying status messages.
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return '';
  }

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        }
      }
    });

    if (error) {
      // show error and collect new card details.
      setMessage(error.message);
      return;
    }
    setPaymentIntent(paymentIntent);
  };

  if (paymentIntent && paymentIntent.status === 'succeeded') {
    return <Redirect to={{ pathname: '/account' }} />;
  }

  return (
    <div>
      <Header />

      <MainContent>
        <h1>Subscribe</h1>

        {/* <p>
          Try the successful test card: <span>4242424242424242</span>.
        </p>

        <p>
          Try the test card that requires SCA: <span>4000002500003155</span>.
        </p>

        <p>
          Use any <i>future</i> expiry date, CVC,5 digit postal code
        </p>

        <hr /> */}
        <DetailRow>
          <form onSubmit={handleSubmit}>
            <InfoRow>
              <HeaderRow>
                Full name</HeaderRow>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

            </InfoRow>
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                  margin: 'auto',
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
            <HeaderRow>
              <button>
                Subscribe
              </button>
            </HeaderRow>
            <div>{messages}</div>
          </form>
        </DetailRow>
      </MainContent>
      <Footer />
    </div>
  );
};
// Wrapper for stripe promise, do not remove this - matthew
const Wrapper = (props) => (
  <Elements stripe={stripePromise}>
    <Subscribe {...props} />
  </Elements>
);
export default withRouter(Wrapper);
