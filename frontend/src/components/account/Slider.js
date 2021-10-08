import React, {useState, useEffect} from 'react'
import tw from 'twin.macro';

export default function Slider(props) {
    const Container = tw.div`w-screen h-full fixed top-0 left-0`
    const DarkBg = tw.div`w-full h-full z-30 bg-black bg-opacity-75`
    const Slider = tw.div`w-5/12 h-full bg-white z-40 absolute right-0 top-0`
    const Content = tw.div`w-full h-full relative`
    const HeaderRow = tw.div`flex flex-row mx-8 my-6 justify-between items-center`
    const Close = tw.div`text-2xl cursor-pointer`
    const Header = tw.h1`font-bold text-4xl`

    useEffect(() => {
        console.log(props.data);
    }, [props.data])
    return (
        <>
        {props.show ?  
            <Container>
                <DarkBg onClick={() => props.hide(false)}/>
                <Slider>
                    <Content>
                        <HeaderRow>
                            <Header>Edit {props.data.title}</Header>
                            <Close onClick={() => props.hide(false)}>&times;</Close>
                        </HeaderRow>
                    </Content>
                </Slider>
            </Container>
        : ''}
      </>
    )
}
