import React from 'react';
import {
    Icon28CubeBoxOutline, Icon28MagicWandOutline
} from '@vkontakte/icons'

import CharTabPanel from '../../common/components/CharTabPanel.js';

const tabs = [
    {
        id: 'inventory',
        title: 'Инвентарь',
        icon: <Icon28CubeBoxOutline width={24} height={24} />,
    },
    {
        id: 'maginventory',
        title: 'Магическое',
        icon: <Icon28CubeBoxOutline width={24} height={24} />,
    },
    {
        id: 'spells',
        title: 'Заклинания',
        icon: <Icon28MagicWandOutline width={24} height={24} />,
    },
];

const RCGCharTabPanel = (props) => <CharTabPanel tabs={tabs} {...props} />;

export default RCGCharTabPanel;
