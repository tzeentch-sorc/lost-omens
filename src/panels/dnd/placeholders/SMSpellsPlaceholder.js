import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon28MagicHatOutline
} from '@vkontakte/icons'


const SMSpellsPlaceholder = () => {
    return (
        <Group
            id="tab-content-spells"
            aria-controls="tab-spells"
            role="tabpanel"
            mode="plain"
        >
            <Placeholder icon={<Icon28MagicHatOutline width={56} height={56} />} header="Здесь будут ваши заклинания">
                <Div>
                    Ты думал здесь что-то будет?
                </Div>
            </Placeholder>

        </Group>
    );
};
export default SMSpellsPlaceholder;