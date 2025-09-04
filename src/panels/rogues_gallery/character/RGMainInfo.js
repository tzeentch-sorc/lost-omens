import React from 'react';
import {
    SimpleCell, SimpleGrid, HorizontalCell,
    Header, Group, CardGrid, Card
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
    Icon24PlaneOutline, Icon28CompassOutline, Icon28WrenchOutline
} from '@vkontakte/icons'
import FractionCard from './FractionCard';


const RGMainInfo = ({ helped, hurt, rep, humanity, exp, downtime, freetime, budget, income, expenses, onOpenFractionModal }) => {

    return (
        <Group mode='card' header={<Header mode='secondary'>информация о персонаже</Header>}>
            <CardGrid size='m'>
                <Card key="humanity">
                    <Header mode="primary">Человечность</Header>
                    <SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{humanity}</SimpleCell>
                </Card>
                <Card key="reputation">
                    <Header mode="primary">Репутация</Header>
                    <SimpleCell before={<Icon28CompassOutline width={24} height={24} />}>{rep}</SimpleCell>
                </Card>
                <Card key="experience">
                    <Header mode="primary">Опыт в навыке</Header>
                    <SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{exp}</SimpleCell>
                </Card>
                <FractionCard helped={helped} hurt={hurt} onOpenFractionModal={onOpenFractionModal} />
            </CardGrid>
            <CardGrid size='m'>
                <Card key="downtime">
                    <Header mode="primary">Даунтайм</Header>
                    <SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
                        {downtime}
                    </SimpleCell>
                </Card>
                <Card key="freetime">
                    <Header mode="primary">
                        Свободное время
                    </Header>
                    <SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>
                        {freetime}
                    </SimpleCell>
                </Card>
            </CardGrid>
            <CardGrid size="l" >
                <Card key="gold">
                    <Header mode="primary">Финансы</Header>
                    <SimpleGrid align='stretch' columns={3} margin='none' gap='m'>
                        <HorizontalCell size='l' >
                            <SimpleCell subhead='Бюджет' before={<Icon36CoinsStacks3Outline width={24} height={24} />}>
                                {budget}
                            </SimpleCell>
                        </HorizontalCell>
                        <HorizontalCell size='l ' >
                            <SimpleCell subhead='Доходы' before={<Icon24PlaneOutline width={24} height={24} />}>
                                {income}
                            </SimpleCell>
                        </HorizontalCell>
                        <HorizontalCell size='m' >
                            <SimpleCell subhead='Расходы' before={<Icon28WrenchOutline width={24} height={24} />}>
                                {expenses}
                            </SimpleCell>
                        </HorizontalCell>
                    </SimpleGrid>
                </Card>
            </CardGrid>
        </Group>)
}

export default RGMainInfo;