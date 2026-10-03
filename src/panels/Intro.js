import { Div, Group, Panel, PanelHeader, Header, CardGrid, Separator } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import './Intro.css'
import CampaignCard from "./common/components/CampaignCard";

import { CAMPAIGNS } from '../consts.js';
import { getMemberships } from '../util/Members.js';

const HIDDEN_MEGAS = CAMPAIGNS.filter(campaign => campaign.hidden).map(campaign => campaign.key);

const Intro = ({ fetchedUser }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();
    // Пока лист участников грузится, скрытые карточки не показываются никому.
    const [memberships, setMemberships] = useState(new Set());

    useEffect(() => {
        if (!fetchedUser) return;
        getMemberships(HIDDEN_MEGAS, fetchedUser).then(setMemberships);
    }, [fetchedUser]);

    const openCampaign = (campaign) => {
        params.set('CampaignName', campaign.title)
        setParams(params)
        routeNavigator.push(campaign.route, { keepSearchParams: true })
    };

    return (
        <Panel nav='intro'>
            <PanelHeader className="panelHeader" transparent={false}>
                Добро пожаловать
            </PanelHeader>
            {fetchedUser &&
                <>
                    <Group mode="card">
                        <Div className="intro">
                            <Header>Привет, {fetchedUser.first_name}!</Header>
                            <p>Это приложение GEEKMO. <br/>Здесь можно будет посмотреть состояние персонажей во всех наших ролевых мегакампаниях.</p>
                        </Div>
                    </Group>
                    <Group mode="card">
                        <Header size="xl">
                            Мегакампании в GEEKMO
                        </Header>

                        <Separator className="intro-separator"/>

                        <CardGrid size="l" padding="true">
                            {CAMPAIGNS
                                .filter(campaign => !campaign.hidden || memberships.has(campaign.key))
                                .map(campaign =>
                                    <CampaignCard
                                        key={campaign.key}
                                        title={campaign.title}
                                        imageSrc={campaign.image}
                                        outdated={campaign.hidden}
                                        onClick={() => openCampaign(campaign)} />
                                )}
                        </CardGrid>
                    </Group>
                </>
            }
        </Panel >
    )
};

export default Intro;
