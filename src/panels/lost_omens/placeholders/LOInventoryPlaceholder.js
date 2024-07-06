import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon56DiamondOutline
} from '@vkontakte/icons'


const LOInventoryPlaceholder = () => {
    return (
        <Group
            id="tab-content-inventory"
            aria-controls="tab-inventory"
            role="tabpanel"
            mode="plain">
            <Placeholder icon={<Icon56DiamondOutline width={56} height={56} />} header="Здесь будет ваш инвентарь">
                <Div>
                    Сходи, закупись, не скупись!
                </Div>
            </Placeholder>
        </Group>
    );
};
export default LOInventoryPlaceholder;