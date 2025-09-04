import React from 'react';
import {
    Card, SimpleCell, Header,

} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline
} from '@vkontakte/icons'

const FractionCard = ({ helped, hurt, onOpenFractionModal }) => {

    return (
        <>
            <Card onClick={() => onOpenFractionModal()} style={{ cursor: 'pointer' }}>
                <Header mode="primary">Отношения с фракциями</Header>
                <SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>
                    Ну, кому ты еще насолил?
                </SimpleCell>
            </Card>
        </>
    );
};

export default FractionCard;