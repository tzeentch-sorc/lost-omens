import React from 'react';
import {
    Icon28CubeBoxOutline,
    Icon28MagicWandOutline, Icon24BookSpreadOutline
} from '@vkontakte/icons'

import CharTabPanel from '../../common/components/CharTabPanel.js';

const tabs = [
    {
        id: 'inventory',
        title: 'Инвентарь',
        icon: <Icon28CubeBoxOutline width={24} height={24} />,
        opensMenu: true,
    },
    {
        id: 'spells',
        title: 'Заклинания',
        icon: <Icon28MagicWandOutline width={24} height={24} />,
    },
    {
        id: 'formulae',
        title: 'Формулы',
        icon: <Icon24BookSpreadOutline width={24} height={24} />,
    },
];

const LOCharTabPanel = (props) => <CharTabPanel tabs={tabs} {...props} />;

export default LOCharTabPanel;
