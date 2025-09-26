import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon56RudeMessageOutline
} from '@vkontakte/icons'


const TransactionsPlaceholder = ({ text }) => {
    return (
        <Group
            id="tab-content-transactions"
            aria-controls="tab-transactions"
            role="tabpanel"
            mode="plain">
            <Placeholder icon={<Icon56RudeMessageOutline width={56} height={56} />} title="Заявок не обнаружено">
                <Div>
                    {text}
                </Div>
            </Placeholder>
        </Group>
    );
};
export default TransactionsPlaceholder;