import React, { useState, useEffect } from 'react';

import {
    SimpleCell, InfoRow, Button
} from '@vkontakte/vkui';

import {
    Icon12Add
} from '@vkontakte/icons'

const AddItem = ({link}) => {
    const [rounded, setRounded] = useState(false);
    const [stretched, setStretched] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const buttonBefore = <Icon12Add />;
    const buttonText = 'Добавить предмет';

    return (
        <SimpleCell multiline>
            <InfoRow>
                <Button
                    align='center'
                    before={buttonBefore}
                    appearance='neutral'
                    stretched={stretched}
                    rounded={rounded}
                    mode='secondary'
                    disabled={disabled}
                    size='l'
                    onClick={() => {
                        window.open(link, "_blank")
                    }}
                >
                    {buttonText}
                </Button>
            </InfoRow>
        </SimpleCell>
    );
};


export default AddItem;