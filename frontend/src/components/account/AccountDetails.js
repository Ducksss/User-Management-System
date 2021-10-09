import React, {useState} from 'react'
import {Pencil} from 'react-bootstrap-icons'
import tw from 'twin.macro';

//component
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

// ^ dont cock up my tailwind i swear

export default function AccountDetails(props) {
    const [data, setData] = useState({
        info: {
            title:'Personal Info',
            data: {
                Name: 'cao ni ma',
                Email: 'nima@gmail.com',
                Phone: '112323589234789'
            }
        },
        username: {
            title: 'Username',
            data: {
                Username: 'Chai'
            }
        },
        password: {
            title: 'Password',
            data: {
                Password: ''
            }
        },
        timezone: {
            title: 'Timezone',
            data: {
                Timezone: 'ok'
            }
        }
    })

    const [showModal, setShowModal] = useState(false)
    const [sendData, setsendData] = useState('')
    const [edited, setedited] = useState(false)

    const getUserDetails = () => {
        //personal info has 3 keys, so have to loop to get all of it to display
        if(data) {
            let text = []
            for(let i in data.info.data) {
                text.push(data.info.data[i], <br/>)
            }
            return text
        } else {
            return ''
        }
    }

    const getRandom = () => {
        let num = (Math.floor(Math.random() * 20))
        let text = ''
        for(let i = 0; i <num; i++){
            text += '*'
        }
        return text
    }

    const handleEdit = (e) => {
        setShowModal(true)
        setsendData(e)
    }

    const newdata = e => {
        // set the current new data into the state 
        // can use axios to save data as well, make sure to update the useState
        let newdata = data
        for(let i in newdata) {
            if(i.title == e.title){
                newdata[i] = e
            }
        }
        setData(data)
    }

    return (
        <MainContent>
            <AccountRow>
                {/* account details section */}
                <GridRow>
                    <LeftHeader>Your Account</LeftHeader>
                    <DetailRow>
                        <InfoRow>
                            <Header>Personal Info</Header>
                            <Content>{getUserDetails()}</Content>
                            <Edit onClick={() => handleEdit(data.info)}><Pencil/></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Username</Header>
                            <Content>{data.username.data.Username}</Content>
                            <Edit onClick={() => handleEdit(data.username)}><Pencil/></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Password</Header>
                            <Content>{getRandom()}</Content>
                            <Edit onClick={() => handleEdit(data.password)}><Pencil/></Edit>
                        </InfoRow>

                        {/* inforowlast is used to remove the border bottom */}
                        <InfoRowLast>
                            <Header>TimeZone</Header>
                            <Content>{data.timezone.data.Timezone}</Content>
                            <Edit onClick={() => handleEdit(data.timezone)}><Pencil/></Edit>
                        </InfoRowLast>
                    </DetailRow>
                </GridRow>
                <Line/>
                {/* any other sections here */}
            </AccountRow>
            {/* slider */}
            <Slider show={showModal} hide={setShowModal} data={sendData} getData={e => newdata(e)}/>
        </MainContent>
    )
}