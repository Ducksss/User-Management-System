import React, { useState, useEffect } from 'react'
import { swalWithBootstrapButtons } from 'shared/swal';
import tw from 'twin.macro';

//styling
import styles from './Slider.module.css'

export default function Slider(props, callToDatabase) {
    const Container = tw.div`w-screen h-full fixed top-0 left-0`
    const DarkBg = tw.div`w-full h-full z-30 bg-black bg-opacity-75`
    const Slider = tw.div`w-5/12 h-full bg-white z-40 absolute right-0 top-0`
    const Content = tw.div`w-full h-full relative`
    const HeaderRow = tw.div`flex flex-row mx-8 my-6 justify-between items-center`
    const Close = tw.div`text-2xl cursor-pointer`
    const Header = tw.h1`font-bold text-4xl`
    const FormRow = tw.div`flex flex-row m-5 w-10/12 justify-between`
    const FormTitle = tw.div`mr-2 w-2/12`
    const InputText = tw.input`border w-10/12 rounded-sm outline-none`
    const BtnRow = tw.div`w-1/2 ml-5`
    const SaveBtn = tw.button`bg-green-600 mr-3 p-2 rounded-lg text-white`
    const CancelBtn = tw.button`bg-red-600 p-2 rounded-lg text-white`

    const [html, sethtml] = useState([])
    // const [edited, setedited] = useState(false)
    // var edited = false
    const [data, setdata] = useState()
    const [formData, setFormData] = useState();

    useEffect(() => {
        setdata(props.data)
    }, [props.data])

    useEffect(() => {
        //empty data will return error if the 'if' statement is removed
        if (data) getData()
    }, [data])

    const getData = () => {
        let temp = []
        for (let e in data.data) {
            temp.push(
                <FormRow key={Math.random()}>
                    <FormTitle>{e}:</FormTitle>
                    <InputText defaultValue={data.data[e]} title={e} onChange={(ev) => handleEdit(ev)} />
                </FormRow>
            )
        }
        return sethtml(temp)
    }

    const onSubmit = () => {
        console.log(formData)
    }

    const handleEdit = e => {
        // edited = true
        let attribute = e.target.getAttribute('title')
        let newdata = data
        newdata.data[attribute] = e.target.value
        props.getData(newdata)
        console.log(data)
    }

    const hideFunc = () => {
        if (props.edit) {
            swalWithBootstrapButtons.fire({
                icon: 'warning',
                title: 'Are You Sure?',
                text: 'Your changes are not saved!',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                showCloseButton: true,
            }).then(result => {
                if (result.isConfirmed) {
                    // edited = false
                    props.hide(false)
                }
                //best to do your axios POST data to the parent 
                //udk wat yr saving 
            })
        } else {
            // edited = false
            props.hide(false)
        }
    }

    return (
        <>
            {props.show ?
                <Container className={styles.container}>
                    <DarkBg onClick={() => hideFunc()} />
                    <Slider className={styles.slider}>
                        <Content>
                            <HeaderRow>
                                <Header>Edit {props.data.title}</Header>
                                <Close onClick={() => hideFunc()}>&times;</Close>
                            </HeaderRow>
                            <div>
                                {html}
                                <BtnRow>
                                    <SaveBtn>Save</SaveBtn>
                                    <CancelBtn onClick={() => hideFunc()}>Cancel</CancelBtn>
                                </BtnRow>
                            </div>
                        </Content>
                    </Slider>
                </Container>
                : ''}
        </>
    )
}