import React, { useRef } from "react";

// styling
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// icons
import logo from "images/logo.svg";
import { FaBeer } from 'react-icons/fa';
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
import { SearchOutline } from 'react-ionicons';
import { Formik, Form, useField } from 'formik';
import ClipLoader from "react-spinners/ClipLoader";
import { Toast, swalWithBootstrapButtons } from '../shared/swal';

import { Alert } from "../components/misc/Alert";
import { Container as ContainerBase } from "components/misc/Layouts";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const Subheading = tw.h5`font-bold text-primary-500`
const FormContainer = tw.div`w-full flex-1 mt-8`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

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
        <div>
            <label htmlFor={props.id || props.name} css={[tw`font-bold`]}>{label}</label>
            <input css={[tw`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:border-solid focus:border-blue-400 first:mt-0 invalid:border-solid invalid:border-red-500 `]} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div css={[tw`text-xs text-red-600`]}>{meta.error}</div>
            ) : null}
        </div>
    );
};

const StepOne = ({ setMessage, setCurrentStep }) => {
    // links
    const signupUrl = "http://localhost:3004/signup";
    const forgotPasswordUrl = "http://localhost:3004/account/begin_password_reset";

    const history = useHistory();
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const ResetPasswordSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Please enter your email address!")
    });

    const searchUserExists = (values) => {
        setIsSubmitted(true);

        axios
            .post(`${config.baseUrl}/u/user/begin-reset-password/${values.email}`)
            .catch((error) => {
                // handleClick();
                if (error.response.data.code === 500) {
                    Toast.fire({
                        icon: 'error',
                        title: `Please contact an administrator for help!`
                    })
                }
            })
            .finally(() => {
                setMessage("");
                setCurrentStep(1);
                setIsSubmitted(false);
            })
    }

    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validateOnChange={false}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
                searchUserExists(values);
            }}
        >

            <Form css={[tw.form`mx-auto max-w-xs`]}>
                <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="JaneDoe@gmail.com"
                />

                <SubmitButton type="submit">
                    <SearchOutline color="white" />
                    <span className="text">Search</span>
                </SubmitButton>
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
                {/* <Alert
                    ref={ref}
                /> */}
            </Form>
        </Formik>
    )
}

const StepTwo = () => {
    return (
        <FormContainer>
            <div css={[tw`text-gray-600`]}>
                If we found an account associated with that username, we've sent password reset instructions to the primary email address on the account.
            </div>
            <DividerTextContainer>
                <DividerText css={[tw`leading-normal`]}>
                    Still having trouble logging in? Contact Support.
                </DividerText>
            </DividerTextContainer>
        </FormContainer>
    )
}

export default function BeginPasswordReset() {
    // Pre Defined Variables
    const illustrationImageSrc = illustration;
    const logoLinkUrl = "http://localhost:3004/";

    // Team's Defined Variable
    const [currentStep, setCurrentStep] = React.useState(0);
    const [message, setMessage] = React.useState("To reset your password, please provide your Twilio SendGrid username.")
    const steps = [
        <StepOne
            setMessage={setMessage}
            setCurrentStep={setCurrentStep}
        />,
        <StepTwo />]

    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <MainContainer css={[tw`flex h-screen`]}>
                        <div css={[tw`m-auto`]}>
                            <LogoLink href={logoLinkUrl}>
                                <LogoImage src={logo} />
                            </LogoLink>
                            <MainContent>
                                <Heading>Reset Password</Heading>
                                <Subheading css={[tw`text-center`]}>
                                    {message}
                                </Subheading>
                                <FormContainer>
                                    {[steps[currentStep]]}
                                </FormContainer>
                            </MainContent>
                        </div>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage >
    )
}