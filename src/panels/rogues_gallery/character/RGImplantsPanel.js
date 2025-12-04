import React from 'react';
import {
    Group, Div, Accordion, SimpleCell,
    InfoRow
} from '@vkontakte/vkui';

import RGImplants from './RGImplants.js';
import * as logger from '../../../util/Logger.js';

const RGImplantsPanel = ({ featlist }) => {

    function parseImplants(rawText) {
        const lines = rawText
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);

        function parseLine(line) {
            // Разделяем по первому тире "—"
            const parts = line.split("—").map(p => p.trim());
            if (parts.length === 1) {
                // Нет тире — просто элемент без детей
                return { name: parts[0], children: [] };
            } else {
                // Рекурсивно строим вложенность
                let current = { name: parts[0], children: [] };
                let node = current;

                for (let i = 1; i < parts.length; i++) {
                    const part = parts[i];
                    // Если это последняя часть и содержит запятые — делим на массив
                    if (i === parts.length - 1 && part.includes(",")) {
                        node.children = part
                            .split(",")
                            .map(s => s.trim())
                            .filter(Boolean)
                            .map(name => ({ name, children: [] }));
                    } else {
                        const child = { name: part, children: [] };
                        node.children.push(child);
                        node = child;
                    }
                }

                return current;
            }
        }

        return lines.map(parseLine);
    }


    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

    const data = [
        {
            id: "implants",
            title: 'Импланты',
        }
    ];

    const [openId, setOpenId] = React.useState();

    return (
        <Group mode='card'>
            {data.map(

                ({ id, title }) => featlist && featlist[0] != "" && (
                    <Accordion
                        key={id}
                        expanded={openId === id}
                        onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                    >
                        <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
                        <Accordion.Content>
                            <Div style={infoStyle}>
                                <SimpleCell multiline>
                                    <InfoRow>
                                        <RGImplants featlist={parseImplants(featlist)} />
                                    </InfoRow>
                                </SimpleCell>
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                )
            )}
        </Group>
    );

};

export default RGImplantsPanel;