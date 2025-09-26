import React from 'react';
import {
    SimpleCell, SimpleGrid, HorizontalCell,
    Header, Group, CardGrid, Card, Div,
    Spacing, Button
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon28MasksOutline, Icon28ClockOutline, Icon56Stars3Outline,
    Icon20ArrowUpOutline, Icon56StatisticsOutline, Icon20ArrowDownOutline, Icon24DollarOutline
} from '@vkontakte/icons'
import FactionCard from './FactionCard';
import { GoodColor, BadColor, FavouriteColor, RGTransactions, RGTransactionsChar, FormPreEnter } from '../../../consts';

function createPreEnteredTransactionsLink(charName, link) {
    var newLink = link + FormPreEnter +
        RGTransactionsChar + charName;
    return newLink;
}

const RGMainInfo = ({ charName, helped, hurt, rep, humanity, exp, downtime, freetime, budget, income, expenses, onOpenFactionModal, openRequests }) => {

    return (
        <>
            <Group mode='card' header={<Header size="s">информация о персонаже</Header>}>
                <CardGrid size='m'>
                    <Card key="humanity">
                        <Header size="m">Человечность</Header>
                        <SimpleCell
                            before={<Icon28MasksOutline
                                width={24} height={24}
                                style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                            />}>
                            {humanity}
                        </SimpleCell>
                    </Card>
                    <Card key="reputation">
                        <Header size="m">Репутация</Header>
                        <SimpleCell
                            before={<Icon56StatisticsOutline
                                width={24} height={24}
                                style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                            />}>
                            {rep}
                        </SimpleCell>
                    </Card>
                    <Card key="experience">
                        <Header size="m">Опыт в навыке</Header>
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
                        <Header size="m">Даунтайм</Header>
                        <SimpleCell
                            before={<Icon28HourglassOutline
                                width={24} height={24}
                                style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                            />}>
                            {downtime}
                        </SimpleCell>
                    </Card>
                    <Card key="freetime">
                        <Header size="m">
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
                        <Header size="m">Финансы</Header>
                        <SimpleGrid align='stretch' columns={3} gap='xs'>
                            <HorizontalCell size='m' >
                                <Div className="not4mob">
                                    <SimpleCell overTitle='Бюджет'
                                        before={<Icon24DollarOutline
                                            width={24} height={24}
                                            style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                                        />}>
                                        {budget}
                                    </SimpleCell>
                                </Div>
                                <Div className="formob">
                                    <SimpleCell overTitle='Бюджет'
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
                                    <SimpleCell overTitle='Доходы'
                                        before={<Icon20ArrowUpOutline
                                            width={24} height={24}
                                            color={GoodColor}
                                            style={{ filter: `drop-shadow(0 0 4px ${GoodColor})` }}
                                        />}>
                                        {income}
                                    </SimpleCell>
                                </Div>
                                <Div className="formob">
                                    <SimpleCell overTitle='Доходы'
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
                                    <SimpleCell overTitle='Расходы'
                                        before={<Icon20ArrowDownOutline
                                            width={24} height={24}
                                            color={BadColor}
                                            style={{ filter: `drop-shadow(0 0 4px ${BadColor})` }}
                                        />}>
                                        {expenses}
                                    </SimpleCell>
                                </Div>
                                <Div className="formob">
                                    <SimpleCell overTitle='Расходы'
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
                <Spacing size={4} />
                <Group mode='plain'>
                    <Div style={{ paddingLeft: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <Button stretched appearance="neutral" size="l" onClick={() => { window.open(createPreEnteredTransactionsLink(charName, RGTransactions), "_blank") }}>Совершить транзакцию</Button>
                        <Button stretched appearance="negative" size="l" onClick={() => { openRequests(charName) }}>Заявки
                        </Button>
                    </Div>
                    <Div style={{ paddingLeft: 16 }}>
                    </Div>
                </Group>
            </Group>
        </>)
}

export default RGMainInfo;