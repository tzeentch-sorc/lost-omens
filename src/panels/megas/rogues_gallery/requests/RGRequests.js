import React, { useState, useEffect } from 'react';
import {
    Panel, Group, PanelHeaderBack, PanelHeader,
    ScreenSpinner, SplitCol, SplitLayout   
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import RGRequestsTabPanel from './RGRequestsTabPanel.js';
import RGTransactionsWall from './RGTransactionsWall.js';
import RGDowntimeWall from './RGDowntimeWall.js';

import RGDowntimeSettings from '../export_settings/RGDowntimeSettings.js'
import RGTransactionsSettings from '../export_settings/RGTransactionsSettings.js'

import { RGCharacter } from '../../../../consts.js'
import * as logger from '../../../../util/Logger.js';
import Marquee from '../../../common/components/Marquee.js';
import DowntimePlaceholder from '../../../common/placeholders/DowntimePlaceholder.js';
import TransactionsPlaceholder from '../../../common/placeholders/TransactionsPlaceholder.js';

const RGRequests = () => {

    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();
    const [popout, setPopout] = useState(<ScreenSpinner />)

    const [menuOpened, setMenuOpened] = React.useState(false);
    const [selected, setSelected] = React.useState('transactions');

    const charName = params.get('CharName');
    
    const [transactions, setTransactions] = useState([]);
    const [downtime, setDowntime] = useState([]);

    function hasTransactions() {
        return (transactions.length > 0);
    }

    function hasDowntime() {
        return (downtime.length > 0);
    }

    function renderSelectedTab() {
        switch (selected) {
            case 'transactions':
                return hasTransactions() ? (
                    <RGTransactionsWall transactions={transactions}/>
                ) : (
                    <TransactionsPlaceholder text="Зато не обанкротился (пока)" />
                );
            case 'downtime':
                return hasDowntime() ? (
                    <RGDowntimeWall downtime={downtime}/>
                ) : (
                    <DowntimePlaceholder text="... это время, проведенное с друзьями" />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        async function fetchData() {
            //попытка получить через spreadsheetApp

            //получение транзакций
            let transactionsData = await RGTransactionsSettings.getFilteredQuery("name", charName);
            logger.log("transactions data", transactionsData);

            setTransactions(transactionsData);

            //получение даунтайма
            let downtimeData = await RGDowntimeSettings.getFilteredQuery("name", charName);
            logger.log("downtime data", downtimeData);

            setDowntime(downtimeData);

            setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
            setTimeout(() => setPopout(null), 1000);
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