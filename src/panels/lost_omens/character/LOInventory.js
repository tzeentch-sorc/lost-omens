import React, { useState } from 'react';
import {
    SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';


import AddItem from '../../common/AddItem';

const LOInventory = ({ inventory, charName, playerName }) => {

    function createInventoryRow(element) {
        if (element.count == 0) return;
        var description = "Количество: " + element.count + "; Цена: " + element.cost;
        return (
            <SimpleCell multiline key={element.name}>
                <InfoRow header={description}>{element.name}</InfoRow>
            </SimpleCell>
        );
    }
    function createPreEnteredLink(playerName, charName, link) {
        var newLink = link + "?usp=pp_url" +
            "&entry.138981921=" + playerName + 
            "&entry.1777390359=" + charName;// + 
            //"&entry.236814128=" + "Полученные предметы (на партии)" +
            //"&entry.1500116348=" + "Купленные предметы (вне партии)" +
            //"&entry.1762805081=" + "Проданные предметы (вне партии)" +
            //"&entry.1805043020=" + "Купленные иные услуги" +
            //"&entry.174313451=" + "Изменение количества монет";
        return newLink;
    }
    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain">
            {inventory && inventory.map(e => createInventoryRow(e))}

            <AddItem link={createPreEnteredLink(playerName, charName, "https://docs.google.com/forms/d/e/1FAIpQLScuY24zsG6HEHABa5rGwHhBW0B7l9lK-La99b8MJospK_P9Ew/viewform")}/>

        </Group>
    );
};
export default LOInventory;