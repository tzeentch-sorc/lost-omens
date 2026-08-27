import React from 'react';

import AccordionList from '../../common/components/AccordionList.js';
import LOFeats from './LOFeats';

const LOFeatPanel = ({ featlist }) => {

    const hasFeats = featlist && featlist[0] != "";

    const sections = hasFeats
        ? [{ id: "feats", title: 'Черты', content: <LOFeats featlist={featlist} /> }]
        : [];

    return (
        <>
            <AccordionList sections={sections} />
        </>);

};

export default LOFeatPanel;
