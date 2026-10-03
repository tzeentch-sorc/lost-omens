import React from 'react';
import {
    Group, SimpleCell
} from '@vkontakte/vkui';

import AccordionList from '../../common/components/AccordionList.js';
import * as logger from '../../../util/Logger.js';
import { BadColor } from '../../../consts.js';

const CIRCLES = 9;
const UNDEFINED_CIRCLE = CIRCLES + 1;

// Заговоры, круги 1–9 и в конце — заклинания, круг которых по строке не понять.
const SECTIONS = [
    { id: "acc_spell_0", title: 'Заговоры' },
    ...Array.from({ length: CIRCLES }, (_, i) => ({ id: `acc_spell_${i + 1}`, title: `Круг ${i + 1}` })),
    { id: "acc_spell_undefined", title: <span style={{ color: BadColor }}>Круг не определен, обратитесь к мастеру</span> },
];

const nameStyle = { color: 'var(--vkui--color_text_primary)' };
const sourceStyle = { color: 'var(--vkui--color_text_secondary)' };

// Мастер пишет заклинание как «Название (круг)» или «Название (источник) (круг)»,
// пары скобок — в любом порядке. Круг — скобки с одной цифрой, всё остальное в скобках — источник.
// Нет скобок с цифрой — круг не определён.
function parseSpell(line) {
    const groups = [...line.matchAll(/\(([^()]*)\)/g)].map(m => m[1].trim());
    const name = line.replace(/\([^()]*\)/g, '').replace(/\s+/g, ' ').trim();
    const circleIx = groups.findIndex(g => /^\d$/.test(g));
    return {
        name: name || line,
        source: groups.filter((_, i) => i !== circleIx).join(', '),
        circle: circleIx >= 0 ? Number(groups[circleIx]) : UNDEFINED_CIRCLE,
    };
}

const RCGSpells = ({ spellist }) => {

    function createSpellRow(spell, i) {
        return (
            <SimpleCell multiline key={i}>
                <b style={nameStyle}>{spell.name}</b>
                {spell.source && <> <i style={sourceStyle}>{spell.source}</i></>}
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

    const clean = (list) => fixRetrain((list || []).map(s => s.trim()).filter(Boolean));
    const [cantrips, spells] = spellist;

    const byCircle = SECTIONS.map(() => []);
    // Заговоры лежат в своей колонке, круг у них всегда нулевой — из скобок берётся только источник.
    clean(cantrips).forEach(line => byCircle[0].push({ ...parseSpell(line), circle: 0 }));
    clean(spells).forEach(line => {
        const spell = parseSpell(line);
        byCircle[spell.circle].push(spell);
    });

    const sections = SECTIONS
        .map((section, circle) => ({
            ...section,
            content: byCircle[circle]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(createSpellRow),
        }))
        .filter(({ content }) => content.length > 0);

    return (
        <Group
            id="tab-content-spells"
            aria-controls="tab-spells"
            role="tabpanel"
            mode="plain">
            <AccordionList sections={sections} />
        </Group>);

};

export default RCGSpells;
