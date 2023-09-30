import { Div, FixedLayout, Group, Panel, PanelHeader, Button, Avatar, Gradient, Spacing, Separator } from "@vkontakte/vkui";
import React from "react";
import { Fragment } from "react";

import './Intro.css'


const Intro = ({ id, snackbarErr, fetchedUser, seenIntro, go }) => {
    return (
        <Panel id={id} centered={true}>
            <PanelHeader>
                Добро пожаловать
            </PanelHeader>
            {(!seenIntro && fetchedUser) &&
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
                        <Div style={{textAlign: "justify"}}>
                            <p>Здесь можно будет посмотреть состояние персонажей во всех наших ролевых мегакампаниях.</p>
                        </Div>
                    </Group>
                    <FixedLayout vertical="bottom">
                        <Div>
                            <Button stretched appearance="positive" size="l" onClick={go}>
                                Кампания Lost Omens (PF 2e)
                            </Button>
                        </Div>
                    </FixedLayout>
                </Fragment>
            }
            {snackbarErr}
        </Panel>
    )
};


export default Intro;