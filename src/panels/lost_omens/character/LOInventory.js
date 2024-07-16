import React, { useState } from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';


import AddItem from '../../common/AddItem';

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

            <AddItem link = "https://forms.gle/9pa4v5DeXGuCrU2w8"/>

        </Group>
    );
};
export default LOInventory;