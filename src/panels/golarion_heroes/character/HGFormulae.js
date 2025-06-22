import React from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';


const HGFormulae = ({ formulae }) => {
    function createFormulaeRow(element) {
        return (
            <SimpleCell multiline key={element}>
                <InfoRow>{element}</InfoRow>
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
export default HGFormulae;