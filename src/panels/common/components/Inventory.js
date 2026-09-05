import React, { useState } from 'react';
import { Group, List, Div, Separator, Popover, Button, Checkbox } from '@vkontakte/vkui';
import { Icon12ArrowDown, Icon12ArrowUp } from '@vkontakte/icons';
import AddItem from './AddItem';

import '../css/Inventory.css'

// Значение опции «инвестируемое»: она про колонку «Can Invest?», а не про категорию,
// поэтому обрабатывается отдельно от типов предметов.
const INVEST = 'invest';

// addItemLink — ссылка на форму добавления предмета; где формы нет, там нет и кнопки.
// renderName — как рисовать название: в Pathfinder 2e в нём встречаются символы действий.
const Inventory = ({ inventory, totalWealth, addItemLink, renderName = (name) => name }) => {
    // Track both sorted column and direction ('asc' or 'desc')
    const [sortBy, setSortBy] = useState('cost');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [selected, setSelected] = useState([]);

    const items = inventory || [];

    // Категории берём из самих данных: колонок «Категория» и «Can Invest?» нет у части
    // кампаний, и там, где их нет, фильтра тоже нет.
    const types = [...new Set(items.map((item) => item.type).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b));
    const options = [
        ...(items.some((item) => item.invest === 'TRUE')
            ? [{ label: 'инвестируемое', value: INVEST }]
            : []),
        ...types.map((type) => ({ label: type, value: type })),
    ];

    // Пустой выбор — показываем всё; иначе предмет проходит по любому отмеченному признаку.
    const matchesFilter = (item) => selected.length === 0 || selected.some(
        (value) => (value === INVEST ? item.invest === 'TRUE' : item.type === value),
    );

    const toggleOption = (value, checked) => setSelected(
        (current) => (checked ? [...current, value] : current.filter((v) => v !== value)),
    );

    // Sorting function updated for asc/desc toggle and keys
    const sortedData = items.filter(matchesFilter).sort((a, b) => {
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
                <Div
                    className='inventoryCell'
                    key={element.name}
                >
                    <div className='inventoryTypeColumn'><b>{renderName(element.name)}</b></div>
                    <div style={{ textAlign: 'center' }}>{element.cost}</div>
                    <div style={{ textAlign: 'center' }}>{element.count}</div>
                </Div>
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

    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain"
        >
            {addItemLink && <AddItem link={addItemLink} />}
            {options.length > 0 && (
                <Popover
                    trigger="click"
                    placement="bottom-start"
                    shown={filtersOpened}
                    onShownChange={(shown) => setFiltersOpened(shown)}
                    content={
                        <Div>
                            {options.map((option) => (
                                <Checkbox
                                    key={option.value}
                                    checked={selected.includes(option.value)}
                                    onChange={(e) => toggleOption(option.value, e.target.checked)}
                                >
                                    {option.label}
                                </Checkbox>
                            ))}
                        </Div>
                    }
                >
                    <Button mode="secondary">
                        {selected.length === 0 ? 'Все предметы' : `Выбрано: ${selected.length}`}
                    </Button>
                </Popover>
            )}

            {/* Headers */}
            <div
                className='inventoryCellHeaderGroup'
            >
                {renderHeaderCell('Тип', 'name')}
                {renderHeaderCell('Цена', 'cost')}
                {renderHeaderCell('Кол-во', 'count')}
            </div>

            <List>
                {sortedData.map(createInventoryRow)}
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
export default Inventory;
