import React from 'react';
import {
    Group, Div, SimpleCell,
    InfoRow, Accordion
} from '@vkontakte/vkui';

import * as logger from '../../../util/Logger.js';

const SMSpells = ({ spellist }) => {

    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

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

    const [openId, setOpenId] = React.useState();

    function createSpellRow(element) {
        return (
            <SimpleCell multiline key={element}>
                <InfoRow>{element}</InfoRow>
            </SimpleCell>
        );
    }

    function fixRetrain(listRankedSpells){
        var retrained = new Set(listRankedSpells.filter(elem => { return elem[0] == "-"}));
        logger.log("retrained", retrained);
        var result = new Array();
        listRankedSpells.forEach((item) => {
            if (!(retrained.has(item) || retrained.has("-"+item))) {
                result.push(item);
            }
        });
        logger.log("result", result);

        return Array.from(result);
    }

    return (
        <Group
            id="tab-content-spells"
            aria-controls="tab-spells"
            role="tabpanel"
            mode="plain">

            {data.map(

                ({ id, title, detail }) => spellist[detail] && spellist[detail][0] != "" && (
                    <Accordion
                        key={id}
                        expanded={openId === id}
                        onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                    >
                        <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
                        <Accordion.Content>
                            <Div style={infoStyle}>
                                {fixRetrain(spellist[detail].sort((a, b) => a.localeCompare(b))).map(e => createSpellRow(e))}
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                )
            )

            }

        </Group>);
    
};

export default SMSpells;