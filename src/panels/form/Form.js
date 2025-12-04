import { Group, Panel, PanelHeader, PanelHeaderBack, Button, Div } from "@vkontakte/vkui";
import React, { useState } from 'react';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InfoMain from "./InfoMain.js";
import InfoNotFromITMO from "./InfoNotFromITMO.js";
import InfoFromITMO from "./InfoFromITMO.js";
import InfoMeeting from "./InfoMeeting.js";
import InfoIgroteka from "./InfoIgroteka.js";
import InfoFinish from "./InfoFinish.js";
import FormCredentials from './FormCredentials.js';
import FormItmo from "./FormItmo.js";
import FormNotItmo from "./FormNotItmo.js";
import FormMeeting from "./FormMeeting.js";
import FormIgroteka from "./FormIgroteka.js";
import FormFinish from "./FormFinish.js";

const Form = ({ fetchedUser }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();

    const GROUPS = {
        START: 'start',
        ITMO: 'itmo',
        NOT_ITMO: 'not_itmo',
        DATE: 'date',
        IGROTEKA: 'igroteka',
        NRI: 'nri',
        PAINT: 'paint',
        MAFIA: 'mafia',
        KT: 'kt',
        BT: 'bt',
        SEPARATE_EVENT: 'separate_event',
        FINISH: 'finish',
        SENT: 'sent'
    };

    const [activeGroup, setActiveGroup] = useState(GROUPS.START);
    const [groupHistory, setGroupHistory] = useState([]);

    const pushToHistory = (group) => {
        setGroupHistory(prev => [...prev, group]);
    };

    const handleCredFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.START);
        if (creds.choice === 'ITMO') {
            setActiveGroup(GROUPS.ITMO);
        } else {
            setActiveGroup(GROUPS.NOT_ITMO);
        }
    };

    const handleItmoFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.ITMO);
        setActiveGroup(GROUPS.DATE);
    };

    const handleNotItmoFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.NOT_ITMO);
        setActiveGroup(GROUPS.DATE);
    };

    const handleFinishFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.FINISH);
        setActiveGroup(GROUPS.SENT);
    };

    const handleDateFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.DATE);
        switch (creds.mero) {
            case 'IGROTEKA':
                setActiveGroup(GROUPS.IGROTEKA);
                break;
            case 'NRI':
                setActiveGroup(GROUPS.NRI);
                break;
            case 'PAINT':
                setActiveGroup(GROUPS.PAINT);
                break;
            case 'MAFIA':
                setActiveGroup(GROUPS.MAFIA);
                break;
            case 'KT':
                setActiveGroup(GROUPS.KT);
                break;
            case 'BT':
                setActiveGroup(GROUPS.BT);
                break;
            case 'OTHER':
                setActiveGroup(GROUPS.SEPARATE_EVENT);
                break;
            default:
                setActiveGroup(GROUPS.FINISH);
        }
    }

    const handleIgrotekaFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        pushToHistory(GROUPS.IGROTEKA);
        setActiveGroup(GROUPS.FINISH);
    };

    const handleBack = () => {
        setGroupHistory(prev => {
            const newHistory = [...prev];
            const previousGroup = newHistory.pop();
            setActiveGroup(previousGroup || GROUPS.START);
            return newHistory;
        });
    };


    return (
        <Panel nav='enter'>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>GEEKMO Посещение</PanelHeader>
            {
                fetchedUser &&
                <>
                    {activeGroup === GROUPS.START &&
                        <>
                            <Group mode='card'>
                                <InfoMain />
                            </Group>
                            <Group mode='card'>
                                <FormCredentials
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleCredFormSubmit}
                                />

                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.NOT_ITMO &&
                        <>
                            <Group mode='card'>
                                <InfoNotFromITMO />
                            </Group>
                            <Group mode='card'>
                                <FormNotItmo
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleNotItmoFormSubmit}
                                    onBack={handleBack}
                                />
                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.ITMO &&
                        <>
                            <Group mode='card'>
                                <InfoFromITMO />
                            </Group>
                            <Group mode='card'>
                                <FormItmo
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleItmoFormSubmit}
                                    onBack={handleBack}
                                />
                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.DATE &&
                        <>
                            <Group mode='card'>
                                <InfoMeeting />
                            </Group>
                            <Group mode='card'>
                                <FormMeeting
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleDateFormSubmit}
                                    onBack={handleBack}
                                />
                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.IGROTEKA &&
                        <>
                            <Group mode='card'>
                                <InfoIgroteka />
                            </Group>
                            <Group mode='card'>
                                <FormIgroteka
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleIgrotekaFormSubmit}
                                    onBack={handleBack}
                                />
                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.FINISH &&
                        <>
                            <Group mode='card'>
                                <InfoFinish />
                            </Group>
                            <Group mode='card'>
                                <FormFinish
                                    fetchedUser={fetchedUser}
                                    onSubmit={handleFinishFormSubmit}
                                    onBack={handleBack}
                                />
                            </Group>
                        </>
                    }
                    {activeGroup === GROUPS.SENT &&
                        <>
                            <Group mode='card'>
                                {/*<InfoSent />*/}
                            </Group>
                            <Group mode='card'>
                                <Div style={{ paddingLeft: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    <Button stretched appearance="neutral" size="l" onClick={() => { setActiveGroup(GROUPS.START); }}>Заполнить еще раз</Button>
                                    <Button stretched appearance="negative" size="l" onClick={() => { routeNavigator.replace("/") }}>Выход</Button>
                                </Div>
                            </Group>
                        </>
                    }
                </>
            }
        </Panel >
    )
};

export default Form;