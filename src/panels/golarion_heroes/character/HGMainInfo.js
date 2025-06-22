import React from 'react';
import {
    SimpleCell,
    Header, Group, CardGrid, Card
} from '@vkontakte/vkui';
import {
    Icon28WidgetsOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
    Icon28HourglassErrorBadgeOutline, Icon28CompassOutline
} from '@vkontakte/icons'


const HGMainInfo = ({ gold, experience, level, mult }) => {

    return (
        <Group mode='card' header={<Header mode='secondary'>Ресурсы и опыт персонажа</Header>}>
            <CardGrid size='m'>
                <Card key="gold">
                    <Header mode="primary">Золото</Header>
                    <SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{gold}</SimpleCell>
                </Card>
                <Card key="experience">
                    <Header mode="primary">Уровень</Header>
                    <SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
                         {experience && level && (level + " (" + experience + " XP)")} {!experience && ("unknown")}
                    </SimpleCell>
                </Card>
            </CardGrid>
            <CardGrid size="l" >
                <Card key="mult">
                    <Header mode="primary">Класс</Header>
                    <SimpleCell before={<Icon28WidgetsOutline width={24} height={24} />}>
                        {!mult && "undef"}
                        {mult && mult}
                    </SimpleCell>
                </Card>
            </CardGrid>
        </Group>)
}

export default HGMainInfo;