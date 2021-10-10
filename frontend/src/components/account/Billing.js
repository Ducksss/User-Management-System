import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import config from "../../Config.js";
import tw from 'twin.macro';


const MainContent = tw.div`mt-12 flex flex-col items-center w-full`;
const AccountRow = tw.div` grid grid-rows-3 w-11/12`
const GridRow = tw.div`flex`
const DetailRow = tw.div`border rounded-lg border-gray-400  w-8/12 `
const LeftHeader = tw.div` text-xl font-black w-4/12`

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`
const InfoRowLast = tw.div`flex flex-row py-5 px-3`

const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`
const Content = tw.div`w-8/12 px-8 whitespace-nowrap`
export default function Billing() {
    const [prices, setPrices] = useState([]);
    const [subscriptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            const { prices } = await fetch(`${config.baseUrl}/u/user/config`).then(r => r.json());
            setPrices(prices);
            console.log(prices)
        };
        fetchPrices();
    }, [])

    const createSubscription = async (priceId) => {
        console.log("it is entering the frontend")
        const { subscriptionId, clientSecret } = await fetch(`${config.baseUrl}/u/user/createSubscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId
            }),
        }).then(r => r.json());

        setSubscriptionData({ subscriptionId, clientSecret });
    }

    if (subscriptionData) {
        console.log(subscriptionData)
        return <Redirect to={{
            pathname: '/subscribe',
            state: subscriptionData
        }} />
    }
    return (
        <MainContent>
            <AccountRow>
                <GridRow>
                    <LeftHeader>Select a plan</LeftHeader>

                    <DetailRow className="price-list">
                        {prices.map((price) => {
                            return (
                                <InfoRow key={price.id}>
                                    <Header>{price.product.name}</Header>

                                    <Content>
                                        ${price.unit_amount / 100} / month
                                    </Content>

                                    <button onClick={() => createSubscription(price.id)}>
                                        Select
                                    </button>
                                </InfoRow>
                            )
                        })}
                    </DetailRow>
                </GridRow>
            </AccountRow>
        </MainContent>
    )
}
