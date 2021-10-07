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
import { Formik, Form } from 'formik';
import { SearchOutline } from 'react-ionicons'
import { useHistory } from "react-router-dom";
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

export default function BeginPasswordReset() {
    // Pre Defined Variables
    const submitButtonText = "Search";

    const logoLinkUrl = "http://localhost:3004/";
    const illustrationImageSrc = illustration;
    const forgotPasswordUrl = "#";
    const signupUrl = "http://localhost:3004/register";

    // Team's Defined Variables
    const ref = useRef(null);
    const history = useHistory();
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [message, setMessage] = React.useState({ color: "", wording: "" })

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

    const handleClick = () => {
        ref.current.showAlert()
    };

    const ResetPasswordSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Please enter your email address!")
    });

    const searchUserExists = (values) => {
        setIsSubmitted(true);

        axios
            .post(`${config.baseUrl}/u/user/begin-reset-password/${values.email}`)
            .then((results) => {
                let token = results.data.content.token
                history.push({
                    pathname: `/account/begin_password_reset/${token}`,
                });
            })
            .catch((error) => {
                handleClick();

                if (error.response.data.code === 401) {
                    Toast.fire({
                        icon: 'error',
                        title: `Please key in a your valid credentials.`
                    })

                    setMessage({ color: "red", message: "The email you have provided does not exist!" })
                }

                if (error.response.data.code === 500) {
                    Toast.fire({
                        icon: 'error',
                        title: `Please contact an administrator for help!`
                    })

                    setMessage({ color: "red", message: "Please contact an administrator for help!" })
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
                    <MainContainer css={[tw`flex h-screen`]}>
                        <div css={[tw`m-auto`]}>
                            <LogoLink href={logoLinkUrl}>
                                <LogoImage src={logo} />
                            </LogoLink>
                            <MainContent>
                                <Heading>Reset Password</Heading>
                                <Subheading css={[tw`text-center`]}>To reset your password, please provide your UMD System email.</Subheading>
                                <FormContainer>
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
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            /* and other goodies */
                                        }) => (
                                            <Form css={[tw.form`mx-auto max-w-xs`]}>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    placeholder="email"
                                                />
                                                {(errors.email && touched.email) && <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>{errors.email}</span>}

                                                <SubmitButton type="submit">
                                                    <SearchOutline color="white" />
                                                    <span className="text">{submitButtonText}</span>
                                                </SubmitButton>

                                                <Alert
                                                    ref={ref}
                                                />
                                            </Form>
                                        )}
                                    </Formik>
                                </FormContainer>
                            </MainContent>
                        </div>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>
    )
}