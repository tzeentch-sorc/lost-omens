import React, { useState, useEffect } from 'react';
import {
    Panel, Group, PanelHeaderBack, PanelHeader,
    ScreenSpinner, SplitCol, SplitLayout, Div, ModalRoot, ModalPage, ModalPageHeader,
    PanelHeaderClose, List, SimpleCell, InfoRow, Cell, Separator, Title, Text, Button, Spacing
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
    Icon28HourglassOutline
} from '@vkontakte/icons'


import RGRequestsTabPanel from './RGRequestsTabPanel.js';
import RGTransactionsWall from './RGTransactionsWall.js';
import RGDowntimeWall from './RGDowntimeWall.js';

//import RGDowntimeSettings from '../export_settings/RGDowntimeSettings.js'
//import RGTransactionsSettings from '../export_settings/RGTransactionsSettings.js'

import { RGCharacter } from '../../../consts.js'
import * as logger from '../../../util/Logger.js';
import Marquee from '../../common/components/Marquee.js';

const RGRequests = () => {

    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();

    const [menuOpened, setMenuOpened] = React.useState(false);
    const [selected, setSelected] = React.useState('transactions');

    // const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const charName = params.get('CharName');

    function hasTransactions() {
        //return ( Array.isArray(formulae) && formulae[0] != "");
        return false;
    }

    function hasDowntime() {
        //return (inventory.length > 0);
        return false;
    }

    function renderSelectedTab() {
        switch (selected) {
            case 'transactions':
                return hasTransactions() ? (
                    //<RGInventory inventory={inventory} totalWealth={wealth} charName={charName} playerName={player} />
                    logger.log("transactions")
                ) : (
                    <RGTransactionsWall />
                );
            case 'downtime':
                return hasDowntime() ? (
                    //<RGFormulae formulae={formulae} />
                    logger.log("downtime")
                ) : (
                    <RGDowntimeWall />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        async function fetchData() {
            //попытка получить через spreadsheetApp

            //получение инвентаря
            /*
            let inventoryData = await RGInventorySettings.getFilteredQuery("owner", charName);
            logger.log("inventory data", inventoryData);

            if (inventoryData[0].name) {
                setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
                const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
                setWealth(totalCost);
            }
            */


            setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
            setTimeout(() => setPopout(null), 1000);

            //logger.log("new", inventoryData);
        }
        fetchData().catch(console.error);
	}, []);

    return (
        <Panel nav='requests'>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace(RGCharacter, { keepSearchParams: true })} />}>
                <Marquee text={`Заявки`} speed={5} repeat={2} rightPadding={70} />
            </PanelHeader>
            <SplitLayout>
                <SplitCol>
                    <Group mode='card'>
                        <RGRequestsTabPanel
                            selected={selected}
                            setSelected={setSelected}
                            onMenuClick={(opened) => {
                                setMenuOpened((prevState) => (opened ? !prevState : false));
                            }}
                        />
                        {renderSelectedTab()}
                    </Group>
                </SplitCol>
            </SplitLayout>
        </Panel>
    );
};

export default RGRequests;