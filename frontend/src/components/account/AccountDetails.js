import React, {useState, useEffect} from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
import tw from 'twin.macro';
import {Pencil} from 'react-bootstrap-icons'
import Slider from './Slider';

const MainContent = tw.div`mt-12 flex flex-col items-center w-full`;
const AccountRow = tw.div` grid grid-rows-3 w-11/12`
const GridRow = tw.div`flex`
const DetailRow = tw.div`border rounded-lg border-gray-400  w-8/12 `
const LeftHeader =  tw.div` text-xl font-black w-4/12`

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`
const InfoRowLast = tw.div`flex flex-row py-5 px-3`

const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const Content = tw.div`w-8/12 px-8 whitespace-nowrap`
const Edit = tw.div`w-2/12 whitespace-nowrap text-right cursor-pointer`
const Line = tw.hr`m-8 w-full h-0`

export default function AccountDetails(props) {

    const [data, setData] = useState({
        info: {
            title:'Personal Info',
            data: {
                name: '',
                email: '',
                phone: ''
            }
        },
        username: {
            title: 'Username',
            data: {
                username: 'Chai'
            }
        },
        password: {
            title: 'Password',
            data: {
                password: ''
            }
        },
        timezone: {
            title: 'Timezone',
            data: {
                timezone: ''
            }
        }
    })

    const [showModal, setShowModal] = useState(false)
    const [sendData, setsendData] = useState('')

    const handleEdit = (e) => {
        setShowModal(true)
        setsendData(e)
    }

    return (
        <MainContent>
            <AccountRow>
                <GridRow>
                    <LeftHeader>Your Account</LeftHeader>
                    <DetailRow>
                        <InfoRow>
                            <Header>Personal Info</Header>
                            <Content>cummerata chai pin zheng</Content>
                            <Edit onClick={() => handleEdit(data.info)}><Pencil/></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Username</Header>
                            <Content>cummerata chai pin zheng</Content>
                            <Edit onClick={() => handleEdit(data.username)}><Pencil/></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Password</Header>
                            <Content>cummerata chai pin zheng</Content>
                            <Edit onClick={() => handleEdit(data.password)}><Pencil/></Edit>
                        </InfoRow>
                        <InfoRowLast>
                            <Header>TimeZone</Header>
                            <Content>cummerata chai pin zheng</Content>
                            <Edit onClick={() => handleEdit(data.timezone)}><Pencil/></Edit>
                        </InfoRowLast>
                    </DetailRow>
                </GridRow>
                <Line/>


            </AccountRow>
            <Slider show={showModal} hide={setShowModal} data={sendData} />
        </MainContent>
    )
}
