import React, { useState } from 'react';
import { Cell, Group, List, Separator } from '@vkontakte/vkui';
import { Icon12ArrowDown, Icon12ArrowUp } from '@vkontakte/icons';
import AddItem from '../../common/AddItem';

import './LOInventory.css'

const LOInventory = ({ inventory, totalWealth, charName, playerName }) => {
    // Track both sorted column and direction ('asc' or 'desc')
    const [sortBy, setSortBy] = useState('cost');
    const [sortDirection, setSortDirection] = useState('desc');

    // Sorting function updated for asc/desc toggle and keys
    const sortedData = [...inventory].sort((a, b) => {
        let res = 0;
        if (sortBy === 'name') {
            res = a.name.localeCompare(b.name);
        } else if (sortBy === 'cost') {
            res = a.cost - b.cost;
        } else if (sortBy === 'count') {
            res = a.count - b.count;
        }
        return sortDirection === 'asc' ? res : -res;
    });

    // Handle header clicks
    const onHeaderClick = (key) => {
        if (sortBy === key) {
            // toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortDirection('asc');
        }
    };


    function createInventoryRow(element) {
        if (element.count === 0) return null;
        return (
            <Cell multiline key={element.name}>
                <div
                    className='inventoryCell'
                >
                    <div><b>{element.name}</b></div>
                    <div style={{ textAlign: 'center' }}>{element.cost}</div>
                    <div style={{ textAlign: 'center' }}>{element.count}</div>
                </div>
            </Cell>
        );
    }


    // Helper to render header cell with badge
    const renderHeaderCell = (label, key) => {
        const active = sortBy === key;

        return (
            <div
                onClick={() => onHeaderClick(key)}
                style={{
                    justifyContent: key === 'name' ? 'start' : 'center',
                }}
                className='inventoryCellHeader'
                aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        onHeaderClick(key);
                        e.preventDefault();
                    }
                }}
            >
                <span>{label}</span>
                {active ? (sortDirection === 'asc' ? <Icon12ArrowUp /> : <Icon12ArrowDown />) : <></>}
            </div>
        );
    };
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
    };

    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain"
        >
            <AddItem link={createPreEnteredLink(playerName, charName, "https://docs.google.com/forms/d/e/1FAIpQLScuY24zsG6HEHABa5rGwHhBW0B7l9lK-La99b8MJospK_P9Ew/viewform")}/>
            {/* Headers */}
            <div
                className='inventoryCellHeaderGroup'
            >
                {renderHeaderCell('Тип', 'name')}
                {renderHeaderCell('Цена', 'cost')}
                {renderHeaderCell('Кол-во', 'count')}
            </div>

            <List>
                {inventory && sortedData.map(createInventoryRow)}
            </List>


            <Separator />


            <div
                className='inventoryCellFooter'
            >
                <div>Пожиток на сумму</div>
                <div style={{ textAlign: 'center' }}>{totalWealth} золотых</div>
            </div>
        </Group>
    );
};
export default LOInventory;