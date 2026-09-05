import React from 'react';

import AccordionList from '../../common/components/AccordionList.js';
import LOFeats from './LOFeats';

const LOFeatPanel = ({ featlist }) => {

    // Раньше проверялся только первый список: персонаж без расовых черт, но с классовыми,
    // блока «Черты» не видел.
    const hasFeats = featlist && featlist.some((feats) => feats != "");

    const sections = hasFeats
        ? [{ id: "feats", title: 'Черты', content: <LOFeats featlist={featlist} /> }]
        : [];

    return (
        <>
            <AccordionList sections={sections} />
        </>);

};

export default LOFeatPanel;
