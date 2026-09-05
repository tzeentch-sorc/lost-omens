import React from 'react';
import {
    Group
} from '@vkontakte/vkui';

import AccordionList from '../../common/components/AccordionList.js';
import SMFeats from './SMFeats';

const SMFeatPanel = ({ featlist }) => {

    const hasFeats = featlist && featlist[0] != "";

    const sections = hasFeats
        ? [{ id: "feats", title: 'Черты', content: <SMFeats featlist={featlist} /> }]
        : [];

    return (
        <Group mode='card'>
            <AccordionList sections={sections} />
        </Group>);

};

export default SMFeatPanel;
