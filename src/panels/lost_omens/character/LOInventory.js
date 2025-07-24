import React, { useState } from 'react';
import { Cell, Group, List, Separator, Dropdown, Button, Checkbox } from '@vkontakte/vkui';
import { Icon12ArrowDown, Icon12ArrowUp } from '@vkontakte/icons';
import AddItem from '../../common/AddItem';

import './LOInventory.css'
import { FormPreEnter, LOAddItemLink, LOAddItemBought, LOAddItemChange, LOAddItemChar, LOAddItemOnParty, LOAddItemPlayer, LOAddItemService, LOAddItemSold } from '../../../util/consts.js'
import { renderTextWithActions } from '../../common/RenderTextWithActions.js';

const LOInventory = ({ inventory, totalWealth, charName, playerName }) => {
    // Track both sorted column and direction ('asc' or 'desc')
    const [sortBy, setSortBy] = useState('cost');
    const [sortDirection, setSortDirection] = useState('desc');

    const options = [
        { label: 'выбрать все', value: 'all' },
        { label: 'инвестируемое', value: 'invest' },
        { label: 'свитки', value: 'свиток' },
        { label: 'эликсиры и зелья', value: 'эликсир/зелье' },
        { label: 'расходники', value: 'расходник' },
        { label: 'книги', value: 'книга' },
        { label: 'мелочи', value: 'мелочи' },
        { label: 'талисманы', value: 'талисман' }

    ];

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

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

    function createInventoryRow(element, key) {
        if (element.count === 0) return null;
        if (key == "all") {
            return (
                <Cell multiline key={element.name}>
                    <div
                        className='inventoryCell'
                    >
                        <div><b>{renderTextWithActions(element.name)}</b></div>
                        <div style={{ textAlign: 'center' }}>{element.cost}</div>
                        <div style={{ textAlign: 'center' }}>{element.count}</div>
                    </div>
                </Cell>
            );
        }
        if (key == "invest" && element.invest == "TRUE") {
            return (
                <Cell multiline key={element.name}>
                    <div
                        className='inventoryCell'
                    >
                        <div><b>{renderTextWithActions(element.name)}</b></div>
                        <div style={{ textAlign: 'center' }}>{element.cost}</div>
                        <div style={{ textAlign: 'center' }}>{element.count}</div>
                    </div>
                </Cell>
            );
        }
        if (element.type == key) {
            return (
                <Cell multiline key={element.name}>
                    <div
                        className='inventoryCell'
                    >
                        <div><b>{renderTextWithActions(element.name)}</b></div>
                        <div style={{ textAlign: 'center' }}>{element.cost}</div>
                        <div style={{ textAlign: 'center' }}>{element.count}</div>
                    </div>
                </Cell>
            );
        }

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
        var newLink = link + FormPreEnter +
            LOAddItemPlayer + playerName +
            LOAddItemChar + charName;// + 
        //LOAddItemOnParty + "Полученные предметы (на партии)" +
        //LOAddItemBought + "Купленные предметы (вне партии)" +
        //LOAddItemSold + "Проданные предметы (вне партии)" +
        //LOAddItemService + "Купленные иные услуги" +
        //LOAddItemChange + "Изменение количества монет";
        return newLink;
    };

    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain"
        >
            <AddItem link={createPreEnteredLink(playerName, charName, LOAddItemLink)} />

            <Dropdown
                action={
                    <Button mode="secondary" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {selected.length === 0 ? "Выберите опции" : `Выбрано: ${selected.length}`}
                    </Button>
                }
                opened={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
            >
                {options.map(opt => (
                    <Checkbox
                        key={opt.value}
                        checked={selected.includes(opt.value)}
                        onChange={e => {
                            setSelected(s =>
                                e.target.checked
                                    ? [...s, opt.value]
                                    : s.filter(v => v !== opt.value)
                            );
                        }}
                    >
                        {opt.label}
                    </Checkbox>
                ))}
            </Dropdown>

            <div
                className='inventoryCellHeaderGroup'
            >
                {renderHeaderCell('Предмет', 'name')}
                {renderHeaderCell('Цена', 'cost')}
                {renderHeaderCell('Кол-во', 'count')}
            </div>

            <List>
                {inventory ? sortedData.map((element) => createInventoryRow(element, "invest")).filter(Boolean) : []}
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