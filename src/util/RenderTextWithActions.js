import FreeActionIcon from '../panels/common/custom_icons/Actions/FreeActionIcon.tsx';
import OneActionIcon from '../panels/common/custom_icons/Actions/OneActionIcon.tsx';
import TwoActionIcon from '../panels/common/custom_icons/Actions/TwoActionIcon.tsx';
import ThreeActionIcon from '../panels/common/custom_icons/Actions/ThreeActionIcon.tsx';
import ReactionActionIcon from '../panels/common/custom_icons/Actions/ReactionActionIcon.tsx';
import * as logger from './Logger.js';

import React from 'react';
// Mapping of symbols to icons
const iconMap = {
    '♠': OneActionIcon,
    '♠️': OneActionIcon,
    '♣': ThreeActionIcon,
    '♣️': ThreeActionIcon,
    '♥': TwoActionIcon,
    '♥️': TwoActionIcon,
    '♦': FreeActionIcon,
    '♦️': FreeActionIcon,
    '★': ReactionActionIcon,   
    '★️': ReactionActionIcon
};

export function renderTextWithActions(text) {
    //logger.log('renderTextWithActions', text);
    if (!text) return null; // or return '', depending on your needs

    // Regex to match the full symbol+variation selector sequence
    const regex = /(♠️|♠|♣️|♣|♥️|♥|♦️|♦|★️|★)/g;
    const parts = text.split(regex);
    //logger.log('renderTextWithActions parts', parts);
    return parts.map((part, idx) => {
        const Icon = iconMap[part];
        if (Icon) {
            // Create a new icon instance with a unique key
            return <Icon key={idx} />;
        }
        return part;
    });
};