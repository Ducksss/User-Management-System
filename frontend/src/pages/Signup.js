import React, { useEffect, useState } from "react";

// styling 
import "../styles/globalStyles.css"
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";

// icons
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import illustration from "images/signup-illustration.svg";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

// imports
import axios from "axios";
import * as Yup from "yup";
import config from "../Config.js";
import tw, { css } from "twin.macro";
import { resEncrypt } from '../RsaEncryption';
import { useHistory } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import PasswordStrengthBar from 'react-password-strength-bar';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const notReadySubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  return (
    <div css={[tw`mt-6`]}>
      <label htmlFor={props.id || props.name} css={[tw`font-bold`]}>{label}</label>
      <input css={[tw`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:border-solid focus:border-blue-400 first:mt-0 invalid:border-solid invalid:border-red-500 `]} {...field} {...props} />
      {field.name === "password" ? (
        <PasswordStrengthBar
          password={meta.value}
        />) : (null)}
      {meta.touched && meta.error ? (
        <div css={[tw`text-xs text-red-600`]}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const StepOne = ({ publicKey, setCurrentStep }) => {
  // links
  const tosUrl = "#";
  const privacyPolicyUrl = "#";
  const signInUrl = "http://localhost:3004/login";

  // Pre defined
  const submitButtonText = "Sign Up";
  const SubmitButtonIcon = SignUpIcon;

  // Team's predefined variable
  const history = useHistory();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Your first name is required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Your last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Your email is required')
      .test('Unique Email', 'The email has already been taken', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8003/api/u/user/email/${value}/available`)
              .then((res) => {
                resolve(true)
              })
              .catch((error) => {
                if (error.response.data.content === "The email has already been taken.") {
                  resolve(false);
                }
              })
          })
        }
      ),
    contactNumber: Yup.string()
      .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, "Must be a phone number")
      .required('Your contact number is required')
      .test('Unique Number', 'The number has already been taken', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios.get(`${config.baseUrl}/u/user/number/${value}/available`)
              .then((res) => {
                resolve(true)
              })
              .catch((error) => {
                if (error.response.data.code === 409) {
                  resolve(false);
                }
              })
          })
        }
      ),
    password: Yup.string()
      .required('Your password is required')
      .min(12, "Your password must be minimally 12 characters long!"),
    passwordConfirmation: Yup.string()
      .required('You need to confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

  const registerUserInformation = (values) => {
    axios
      .post(`${config.baseUrl}/u/user/create-account`, {
        firstName: resEncrypt(values.firstName, publicKey),
        lastName: resEncrypt(values.lastName, publicKey),
        email: resEncrypt(values.email, publicKey),
        password: resEncrypt(values.password, publicKey),
        contact: resEncrypt(values.contactNumber, publicKey),
      })
      .then((results) => {
        console.log(results)
        history.push({
          pathname: "/login",
          state: "success"
        });
      })
      .catch((error) => {
        if (error.response.data.description === "Invalid Credentials.") {
          console.log("Please key in a your valid credentials")
        }

        if (error.response.data.description === "Internal error") {
          console.log("Please contact an administrator for help!")
        }
      })
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        password: '',
        passwordConfirmation: '',
      }}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        registerUserInformation(values);
      }}
    >

      <Form css={[tw`mx-auto max-w-xs`]} >
        {/** First Name */}
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />

        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />

        <MyTextInput
          label="Email"
          name="email"
          type="email"
          placeholder="JaneDoe@gmail.com"
        />

        <MyTextInput
          label="Contact number"
          name="contactNumber"
          type="text"
          placeholder="+6596472290"
        />

        <MyTextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <MyTextInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="Password"
        />

        <SubmitButton type="submit">
          <SubmitButtonIcon className="icon" />
          <span className="text">{submitButtonText}</span>
        </SubmitButton>

        <p tw="mt-6 text-xs text-gray-600 text-center">
          I agree to abide by treact's{" "}
          <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
            Terms of Service
          </a>{" "}
          and its{" "}
          <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
            Privacy Policy
          </a>
        </p>

        <p tw="mt-8 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
            Sign In
          </a>
        </p>
      </Form>
    </Formik>
  )
}

const StepTwo = () => {
  return (
    <>
      <div>
        All done!
      </div>
      <div>
        An email has been sent for you to verify your account.
      </div>
    </>
  )
}

export default function Signup() {
  // links
  const tosUrl = "#";
  const logoLinkUrl = "#";
  const privacyPolicyUrl = "#";
  const signInUrl = "http://localhost:3004/login";

  // Pre defined
  const submitButtonText = "Sign Up";
  const SubmitButtonIcon = SignUpIcon;
  const headingText = "Sign Up For Treact";
  const illustrationImageSrc = illustration;

  // Team's Defined Variables
  const [publicKey, setPublicKey] = useState();
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    axios.get(`${config.baseUrl}/keys`)
      .then((response) => {
        let key = response.data.publicKey
        console.log(response.data.publicKey);
        setPublicKey(key);
        console.log(publicKey)
      });
  });

  const steps = [
    <StepOne
      setCurrentStep={setCurrentStep}
      publicKey={publicKey}
    />,
    <StepTwo />
  ];

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                {steps[currentStep]}
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage >
  );
}