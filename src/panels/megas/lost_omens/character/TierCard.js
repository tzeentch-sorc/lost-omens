import React from 'react';
import {
    Card, SimpleCell, Header,

} from '@vkontakte/vkui';
import Icon24AgentTier from '../../../common/custom_icons/LOTierIcons/Icon24AgentTier.tsx';
import { tierMap } from './tier-data';

const TierCard = ({ tier, onOpenTierModal }) => {
    const { getIcon, name } = tierMap[tier] || {
        getIcon: (size = 24) => <Icon24AgentTier size={size}/>,
        name: 'Агент',
    };

    return (
        <>
            <Card onClick={() => onOpenTierModal(tier)} style={{ cursor: 'pointer' }}>
                <Header size="m">Ранг Искателя</Header>
                <SimpleCell before={getIcon(24)}>
                    {name}
                </SimpleCell>
            </Card>
        </>
    );
};

export default TierCard;