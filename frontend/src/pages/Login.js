import React, {useContext, useEffect} from "react";

// styling
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// icons
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import illustration from "images/login-illustration.svg";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";

// imports
import axios from "axios";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import config from "../Config.js";
import tw, { css } from "twin.macro";
import { useHistory } from "react-router-dom";

import { Formik, Form, useField } from 'formik';
import { ClipLoader, HashLoader, FadeLoader, BeatLoader, SyncLoader } from "react-spinners";
import { Toast, swalWithBootstrapButtons } from '../shared/swal';
import { Container as ContainerBase } from "components/misc/Layouts";
import { TokenContext } from "../components/TokenContext";


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
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  return (
    <div css={[tw`mt-6`]}>
      <label htmlFor={props.id || props.name} css={[tw`font-bold`]}>{label}</label>
      <input css={[tw`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:border-solid focus:border-blue-400 first:mt-0 invalid:border-solid invalid:border-red-500 `]} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div css={[tw`text-xs text-red-600`]}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const StepOne = ({ setMessage, setCurrentStep, ...props }) => {
  // styling
  const submitButtonText = "Sign In";
  const SubmitButtonIcon = LoginIcon;
  let {token, setToken} = useContext(TokenContext)

  useEffect(() => {
    console.log(token);
  }, [])

  // team's defined variables
  const history = useHistory();

  const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Please enter your email address!"),
    password: Yup.string()
      .required('Your password is required')
  });

  const validateLogininformation = (values) => {
    axios
      .post(`${config.baseUrl}/u/user/signin`, {
        email: values.email,
        password: values.password,
      }, {withCredentials: true})
      .then((results) => {
        //access token into context
        setToken(results.data.token)
        // localStorage.setItem('token', results.data.token);

        localStorage.setItem('displayName', results.data.displayName);
        history.push({ pathname: "/" });
      })
      .catch((error) => {
        if (error.response.data.code === 401) {
          if (error.response.data.message === "Banned.") {
            setMessage({
              data: "Your account has been banned. Please contact an administrator",
              type: "alert-danger",
            });
          } else if (error.response.data.message === "Locked Out.") {
            setMessage({
              data: "Your account has been locked. Please reset your password before proceeding.",
              type: "alert-danger",
            });
          } else {
            setMessage({
              data: "Your username or password is invalid.",
              type: "alert-danger",
            });
          }
        }

        if (error.response.data.code === 500) {
          setMessage({
            data: "Please contact an administrator for help.",
            type: "alert-danger",
          });
        }
      })
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validateOnBlur
      validateOnChange={false}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        var bt = document.getElementById('mySubmit');
        bt.disabled = true;
        validateLogininformation(values);
        setSubmitting(false);
        bt.disabled = false;
      }}
    >
      {({ isSubmitting }) => (
        <Form css={[tw.form`mx-auto max-w-xs`]}>
          {isSubmitting ? (
            <div css={[tw`flex flex-col min-h-48 justify-center items-center`]}>
              <div >
                <SyncLoader color={"#3c0d99"} loading={isSubmitting} size={150} speedMultiplier={0.5} size={15} />
              </div>
              <span css={[tw`mt-5 italic`]}>Authenticating...</span>
            </div>
          ) : (
            <div>
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="JaneDoe@gmail.com"
              />

              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>)}

          <SubmitButton type="submit" disabled={isSubmitting} id="mySubmit">
            <SubmitButtonIcon className="icon" />
            <span className="text">{submitButtonText}</span>
          </SubmitButton>
        </Form>
      )}
    </Formik>
  )
}

const StepTwo = () => {

  return (
    <p>INSERT 2FA WHEN DONE</p>
  )
}

export default function Login() {
  // Pre Defined Variables
  const logoLinkUrl = "http://localhost:3004/";
  const signupUrl = "http://localhost:3004/signup";
  const forgotPasswordUrl = "http://localhost:3004/account/forgot_password";

  const illustrationImageSrc = illustration;
  const headingText = "Sign In To UMS";

  // Team's Defined Variables
  const [data, setData] = React.useState({
    email: "",
  });
  const [currentStep, setCurrentStep] = React.useState(0);
  const [message, setMessage] = React.useState({ data: "", type: "" });
  const steps = [
    <StepOne
      setMessage={setMessage}
      setCurrentStep={setCurrentStep}
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
                {/* message errors  */}
                {message.data.length > 0 ? (
                  <div css={[tw`mt-5`]}>
                    <div css={[tw`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`]} role="alert">
                      <span css={[tw`block sm:inline`]}>{message.data}</span>
                      {/* <span css={[tw`block sm:inline`]}>Something seriously bad happened.</span> */}
                      <span css={[tw`absolute top-0 bottom-0 right-0 px-4 py-3`]} onClick={() => setMessage({ data: "", type: "" })}>
                        <svg css={[tw`fill-current h-6 w-6 text-red-500`]} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                    Sign Up
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
}