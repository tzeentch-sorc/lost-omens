import React from 'react';
import {
    Group
} from '@vkontakte/vkui';

import AccordionList from '../../common/components/AccordionList.js';
import RCGFeats from './RCGFeats.js';

const RCGFeatPanel = ({ featlist }) => {

    const hasFeats = featlist && featlist[0] != "";

    const sections = hasFeats
        ? [{ id: "feats", title: 'Черты', content: <RCGFeats featlist={featlist} /> }]
        : [];

    return (
        <Group mode='card'>
            <AccordionList sections={sections} />
        </Group>);

};

export default RCGFeatPanel;
