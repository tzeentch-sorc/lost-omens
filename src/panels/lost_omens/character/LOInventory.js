import React, { useState } from 'react';
import { Cell, Group, List, Separator, Accordion } from '@vkontakte/vkui';
import { Icon12ArrowDown, Icon12ArrowUp } from '@vkontakte/icons';
import AddItem from '../../common/AddItem';

import './LOInventory.css'
import { FormPreEnter, LOAddItemLink, LOAddItemBought, LOAddItemChange, LOAddItemChar, LOAddItemOnParty, LOAddItemPlayer, LOAddItemService, LOAddItemSold } from '../../../util/consts.js'
import { renderTextWithActions } from '../../common/RenderTextWithActions.js';

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

    function createInventoryRow(element, key) {
        if (element.count === 0) return null;
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
        if (key == "item" && element.invest == "FALSE" && element.type == "") {
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

    // Generate rows for "Инвестируемые предметы"
    const investRows = inventory ? sortedData.map((element) => createInventoryRow(element, "invest")).filter(Boolean) : [];
    // Generate rows for "Свитки"
    const scrollRows = inventory ? sortedData.map((element) => createInventoryRow(element, "свиток")).filter(Boolean) : [];
    // Generate rows for "Талисманы"
    const talismanRows = inventory ? sortedData.map((element) => createInventoryRow(element, "талисман")).filter(Boolean) : [];
    // Generate rows for "Эликсиры и зелья"
    const elixirRows = inventory ? sortedData.map((element) => createInventoryRow(element, "эликсир/зелье")).filter(Boolean) : [];
    // Generate rows for "Прочие расходники"
    const consumableRows = inventory ? sortedData.map((element) => createInventoryRow(element, "расходник")).filter(Boolean) : [];
    // Generate rows for "Книги"
    const bookRows = inventory ? sortedData.map((element) => createInventoryRow(element, "книга")).filter(Boolean) : [];
    // Generate rows for "Мелочи"
    const smallItemsRows = inventory ? sortedData.map((element) => createInventoryRow(element, "мелочи")).filter(Boolean) : [];
    // Generate rows for "Предметы"
    const otherItemRows = inventory ? sortedData.map((element) => createInventoryRow(element, "item")).filter(Boolean) : [];
    // Section presence flags
    const hasInvest = investRows.length > 0;
    const hasScrolls = scrollRows.length > 0;
    const hasTalisman = talismanRows.length > 0;
    const hasElixir = elixirRows.length > 0;
    const hasConsumable = consumableRows.length > 0;
    const hasBooks = bookRows.length > 0;
    const hasSmall = smallItemsRows.length > 0;
    const hasOther = otherItemRows.length > 0;
    // Count non-other sections with content
    const nonOtherSections =
        hasInvest + hasScrolls + hasTalisman + hasElixir + hasConsumable + hasBooks + hasSmall;

    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain"
        >
            <AddItem link={createPreEnteredLink(playerName, charName, LOAddItemLink)} />


            {hasInvest && (
                <>
                    <Accordion open>
                        <Accordion.Summary iconPosition="before">Инвестируемые предметы</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {investRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasScrolls && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Свитки</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {scrollRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasTalisman && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Талисманы</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {talismanRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasElixir && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Эликсиры и зелья</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {elixirRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasConsumable && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Прочие расходники</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {consumableRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasBooks && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Книги</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {bookRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {hasSmall && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Мелочи</Accordion.Summary>
                        <Accordion.Content>
                            {/* Headers */}
                            <div
                                className='inventoryCellHeaderGroup'
                            >
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>

                            <List>
                                {smallItemsRows}
                            </List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
            {/* Only show "Предметы" without Accordion if it's the only section */}
            {nonOtherSections === 0 && hasOther && (
                <>
                    <div className='inventoryCellHeaderGroup'>
                        {renderHeaderCell('Предмет', 'name')}
                        {renderHeaderCell('Цена', 'cost')}
                        {renderHeaderCell('Кол-во', 'count')}
                    </div>
                    <List>{otherItemRows}</List>
                </>
            )}

            {/* Otherwise, show "Предметы" as an Accordion */}
            {nonOtherSections > 0 && hasOther && (
                <>
                    <Accordion>
                        <Accordion.Summary iconPosition="before">Предметы</Accordion.Summary>
                        <Accordion.Content>
                            <div className='inventoryCellHeaderGroup'>
                                {renderHeaderCell('Предмет', 'name')}
                                {renderHeaderCell('Цена', 'cost')}
                                {renderHeaderCell('Кол-во', 'count')}
                            </div>
                            <List>{otherItemRows}</List>
                        </Accordion.Content>
                    </Accordion>
                    <Separator />
                </>
            )}
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