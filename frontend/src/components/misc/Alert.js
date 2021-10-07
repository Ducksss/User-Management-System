import React, { useState, forwardRef, useImperativeHandle } from "react";
import tw, { css } from "twin.macro";

export const Alert = forwardRef((props, ref) => {
    const [value, setValue] = useState(false);

    const showAlert = () => {
        setValue(true)
    }

    const hideAlert = () => {
        setValue(false);
    };

    useImperativeHandle(ref, () => {
        return {
            showAlert: showAlert
        };
    });

    return (
        <>
            {value ? (
                <div css={[tw`text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500`]}
                >
                    <span css={[tw`text-xl inline-block mr-5 align-middle`]}>
                        <i className="fas fa-bell" />
                    </span>
                    <span css={[tw`inline-block align-middle mr-8`]}>
                        <b css={[tw`capitalize`]}>red!</b>This is a red alert - check it out!
                    </span>
                    <button css={[tw`absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none`]}
                        onClick={() => setValue(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
})
