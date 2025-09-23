import { Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import React, { useState } from 'react';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InfoMain from "./InfoMain.js";
import InfoNotFromITMO from "./InfoNotFromITMO.js";
import InfoFromITMO from "./InfoFromITMO.js";
import InfoMeeting from "./InfoMeeting.js";
import FormCredentials from './FormCredentials.js';
import FormItmo from "./FormItmo.js";
import FormNotItmo from "./FormNotItmo.js";
import FormMeeting from "./FormMeeting.js";

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
        FINISH: 'finish'
    };

    const [activeGroup, setActiveGroup] = useState(GROUPS.START);

    const handleCredFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        if (creds.choice === 'ITMO') {
            setActiveGroup(GROUPS.ITMO);
        } else {
            setActiveGroup(GROUPS.NOT_ITMO);
        }
    };

    const handleItmoFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        setActiveGroup(GROUPS.DATE);
    };

    const handleNotItmoFormSubmit = (creds) => {
        console.log('Submitted data:', creds);
        setActiveGroup(GROUPS.DATE);
    };

    const handleDate = (creds) => {
        console.log('Submitted data:', creds);
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
            case 'SEPARATE_EVENT':
                setActiveGroup(GROUPS.SEPARATE_EVENT);
                break;
            default:
                setActiveGroup(GROUPS.FINISH);
        }
    }

    const handleItmoBack = () => setActiveGroup(GROUPS.START);


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
                                    onBack={handleItmoBack}
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
                                    onBack={handleItmoBack}
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
                                    onSubmit={handleItmoFormSubmit}
                                    onBack={handleItmoBack}
                                />
                            </Group>
                        </>
                    }
                </>
            }
        </Panel >
    )
};

export default Form;