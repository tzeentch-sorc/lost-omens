import { Div, Group, Panel, PanelHeader, Header, Avatar, Spacing, Separator, CardGrid } from "@vkontakte/vkui";
import React from "react";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import './Intro.css'
import CampaignCard from "./common/CampaignCard";

import {LOCampaign, SMCampaign, SFCampaign} from '../util/consts.js';

const CAMPAIGNS = {
    LOST_OMENS: "Утраченные Пророчества (PF 2e)",
    SF: "Уроборос (Starfinder)",
    SM: "Серебряный Предел (D&D5e)"
}

const Intro = ({ fetchedUser }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();

    return (
        <Panel nav='intro'>
            <PanelHeader>
                Добро пожаловать
            </PanelHeader>
            {fetchedUser &&
                <>
                    <Group mode="card">
                        <Div className="Intro">
                            <Header>Привет, {fetchedUser.first_name}!</Header>
                            <p>Это приложение GEEKMO. <br/>Здесь можно будет посмотреть состояние персонажей во всех наших ролевых мегакампаниях.</p>
                        </Div>
                    </Group>
                    <Group mode="card">
                        <Header size="large" mode="primary">
                            Мегакампании в Geekmo
                        </Header>

                        <Separator className="introSeparator"/>

                        <CardGrid size="l" padding="true">
                            <CampaignCard
                                title={CAMPAIGNS.LOST_OMENS}
                                imageSrc="/images/lo_banner.jpg"
                                onClick={() => {
                                    params.set('CampaignName', CAMPAIGNS.LOST_OMENS)
                                    setParams(params)
                                    routeNavigator.push(LOCampaign, { keepSearchParams: true })
                                }} />
                            
                            <CampaignCard
                                title={CAMPAIGNS.SF}
                                imageSrc="/images/sf_bannerjpg.jpg"
                                onClick={() => {
                                    params.set('CampaignName', CAMPAIGNS.SF)
                                    setParams(params)
                                    routeNavigator.push(SFCampaign, { keepSearchParams: true })
                                }} />
                            
                            <CampaignCard
                                title={CAMPAIGNS.SM}
                                imageSrc="/images/sm_bannerjpg.jpg"
                                onClick={() => {
                                    params.set('CampaignName', CAMPAIGNS.SM)
                                    setParams(params)
                                    routeNavigator.push(SMCampaign, { keepSearchParams: true })
                                }} />
                        </CardGrid>
                    </Group>
                </>
            }
        </Panel >
    )
};

export default Intro;