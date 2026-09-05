import React from 'react';
import {
    SimpleCell, Tabs, TabsItem, Div
} from '@vkontakte/vkui';

// tabs: [{ id, title, icon }]
// id задаёт и значение selected, и идентификаторы разметки: tab-<id> / tab-content-<id>.
const CharTabPanel = ({ tabs, selected, setSelected }) => {
    return (
        <Tabs>
            {tabs.map(({ id, title, icon }) => (
                <TabsItem
                    key={id}
                    selected={selected === id}
                    onClick={() => setSelected(id)}
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
