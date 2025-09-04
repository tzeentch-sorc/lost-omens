import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon28WineglassOutline
} from '@vkontakte/icons'


const DrinkPlaceholder = ({ text }) => {
    return (
        <Group
            id="tab-content-drink"
            aria-controls="tab-drink"
            role="tabpanel"
            mode="plain">
            <Placeholder icon={<Icon28WineglassOutline width={56} height={56} />} header="Здесь бы мог быть ваш фирменный рецепт">
                <Div>
                    {text}
                </Div>
            </Placeholder>
        </Group>
    );
};
export default DrinkPlaceholder;