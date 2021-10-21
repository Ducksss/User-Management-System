import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Pencil } from 'react-bootstrap-icons'
import tw from 'twin.macro';
import config from "../../Config.js";
import axios from "axios";
//component
import Slider from './Slider';
import Swal from "sweetalert2";
const MainContent = tw.div`mt-12 flex flex-col items-center w-full`;
const AccountRow = tw.div` grid w-11/12`
const GridRow = tw.div`flex flex-wrap flex-row`
const DetailRow = tw.div`border rounded-lg border-gray-400  w-8/12 my-3`
const LeftHeader = tw.div` text-xl font-black w-4/12`

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`
const InfoRowLast = tw.div`flex flex-row py-5 px-3`

const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const Content = tw.div`w-8/12 px-8 whitespace-nowrap`
const Edit = tw.div`w-2/12 whitespace-nowrap text-right cursor-pointer`
const Line = tw.hr`m-8 w-full h-0`

// ^ dont cock up my tailwind i swear

export default function AccountDetails(location) {
    let Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const [data, setData] = useState({
        info: {
            title: 'Personal Info',
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
        if (data) {
            let text = []
            for (let i in data.info.data) {
                text.push(data.info.data[i], <br />)
            }
            return text
        } else {
            return ''
        }
    }

    const getRandom = () => {
        let num = (Math.floor(Math.random() * 20))
        let text = ''
        for (let i = 0; i < num; i++) {
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
        for (let i in newdata) {
            if (i.title == e.title) {
                newdata[i] = e
            }
        }
        setData(data)
    }
    const [subscriptions, setSubscriptions] = useState([]);
    const handleClick = async (e, subscriptionID) => {
        e.preventDefault();
        await axios.post(`${config.baseUrl}/u/subscription/cancel`, {
            subscriptionId: subscriptionID
        })
            .then((response) => {
                Toast.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your subscription has successfully been cancelled",
                });
                window.location.reload();
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Unable to cancel",
                });
            });
    }

    //     
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${config.baseUrl}/u/subscription/subscriptions`)
                .then((response) => {
                    setSubscriptions(Object.values(response.data.subscriptions)[1]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    if (!subscriptions) return '';

    const AccountSubscription = ({ subscription }) => {
        return (              
            <DetailRow>
                <InfoRow>
                    <Header>Subscription ID:</Header>
                    <Content>{subscription.id}</Content>
                </InfoRow>

                <InfoRow>
                    <Header>Status:</Header>
                    <Content> {subscription.status}</Content>
                </InfoRow>

                <InfoRow>
                    <Header>Card last4:</Header>
                    <Content>{subscription.default_payment_method?.card?.last4}</Content>
                </InfoRow>

                <InfoRowLast>
                    <Header>Current period end:</Header>
                    <Content> {(new Date(subscription.current_period_end * 1000).toString())}</Content>
                </InfoRowLast>

                {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
                <button onClick={(e) => { handleClick(e, subscription.id) }}>Cancel Subscription</button>
            </DetailRow>
        )
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
                            <Edit onClick={() => handleEdit(data.info)}><Pencil /></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Username</Header>
                            <Content>{data.username.data.Username}</Content>
                            <Edit onClick={() => handleEdit(data.username)}><Pencil /></Edit>
                        </InfoRow>
                        <InfoRow>
                            <Header>Password</Header>
                            <Content>{getRandom()}</Content>
                            <Edit onClick={() => handleEdit(data.password)}><Pencil /></Edit>
                        </InfoRow>

                        {/* inforowlast is used to remove the border bottom */}
                        <InfoRowLast>
                            <Header>TimeZone</Header>
                            <Content>{data.timezone.data.Timezone}</Content>
                            <Edit onClick={() => handleEdit(data.timezone)}><Pencil /></Edit>
                        </InfoRowLast>
                    </DetailRow>
                </GridRow>
                <Line />
                <GridRow >
                    {subscriptions.map((s, i) => {
                        return (
                        <>
                            <LeftHeader>{i == 0 ? 'Subscriptions' : ''}</LeftHeader>
                            <AccountSubscription key={s.id} subscription={s} />
                        </>
                        )
                    })}

                </GridRow>
                {/* any other sections here */}
                </AccountRow>
                
            {/* slider */}
            <Slider show={showModal} hide={setShowModal} data={sendData} getData={e => newdata(e)} />
        </MainContent>
    )
}