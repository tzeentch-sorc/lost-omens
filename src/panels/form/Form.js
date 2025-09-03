import { Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import React, { useState } from 'react';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InfoMain from "./InfoMain.js";
import InfoNotFromITMO from "./InfoNotFromITMO.js";
import InfoFromITMO from "./InfoFromITMO.js";
import FormCredentials from './FormCredentials.js';
import FormItmo from "./FormItmo.js";

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
    };

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
                </>
            }
        </Panel >
    )
};

export default Form;