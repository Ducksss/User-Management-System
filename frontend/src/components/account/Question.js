import React, { useState } from 'react'

import axios from "axios";
import * as Yup from "yup";
import config from "../../Config";
import tw, { css } from "twin.macro";
import styled from "styled-components";
import { Formik, Form, useField } from 'formik';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineAlert } from 'react-icons/ai'
import PasswordStrengthBar from 'react-password-strength-bar';

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
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

const Question = ({ header, content }) => {
    const [expanded, setExpanded] = useState(false);
    const [message, setMessage] = React.useState({ data: "", type: "alert-danger" });
    const [success, setSuccess] = React.useState({ data: "", type: "alert-danger" })

    const ResetPasswordSchema = Yup.object({
        currentPassword: Yup.string()
            .required('Your current password is required'),
        password: Yup.string()
            .required('Your password is required')
            .min(12, "Must have at least 12 characters.")
            .test('Unique Password', 'New password can\'t be your old password.', // <- key, message
                function (value, context) {
                    return new Promise((resolve, reject) => {
                        axios.post(`${config.baseUrl}/u/user/account/reset-password/verify-password-uniqueness`, {
                            incomingPassword: value
                        })
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.code === 401) {
                                    resolve(false);
                                } else {
                                    resolve(true);
                                }
                            })
                    })
                }
            ),
        passwordConfirmation: Yup.string()
            .required('You need to confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const updateUserPassword = (values) => {
        axios
            .post(`${config.baseUrl}/u/user/account/reset-password/change-password`, {
                incomingCurrent: values.currentPassword,
                incomingPassword: values.password,
                part: "store"
            })
            .then((results) => {
                setSuccess({
                    data: "Your password have been successfully updated!",
                    type: "success"
                })
                setMessage({
                    data: "",
                    type: "alert-danger"
                })
            })
            .catch((error) => {
                setMessage({
                    data: error.response.data.content,
                    type: "alert-danger"
                })
            })

    }

    return (
        <article className='question'>

            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontWeight: "bold" }} onClick={() => setExpanded(!expanded)} className='question-title'>
                    {header}
                </h4>
                <div tw="w-8/12">{content}</div>
                <button className='btn' onClick={() => setExpanded(!expanded)}>
                    {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
            </header>
            {expanded && <>
                <Formik
                    initialValues={
                        {
                            currentPassword: '',
                            password: '',
                            passwordConfirmation: ''
                        }
                    }
                    validateOnChange={false}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={(values, { resetForm }) => {
                        updateUserPassword(values);
                        resetForm({ values: '' });
                    }}
                >
                    <Form>
                        <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />

                        {success.data.length > 0 ? (
                            <div css={[tw`mt-5`]}>
                                <div css={[tw`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative`]} role="alert">
                                    <span css={[tw`block sm:inline`]} style={{ display: "flex" }} >{success.data}</span>
                                    {/* <span css={[tw`block sm:inline`]}>Something seriously bad happened.</span> */}
                                    <span css={[tw`absolute top-0 bottom-0 right-0 px-4 py-3`]} onClick={() => setMessage({ data: "", type: "" })}>
                                        <svg css={[tw`fill-current h-6 w-6 text-green-500`]} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {(message.data.length > 0 && success.data.length == 0) ? (
                            <div css={[tw`mt-5`]}>
                                <div css={[tw`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`]} role="alert">
                                    <span css={[tw`block sm:inline`]} style={{ display: "flex" }} ><AiOutlineAlert size={20} /> {message.data}</span>
                                    {/* <span css={[tw`block sm:inline`]}>Something seriously bad happened.</span> */}
                                    <span css={[tw`absolute top-0 bottom-0 right-0 px-4 py-3`]} onClick={() => setMessage({ data: "", type: "" })}>
                                        <svg css={[tw`fill-current h-6 w-6 text-red-500`]} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        <MyTextInput
                            label="Current"
                            name="currentPassword"
                            type="password"
                            placeholder="Current password"
                        />

                        <MyTextInput
                            label="New"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />

                        <MyTextInput
                            label="Re-type new"
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Password"
                        />

                        <SubmitButton type="submit">
                            <span className="text">Save</span>
                        </SubmitButton>
                    </Form>
                </Formik>
            </>}
        </article>
    )
}

export default Question