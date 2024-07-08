import React, { useState } from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';


import LOAddItem from './LOAddItem';

const LOInventory = ({ inventory }) => {

    function createInventoryRow(element) {
        if (element.count == 0) return;
        var description = "Количество: " + element.count + "; Цена: " + element.cost;
        return (
            <SimpleCell multiline key={element.name}>
                <InfoRow header={description}>{element.name}</InfoRow>
            </SimpleCell>
        );
    }
    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain">
            {inventory && inventory.map(e => createInventoryRow(e))}

            <LOAddItem />

        </Group>
    );
};
export default LOInventory;