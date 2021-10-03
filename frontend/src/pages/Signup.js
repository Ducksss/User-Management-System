import React, { useState } from "react";

// styling 
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
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import ClipLoader from "react-spinners/ClipLoader";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
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

export default function Signup() {
  const logoLinkUrl = "#";
  const illustrationImageSrc = illustration;
  const headingText = "Sign Up For Treact";
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com"
    }
  ];
  const submitButtonText = "Sign Up";
  const SubmitButtonIcon = SignUpIcon;
  const tosUrl = "#";
  const privacyPolicyUrl = "#";
  const signInUrl = "http://localhost:3004/login";

  // Team's Defined Variables
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const registerUserInformation = (values) => {
    axios
      .post(`${config.baseUrl}/u/user/create-account`, {
        email: values.email,
        username: values.username,
        password: values.password,
        contact: values.contact,
        address: values.address
      })
      .then((results) => {
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
      .finally(() => {
        setIsSubmitted(false);
      })
  }

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
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    contactNumber: '',
                    password: '',
                    acceptedTerms: false, // added for our checkbox
                    jobType: '', // added for our select
                  }}
                  validationSchema={Yup.object({
                    firstName: Yup.string()
                      .max(15, 'Must be 15 characters or less')
                      .required('Your first name is required'),
                    lastName: Yup.string()
                      .max(20, 'Must be 20 characters or less')
                      .required('Your last name is required'),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Your email is required')
                      .test('Unique Email', 'Email already in use', // <- key, message
                        function (value, context) {
                          return new Promise((resolve, reject) => {
                            axios.get(`http://localhost:8003/api/u/user/${value}/available`)
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
                      .required('Your contact number is required'),
                    password: Yup.string()
                      .required('Your password is required')
                      .min(5, "Your password must be minimally 5 characters long!"),
                    passwordConfirmation: Yup.string()
                      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    acceptedTerms: Yup.boolean()
                      .required('Required')
                      .oneOf([true], 'You must accept the terms and conditions.'),
                    jobType: Yup.string()
                      .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Invalid Job Type'
                      )
                      .required('Required'),
                  })}
                  validateOnChange={false}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      {/** First Name */}
                      <Input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="First name"
                      />
                      {(errors.firstName && touched.firstName) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.firstName}</span>}

                      {/** Last Name */}
                      <Input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        placeholder="Last name"
                      />
                      {(errors.lastName && touched.lastName) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.lastName}</span>}

                      {/**Email */}
                      <Input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="email"
                      />
                      {(errors.email && touched.email) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.email}</span>}

                      {/**Contact Number */}
                      <Input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contactNumber}
                        placeholder="Contact number"
                      />
                      {(errors.contactNumber && touched.contactNumber) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.contactNumber}</span>}

                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="password"
                      />
                      {(errors.password && touched.password) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.password}</span>}

                      <Input
                        type="password"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirmation}
                        placeholder="Confirm Password"
                      />
                      {(errors.passwordConfirmation && touched.passwordConfirmation) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.passwordConfirmation}</span>}

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
                  )}
                </Formik>
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

let errorMessages = {
  color: "red",
  fontSize: "12px",
  paddingLeft: "0.8rem"
}
