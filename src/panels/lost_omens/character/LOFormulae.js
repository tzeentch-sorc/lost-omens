import React from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';

import { renderTextWithActions } from '../../common/RenderTextWithActions.js';

const LOFormulae = ({ formulae }) => {
    function createFormulaeRow(element) {
        return (
            <SimpleCell multiline key={element}>
                <InfoRow>{renderTextWithActions(element)}</InfoRow>
            </SimpleCell>
        );
    }
    return (
        <Group
            id="tab-content-formulae"
            aria-controls="tab-formulae"
            role="tabpanel"
            mode="plain"
        >
            {formulae && formulae.map(e => createFormulaeRow(e))}
        </Group>
    );
};
export default LOFormulae;