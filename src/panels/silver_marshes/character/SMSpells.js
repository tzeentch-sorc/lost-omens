import React from 'react';
import {
    Group, SimpleCell, InfoRow
} from '@vkontakte/vkui';

import AccordionList from '../../common/components/AccordionList.js';
import * as logger from '../../../util/Logger.js';

const SMSpells = ({ spellist }) => {

    const data = [
        {
            id: "acc_spell_0",
            title: 'Заговоры',
            detail: 0,
        },
        {
            id: "acc_spell_1",
            title: 'Круг 1',
            detail: 1,
        },
        {
            id: "acc_spell_2",
            title: 'Круг 2',
            detail: 2,
        },
        {
            id: "acc_spell_3",
            title: 'Круг 3',
            detail: 3,
        },
        {
            id: "acc_spell_4",
            title: 'Круг 4',
            detail: 4,
        },
        {
            id: "acc_spell_5",
            title: 'Круг 5',
            detail: 5,
        },
        {
            id: "acc_spell_6",
            title: 'Круг 6',
            detail: 6,
        },
        {
            id: "acc_spell_7",
            title: 'Круг 7',
            detail: 7,
        },
    ];

    function createSpellRow(element) {
        return (
            <SimpleCell multiline key={element}>
                <InfoRow>{element}</InfoRow>
            </SimpleCell>
        );
    }

    // Переученное заклинание мастер помечает тем же названием с дефисом впереди;
    // из списка убираются оба — и пометка, и само заклинание.
    function fixRetrain(listRankedSpells) {
        var retrained = new Set(listRankedSpells.filter(elem => { return elem[0] == "-" }));
        logger.log("retrained", retrained);
        var result = new Array();
        listRankedSpells.forEach((item) => {
            if (!(retrained.has(item) || retrained.has("-" + item))) {
                result.push(item);
            }
        });
        logger.log("result", result);

        return Array.from(result);
    }

    const sections = data
        .filter(({ detail }) => spellist[detail] && spellist[detail][0] != "")
        .map(({ id, title, detail }) => ({
            id,
            title,
            content: fixRetrain(spellist[detail].sort((a, b) => a.localeCompare(b))).map(e => createSpellRow(e))
        }));

    return (
        <Group
            id="tab-content-spells"
            aria-controls="tab-spells"
            role="tabpanel"
            mode="plain">
            <AccordionList sections={sections} />
        </Group>);

};

export default SMSpells;
