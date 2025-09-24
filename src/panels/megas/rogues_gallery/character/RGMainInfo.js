import React from 'react';
import {
    SimpleCell, SimpleGrid, HorizontalCell,
    Header, Group, CardGrid, Card, Div
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon28MasksOutline, Icon28ClockOutline, Icon56Stars3Outline,
    Icon20ArrowUpOutline, Icon56StatisticsOutline, Icon20ArrowDownOutline, Icon24DollarOutline
} from '@vkontakte/icons'
import FactionCard from './FactionCard';
import { GoodColor, BadColor, FavouriteColor } from '../../../../consts';


const RGMainInfo = ({ helped, hurt, rep, humanity, exp, downtime, freetime, budget, income, expenses, onOpenFactionModal }) => {

    return (
        <Group mode='card' header={<Header mode='secondary'>информация о персонаже</Header>}>
            <CardGrid size='m'>
                <Card key="humanity">
                    <Header mode="primary">Человечность</Header>
                    <SimpleCell
                        before={<Icon28MasksOutline
                            width={24} height={24}
                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                        />}>
                        {humanity}
                    </SimpleCell>
                </Card>
                <Card key="reputation">
                    <Header mode="primary">Репутация</Header>
                    <SimpleCell
                        before={<Icon56StatisticsOutline
                            width={24} height={24}
                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                        />}>
                        {rep}
                    </SimpleCell>
                </Card>
                <Card key="experience">
                    <Header mode="primary">Опыт в навыке</Header>
                    <SimpleCell
                        before={<Icon56Stars3Outline
                            width={24} height={24}
                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                        />}>
                        {exp}
                    </SimpleCell>
                </Card>
                <FactionCard helped={helped} hurt={hurt} onOpenFactionModal={onOpenFactionModal} />
            </CardGrid>
            <CardGrid size='m'>
                <Card key="downtime">
                    <Header mode="primary">Даунтайм</Header>
                    <SimpleCell
                        before={<Icon28HourglassOutline
                            width={24} height={24}
                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                        />}>
                        {downtime}
                    </SimpleCell>
                </Card>
                <Card key="freetime">
                    <Header mode="primary">
                        Свободное время
                    </Header>
                    <SimpleCell
                        before={<Icon28ClockOutline
                            width={24} height={24}
                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                        />}>
                        {freetime}
                    </SimpleCell>
                </Card>
            </CardGrid>
            <CardGrid size="l" >
                <Card key="gold">
                    <Header mode="primary">Финансы</Header>
                    <SimpleGrid align='stretch' columns={3} gap='xs'>
                        <HorizontalCell size='m' >
                            <Div className="not4mob">
                                <SimpleCell subhead='Бюджет'
                                    before={<Icon24DollarOutline
                                        width={24} height={24}
                                        style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                                    />}>
                                    {budget}
                                </SimpleCell>
                            </Div>
                            <Div className="formob">
                                <SimpleCell subhead='Бюджет'
                                    before={<Icon24DollarOutline
                                        width={20} height={20}
                                        style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                                    />}>
                                    {budget}
                                </SimpleCell>
                            </Div>
                        </HorizontalCell>
                        <HorizontalCell size='m' >
                            <Div className="not4mob">
                                <SimpleCell subhead='Доходы'
                                    before={<Icon20ArrowUpOutline
                                        width={24} height={24}
                                        color={GoodColor}
                                        style={{ filter: `drop-shadow(0 0 4px ${GoodColor})` }}
                                    />}>
                                    {income}
                                </SimpleCell>
                            </Div>
                            <Div className="formob">
                                <SimpleCell subhead='Доходы'
                                    before={<Icon20ArrowUpOutline
                                        width={20} height={20}
                                        color={GoodColor}
                                        style={{ filter: `drop-shadow(0 0 4px ${GoodColor})` }}
                                    />}>
                                    {income}
                                </SimpleCell>
                            </Div>
                        </HorizontalCell>
                        <HorizontalCell size='s' >
                            <Div className="not4mob">
                                <SimpleCell subhead='Расходы'
                                    before={<Icon20ArrowDownOutline
                                        width={24} height={24}
                                        color={BadColor}
                                        style={{ filter: `drop-shadow(0 0 4px ${BadColor})` }}
                                    />}>
                                    {expenses}
                                </SimpleCell>
                            </Div>
                            <Div className="formob">
                                <SimpleCell subhead='Расходы'
                                    before={<Icon20ArrowDownOutline
                                        width={20} height={20}
                                        color={BadColor}
                                        style={{ filter: `drop-shadow(0 0 4px ${BadColor})` }}
                                    />}>
                                    {expenses}
                                </SimpleCell>
                            </Div>
                        </HorizontalCell>
                    </SimpleGrid>
                </Card>
            </CardGrid>
        </Group>)
}

export default RGMainInfo;