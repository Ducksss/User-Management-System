import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import tw from 'twin.macro';
import config from "../../Config.js";
import axios from "axios";


const AccountRow = tw.div` grid w-full`
const GridRow = tw.div`flex flex-wrap flex-row`
const DetailRow = tw.div`border rounded-lg border-gray-400 my-3 w-8/12`
const LeftHeader = tw.div` text-xl font-black w-3/12`

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`
const InfoRowLast = tw.div`flex flex-row py-5 px-3`

const Content = tw.div`w-8/12 px-8 whitespace-nowrap`
const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;


export default function AccountDetails(location) {
    const [subscriptions, setSubscriptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${config.baseUrl}/u/subscription/invoice`, { withCredentials: true })
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
                                <LeftHeader>{i == 0 ? 'Billing History' : ''}</LeftHeader>
                                <AccountSubscription key={s.id} subscription={s} />
                            </>
                        )
                    })}

                </GridRow>
                {/* any other sections here */}
            </AccountRow>

        </TabContent>
    )
}