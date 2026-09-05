import React from 'react';
import {
    Group
} from '@vkontakte/vkui';

import AccordionList from '../../common/components/AccordionList.js';
import SMFeats from './SMFeats';

const SMFeatPanel = ({ featlist }) => {

    // Раньше проверялся только первый список: персонаж без общих черт, но с классовыми,
    // блока «Черты» не видел.
    const hasFeats = featlist && featlist.some((feats) => feats != "");

    const sections = hasFeats
        ? [{ id: "feats", title: 'Черты', content: <SMFeats featlist={featlist} /> }]
        : [];

    return (
        <Group mode='card'>
            <AccordionList sections={sections} />
        </Group>);

};

export default SMFeatPanel;
