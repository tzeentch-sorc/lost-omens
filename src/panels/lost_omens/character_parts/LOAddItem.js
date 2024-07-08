import React, { useState, useEffect } from 'react';

import {
    SimpleCell, InfoRow, Button
} from '@vkontakte/vkui';

import {
    Icon12Add
} from '@vkontakte/icons'

const LOAddItem = () => {
    const [rounded, setRounded] = useState(false);
    const [stretched, setStretched] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const buttonBefore = <Icon12Add />;
    const buttonLink = 'https://forms.gle/9pa4v5DeXGuCrU2w8';
    const buttonText = 'Добавить предмет';

    return (
        <SimpleCell multiline>
            <InfoRow>
                <Button
                    align='center'
                    href={buttonLink}
                    before={buttonBefore}
                    appearance='neutral'
                    stretched={stretched}
                    rounded={rounded}
                    mode='secondary'
                    disabled={disabled}
                    size='l'
                    onClick={() => { }}
                >
                    {buttonText}
                </Button>
            </InfoRow>
        </SimpleCell>
    );
};


export default LOAddItem;