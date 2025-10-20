import React from 'react';
import {
    Card, SimpleCell, Header, Caption

} from '@vkontakte/vkui';
import {
    Icon28GlobeOutline
} from '@vkontakte/icons'
import { FavouriteColor } from '../../../../consts';

const FactionCard = ({ helped, hurt, onOpenFactionModal }) => {

    return (
        <>
            <Card onClick={() => onOpenFactionModal()} style={{ cursor: 'pointer' }}>
                <Header size="m">Статус фракций</Header>
                <SimpleCell
                    before={<Icon28GlobeOutline
                        width={24} height={24}
                        style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                    />}>
                    <Caption
                        level="1"
                        weight="regular"
                        style={{ color: 'var(--vkui--color_text_secondary)', fontSize: '14px', lineHeight: '20px' }}
                    >
                        <i>Узнать больше</i>
                    </Caption>
                </SimpleCell>
            </Card>
        </>
    );
};

export default FactionCard;