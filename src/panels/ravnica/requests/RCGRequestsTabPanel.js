import React from 'react';
import {
    Icon28ClockOutline, Icon28MoneyTransferOutline
} from '@vkontakte/icons'
import { FavouriteColor } from '../../../consts.js';

import CharTabPanel from '../../common/components/CharTabPanel.js';

const glow = { filter: `drop-shadow(0 0 4px ${FavouriteColor})` };

const tabs = [
    {
        id: 'transactions',
        title: 'Транзакции',
        icon: <Icon28MoneyTransferOutline width={24} height={24} color={FavouriteColor} style={glow} />,
    }
];

const RCGRequestsTabPanel = (props) => <CharTabPanel tabs={tabs} {...props} />;

export default RCGRequestsTabPanel;
