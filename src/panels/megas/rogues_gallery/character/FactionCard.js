import React from 'react';
import {
    Card, SimpleCell, Header,

} from '@vkontakte/vkui';
import {
    Icon28GlobeOutline
} from '@vkontakte/icons'
import { FavouriteColor } from '../../../../consts';

const FactionCard = ({ helped, hurt, onOpenFactionModal }) => {

    return (
        <>
            <Card onClick={() => onOpenFactionModal()} style={{ cursor: 'pointer' }}>
                <Header mode="primary">Статус фракций</Header>
                <SimpleCell
                    before={<Icon28GlobeOutline
                        width={24} height={24}
                        style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                    />}>
                    Check me
                </SimpleCell>
            </Card>
        </>
    );
};

export default FactionCard;