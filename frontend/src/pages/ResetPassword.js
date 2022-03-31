import React, { useEffect, useState } from "react";

// styling
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// icons
import logo from "images/logo.svg";
import illustration from "images/login-illustration.svg";

// imports
import axios from "axios";
import * as Yup from "yup";
import Swal from 'sweetalert2';
// import config from "../Config.js";
import tw, { css } from "twin.macro";
import { resEncrypt } from '../RsaEncryption';
import { useHistory } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import PasswordStrengthBar from 'react-password-strength-bar';

import { Alert } from "../components/misc/Alert";
import { Container as ContainerBase } from "components/misc/Layouts";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const Subheading = tw.h5`font-bold text-primary-500`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

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

const StepOne = ({ setMessage, setCurrentStep }) => {
    const history = useHistory();
    const signupUrl = "http://localhost:3004/register";
    const token = window.location.href.split("/").slice(-1);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [publicKey, setPublicKey] = useState();

    useEffect(() => {
        axios.get(`/keys`)
            .then((response) => {
                let key = response.data.publicKey;
                console.log(response.data.publicKey);
                setPublicKey(key);
                console.log(publicKey);
            });
    });

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const ResetPasswordSchema = Yup.object({
        password: Yup.string()
            .required('Your password is required')
            .min(12, "Must have at least 12 characters.")
            .test('Unique Password', 'New password can\'t be your old password.', // <- key, message
                function (value, context) {
                    return new Promise((resolve, reject) => {
                        console.log(context);
                        axios.post(`http://localhost:8003/api/u/user/reset-password/verify-password-uniqueness`, {
                            token: token[0],
                            incomingPassword: value
                        })
                            .then((res) => {
                                resolve(true);
                            })
                            .catch((error) => {
                                if (error.response.data.code === 401) {
                                    resolve(false);
                                } else {
                                    resolve(true);
                                }
                            });
                    });
                }
            ),
        passwordConfirmation: Yup.string()
            .required('You need to confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const updateUserPassword = (values) => {
        setIsSubmitted(true);
        axios
            .post(`/u/user/account/reset-password`, {
                token: token[0],
                incomingPassword: values.password,
                part: "store"
            })
            .then((results) => {
                history.push({
                    pathname: `/login`,
                });
            })
            .catch((error) => {
                if (error.response.data.code === 500) {
                    Toast.fire({
                        icon: 'error',
                        title: `Please contact an administrator for help!`
                    });

                    // setMessage({ color: "red", message: "Please contact an administrator for help!" })
                }
            })
            .finally(() => {
                setMessage("");
                setCurrentStep(1);
                setIsSubmitted(false);
            });
    };

    return (
        <Formik
            initialValues={
                {
                    password: '',
                    passwordConfirmation: ''
                }
            }
            validateOnChange={false}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
                updateUserPassword(values);
            }}
        >

            <Form css={[tw.form`mx-auto max-w-xs`]}>
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
                    <span className="text">Save</span>
                </SubmitButton>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                    Dont have an account?{" "}
                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                        Sign Up
                    </a>
                </p>
            </Form>
        </Formik>
    );
};

export default function ResetPassword() {
    const history = useHistory();
    const token = window.location.href.split("/").slice(-1);
    React.useEffect(() => {
        axios
            .post(`/u/user/reset-password/verify-reset-token`, {
                token: token[0]
            })
            .catch((error) => {
                if (error.response.data.code === 401) {
                    history.push("/");
                    // Expired
                }

                if (error.response.data.code === 403) {
                    // Forbidden - either it has already been done or fail
                    if (error.response.data.message === "filler") {
                        // Reset already accomplished
                        history.push("/");
                    } else {
                        // Token mismatch error
                        history.push("/");
                    }
                }

                if (error.response.data.code === 500) {
                    // General failure
                    history.push("/");
                }

                console.log(error.response);
            });
    });

    // Pre Defined Variables
    const illustrationImageSrc = illustration;
    const logoLinkUrl = "http://localhost:3004/";

    // Team's Defined Variable
    const [currentStep, setCurrentStep] = React.useState(0);
    const [message, setMessage] = React.useState("To reset your password, please provide your Twilio SendGrid username.");
    const steps = [
        <StepOne
            setMessage={setMessage}
            setCurrentStep={setCurrentStep}
        />,
    ];

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
    );
}