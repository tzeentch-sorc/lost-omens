import React from 'react';
import {
    Icon28CubeBoxOutline, Icon24BookSpreadOutline, Icon20SkullOutline
} from '@vkontakte/icons'
import { FavouriteColor } from '../../../consts';

import CharTabPanel from '../../common/components/CharTabPanel.js';

const glow = { filter: `drop-shadow(0 0 4px ${FavouriteColor})` };

const tabs = [
    /*
    {
        id: 'inventory',
        title: 'Инвентарь',
        icon: <Icon28CubeBoxOutline width={24} height={24} style={glow} />,
        opensMenu: true,
    },
    {
        id: 'formulae',
        title: 'Формулы',
        icon: <Icon24BookSpreadOutline width={24} height={24} style={glow} />,
    },
    */
    {
        id: 'drink',
        title: 'Рецепт',
        icon: <Icon20SkullOutline width={24} height={24} color={FavouriteColor} style={glow} />,
    },
];

const RGCharTabPanel = (props) => <CharTabPanel tabs={tabs} {...props} />;

export default RGCharTabPanel;
