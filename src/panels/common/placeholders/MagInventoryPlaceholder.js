import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon56DiamondOutline
} from '@vkontakte/icons'


const MagInventoryPlaceholder = () => {
    return (
        <Group
            id="tab-content-maginventory"
            aria-controls="tab-maginventory"
            role="tabpanel"
            mode="plain">
            <Placeholder icon={<Icon56DiamondOutline width={56} height={56} />} title="Здесь будет ваш инвентарь магических предметов">
                <Div>
                    А как ты без волшебных предметов-то?
                </Div>
            </Placeholder>
        </Group>
    );
};
export default MagInventoryPlaceholder;