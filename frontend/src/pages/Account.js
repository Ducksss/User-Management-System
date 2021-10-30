import React, { useState } from 'react'
import tw from "twin.macro";
import styled from "styled-components";

//pages
import Header from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TabGrid from "components/cards/TabCardGrid.js";

//components
import AccountDetails from 'components/account/AccountDetails';
import Billing from 'components/account/Billing';
import BillingHistory from 'components/account/BillingHistory';

const MainContainer = tw.div`w-full`;
const Headers = tw(SectionHeading)``;
// const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row md:mr-16`;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

export default function Account() {
    const tab = ['Account', 'Billing',"Billing History"]
    const [activeTab, setActiveTab] = useState(tab[0]);

    return (
        <AnimationRevealPage>
            <Header />
            <Container>
                <ContentWithPaddingXl>
                    <HeaderRow>
                        <Headers>Account</Headers>
                        <TabsControl>
                            {tab.map((e, i) => (
                                <TabControl key={i} active={activeTab === e} onClick={() => setActiveTab(e)}>
                                    {e}
                                </TabControl>
                            ))
                            }
                        </TabsControl>
                    </HeaderRow>

                    {/* content here  */}
                    {activeTab == tab[0] ? <AccountDetails /> : activeTab == tab[1] ? <Billing /> : <BillingHistory/>  }
                </ContentWithPaddingXl>
            </Container>
            <Footer />
        </AnimationRevealPage>
    )
}