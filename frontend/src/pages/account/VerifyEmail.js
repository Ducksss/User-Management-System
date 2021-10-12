import React from "react";

// styling
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// icons
import logo from "images/logo.svg";
import illustration from "images/login-illustration.svg";

// imports
import axios from "axios";
import * as Yup from "yup";
import config from "../../Config.js";
import tw, { css } from "twin.macro";
import { IoWarning } from "react-icons/io5";
import { SyncLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import { Container as ContainerBase } from "components/misc/Layouts";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

export default function VerifyEmail() {
    // Pre Defined Variables
    const logoLinkUrl = "http://localhost:3004/";
    const signupUrl = "http://localhost:3004/signup";
    const forgotPasswordUrl = "http://localhost:3004/account/forgot_password";

    // Team's Defined Variables
    const [currentStep, setCurrentStep] = React.useState(0);
    const [message, setMessage] = React.useState({ data: "Verifying your email...", type: "unchecked" });

    React.useState(() => {
        const token = window.location.href.split("/").slice(-1);
        axios
            .post(`${config.baseUrl}/u/verify-email-verification`, {
                token: token
            })
            .then((results) => {
                console.log(results)
                setMessage({
                    data: "Your account is now verified!",
                    type: "Verified"
                })
            })
            .catch((error) => {
                setMessage({
                    data: "Your account is now verified!",
                    type: "Verified"
                })
            })
    })

    return (
        <Container>
            <Content>
                <MainContainer>
                    <LogoLink href={logoLinkUrl}>
                        <LogoImage src={logo} />
                    </LogoLink>
                    <MainContent>
                        <div css={[tw`flex flex-col items-center`]}>
                            <Heading>{message.data}</Heading>
                            <div css={[tw`mt-12`]}>
                                {message.data === "unchecked" ? (
                                    <SyncLoader color={"#6415FF"} loading={true} size={150} speedMultiplier={0.5} size={15} />
                                ) : (
                                    <>
                                    </>
                                )}
                            </div>
                        </div>
                        <FormContainer>
                            <p tw="mt-8 text-sm text-gray-600 text-center">
                                Dont have an account?{" "}
                                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                                    Sign Up
                                </a>
                            </p>
                        </FormContainer>
                    </MainContent>
                </MainContainer>
            </Content>
        </Container >
    )
}