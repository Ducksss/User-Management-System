import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import config from "../../Config.js";
import tw from 'twin.macro';
import axios from "axios";
import Swal from "sweetalert2";
const MainContent = tw.div`mt-12 flex flex-col items-center w-full`;
const AccountRow = tw.div` grid grid-rows-3 w-11/12`;
const GridRow = tw.div`flex`;
const DetailRow = tw.div`border rounded-lg border-gray-400  w-8/12 `;
const LeftHeader = tw.div` text-xl font-black w-4/12`;

const InfoRow = tw.div`flex flex-row border-b border-gray-400 px-3 py-5`;
const InfoRowLast = tw.div`flex flex-row py-5 px-3`;

const Header = tw.h2`text-base w-2/12 whitespace-nowrap font-bold`;
const Content = tw.div`w-8/12 px-8 whitespace-nowrap`;
export default function Billing() {
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
    const [prices, setPrices] = useState([]);
    const [subscriptionData, setSubscriptionData] = useState(null);
    useEffect(() => {
        const fetchPrices = async () => {
            const { prices } = await fetch(`/u/subscription/config`).then(r => r.json());
            setPrices(prices);
        };
        fetchPrices();
    }, []);

    const createSubscription = async (priceId) => {
        await axios.get(`/u/subscription/active-subscriptions`, { withCredentials: true })
            .then(async(response) => {
                if (response.data.content.length != 0) {
                    Toast.fire({
                        icon: "error",
                        title: "Error!",
                        text: "You currently have an active subscription, please cancel it if you want to get a different subscription",
                    });
                } else {
                    await axios.post(`/u/subscription/create`, {
                        priceId: priceId,
                    }, { withCredentials: true }
                    )
                        .then((response) => {
                            let subscriptionId = response.data.content.subscriptionId
                            let clientSecret = response.data.content.clientSecret
                            setSubscriptionData({ subscriptionId, clientSecret });
                        })
                        .catch((error) => {
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (subscriptionData) {
        return <Redirect to={{
            pathname: '/subscribe',
            state: subscriptionData
        }} />;
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
                                        ${price.unit_amount / 100} USD / month
                                    </Content>

                                    <button onClick={() => createSubscription(price.id)}>
                                        Select
                                    </button>
                                </InfoRow>
                            );
                        })}
                    </DetailRow>
                </GridRow>
            </AccountRow>
        </MainContent>
    );
}
