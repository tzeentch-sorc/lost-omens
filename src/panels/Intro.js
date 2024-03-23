import { Div, FixedLayout, Group, Panel, PanelHeader, Button, Avatar, Spacing, Separator } from "@vkontakte/vkui";
import React from "react";
import { Fragment } from "react";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import './Intro.css'

const CAMPAIGNS = {
    LOST_OMENS: "Lost Omens (PF 2e)",
    SF: "Starfinder"
}

const Intro = ({ fetchedUser}) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();

    return (
        <Panel centered={true} nav='intro'>
            <PanelHeader>
                Добро пожаловать
            </PanelHeader>
            {fetchedUser &&
                <Fragment>
                    <Group>
                        <Div className="Intro">
                            {fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} />}
                            <h2>Привет, {fetchedUser.first_name}!</h2>
                            <h3>Это приложение GEEKMO.</h3>
                        </Div>
                        <Spacing>
                            <Separator />
                        </Spacing>
                        <Div style={{ textAlign: "justify" }}>
                            <p>Здесь можно будет посмотреть состояние персонажей во всех наших ролевых мегакампаниях.</p>
                        </Div>
                    </Group>
                    <FixedLayout vertical="bottom">
                        <Div>
                            <Button stretched appearance="positive" size="l" onClick={() => {
                                params.set('CampaignName', CAMPAIGNS.LOST_OMENS)
                                setParams(params)
                                routeNavigator.push('/campaign', {keepSearchParams: true})
                            }}>
                                Кампания {CAMPAIGNS.LOST_OMENS}
                            </Button>
                        </Div>
                        <Div>
                            <Button stretched appearance="positive" size="l" onClick={() => {
                                params.set('CampaignName', CAMPAIGNS.SF)
                                setParams(params)
                                routeNavigator.push('/campaign', {keepSearchParams: true})
                            }}>
                                Кампания {CAMPAIGNS.SF}
                            </Button>
                        </Div>
                    </FixedLayout>
                </Fragment>
            }
        </Panel>
    )
};


export default Intro;