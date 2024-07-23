import React from 'react';
import {
	SimpleCell, Tabs, TabsItem, Div
} from '@vkontakte/vkui';
import {
    Icon28CubeBoxOutline,
	Icon28MagicWandOutline, Icon24BookSpreadOutline
} from '@vkontakte/icons'

const LOCharTabPanel = ({ menuOpened, onMenuClick, selected, setSelected }) => {
    return (
        <Tabs>
            <TabsItem
                selected={selected === 'inventory'}
                onClick={() => {
                    if (selected === 'inventory') {
                        onMenuClick(true);
                    }
                    setSelected('inventory');
                }}
                id="tab-inventory"
                aria-controls="tab-content-inventory"
            >
                <SimpleCell before={<Icon28CubeBoxOutline width={24} height={24} />}>
                    <Div className="not4mob">Инвентарь</Div>
                </SimpleCell>
            </TabsItem>
            <TabsItem
                selected={selected === 'spells'}
                onClick={() => {
                    onMenuClick(false);
                    setSelected('spells');
                }}
                id="tab-spells"
                aria-controls="tab-content-spells"
            >
                <SimpleCell before={<Icon28MagicWandOutline width={24} height={24} />}>
                    <Div className="not4mob">Заклинания</Div>
                </SimpleCell>
            </TabsItem>
            <TabsItem
                selected={selected === 'formulae'}
                onClick={() => {
                    onMenuClick(false);
                    setSelected('formulae');
                }}
                id="tab-formulae"
                aria-controls="tab-content-formulae"
            >
                <SimpleCell before={<Icon24BookSpreadOutline width={24} height={24} />}>
                    <Div className="not4mob">Формулы</Div>
                </SimpleCell>
            </TabsItem>
        </Tabs>
    );
};

export default LOCharTabPanel;