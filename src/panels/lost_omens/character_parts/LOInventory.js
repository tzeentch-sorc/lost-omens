import React from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';


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
        </Group>
    );
};
export default LOInventory;