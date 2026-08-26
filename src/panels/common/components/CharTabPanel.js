import React from 'react';
import {
    SimpleCell, Tabs, TabsItem, Div
} from '@vkontakte/vkui';

// tabs: [{ id, title, icon, opensMenu }]
// id задаёт и значение selected, и идентификаторы разметки: tab-<id> / tab-content-<id>.
// opensMenu — повторный клик по уже выбранной вкладке разворачивает меню; так ведёт себя инвентарь.
const CharTabPanel = ({ tabs, selected, setSelected, onMenuClick }) => {
    return (
        <Tabs>
            {tabs.map(({ id, title, icon, opensMenu = false }) => (
                <TabsItem
                    key={id}
                    selected={selected === id}
                    onClick={() => {
                        if (opensMenu) {
                            if (selected === id) {
                                onMenuClick(true);
                            }
                        } else {
                            onMenuClick(false);
                        }
                        setSelected(id);
                    }}
                    id={`tab-${id}`}
                    aria-controls={`tab-content-${id}`}
                >
                    <SimpleCell before={icon}>
                        <Div className="not4mob">{title}</Div>
                    </SimpleCell>
                </TabsItem>
            ))}
        </Tabs>
    );
};

export default CharTabPanel;
