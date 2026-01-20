import React from 'react';
import {
	SimpleCell, Tabs, TabsItem, Div
} from '@vkontakte/vkui';
import {
    Icon28ClockOutline, Icon28MoneyTransferOutline
} from '@vkontakte/icons'
import { FavouriteColor } from '../../../consts';

const RGCharTabPanel = ({ menuOpened, onMenuClick, selected, setSelected }) => {
    return (
        <Tabs>
            <TabsItem
                selected={selected === 'transactions'}
                onClick={() => {
                    onMenuClick(false);
                    setSelected('transactions');
                }}
                id="tab-transactions"
                aria-controls="tab-content-transactions"
            >
                <SimpleCell before={<Icon28MoneyTransferOutline width={24} height={24} color={FavouriteColor} style={{filter: `drop-shadow(0 0 4px ${FavouriteColor})`}} />}>
                    <Div className="not4mob">Транзакции</Div>
                </SimpleCell>
            </TabsItem>
             <TabsItem
                selected={selected === 'downtime'}
                onClick={() => {
                    onMenuClick(false);
                    setSelected('downtime');
                }}
                id="tab-downtime"
                aria-controls="tab-content-downtime"
            >
                <SimpleCell before={<Icon28ClockOutline width={24} height={24} color={FavouriteColor} style={{filter: `drop-shadow(0 0 4px ${FavouriteColor})`}} />}>
                    <Div className="not4mob">Даунтайм</Div>
                </SimpleCell>
            </TabsItem>
        </Tabs>
    );
};

export default RGCharTabPanel;