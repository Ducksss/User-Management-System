import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Link, withRouter } from 'react-router-dom';
import { Pencil } from 'react-bootstrap-icons'
import tw from 'twin.macro';
import config from "../../Config.js";
import axios from "axios";
//component
import Slider from './Slider';
import Swal from "sweetalert2";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Question from "./Question"

const AccountRow = tw.div` grid w-full`
const GridRow = tw.div`flex flex-wrap flex-row`
const DetailRow = tw.div`border rounded-lg border-gray-400 my-3 w-8/12`
const LeftHeader = tw.div` text-xl font-black w-3/12`
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`
const InfoRowLast = tw.div`flex flex-row py-5 px-3`

const Line = tw.hr`m-8 w-full h-0`
const Content = tw.div`w-8/12 px-8 whitespace-nowrap`
const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const Edit = tw.div`w-2/12 whitespace-nowrap text-right cursor-pointer`
const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;


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

    const [userInformation, setUserInformation] = useState([]);

    const [data, setData] = useState({
        info: {
            title: 'Personal Info',
            data: {
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
    const [expanded, setExpanded] = useState(false)

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
            await axios.get(`${config.baseUrl}/u/subscription/invoice`)
                .then((response) => {
                    console.log(response.data.content.invoiceData)
                    setSubscriptions(response.data.content.invoiceData);
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
            <DetailRow
                key={1}
                variants={{
                    current: {
                        opacity: 1,
                        scale: 1,
                        display: "flex",
                    },
                    hidden: {
                        opacity: 0,
                        scale: 0.8,
                        display: "none",
                    }
                }}
                transition={{ duration: 0.4 }}
            >
                <InfoRow>
                    <Header>Subscription ID:</Header>
                    <Content>{subscription.subscription_id}</Content>
                </InfoRow>

                <InfoRow>
                    <Header>Status:</Header>
                    <Content> {subscription.subscription_status}</Content>
                </InfoRow>

                <InfoRow>
                    <Header>Amount Paid</Header>
                    <Content>{subscription.amount_paid}</Content>
                </InfoRow>

                <InfoRow>
                    <Header>Amount Remaining:</Header>
                    <Content> {subscription.amount_remaining}</Content>
                </InfoRow>
                
                <InfoRowLast>
                    <Header>Paid at:</Header>
                    <Content> {subscription.paid_at}</Content>
                </InfoRowLast>
            </DetailRow>
        )
    }

    return (
        <TabContent>
            <AccountRow>
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
        </TabContent>
    )
}