import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon28HistoryForwardSubstractOutline
} from '@vkontakte/icons'


const DowntimePlaceholder = ({ text }) => {
    return (
        <Group
            id="tab-content-downtime"
            aria-controls="tab-downtime"
            role="tabpanel"
            mode="plain">
            <Placeholder icon={<Icon28HistoryForwardSubstractOutline width={56} height={56} />} title="Хорошо потраченное время...">
                <Div>
                    {text}
                </Div>
            </Placeholder>
        </Group>
    );
};
export default DowntimePlaceholder;