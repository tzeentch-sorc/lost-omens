import React from 'react';
import {
    Group, Div, Placeholder
} from '@vkontakte/vkui';
import {
    Icon28MortarOutline
} from '@vkontakte/icons'


const FormulaePlaceholder = () => {
    return (
        <Group
            id="tab-content-formulae"
            aria-controls="tab-formulae"
            role="tabpanel"
            mode="plain"
        >
            <Placeholder icon={<Icon28MortarOutline width={56} height={56} />} title="Здесь будут ваши формулы">
                <Div>
                    Never gonna give you up...
                </Div>
            </Placeholder>

        </Group>
    );
};
export default FormulaePlaceholder;