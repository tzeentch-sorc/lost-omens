import {
    Header, CardGrid, Card, SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';
import {
    Icon28CrownOutline, Icon24BookmarkOutline, Icon28CalendarOutline, Icon28HistoryForwardOutline
} from '@vkontakte/icons'

const LOInfoCard = ({ date, prio, adventure }) => {

    return (
        <>
            <CardGrid key="infoBlock" id="infoBlock" size='l' padding="true">
                <Card mode="plain" key="last_game">
                    <Group header={<Header mode="primary">Последняя партия</Header>} mode="plain">
                        <SimpleCell before={<Icon28CalendarOutline width={24} height={24} />}>
                            <InfoRow header="Дата партии">{date}</InfoRow>
                        </SimpleCell>
                        <SimpleCell before={<Icon24BookmarkOutline width={24} height={24} />}>
                            <InfoRow header="Название партии">{adventure}</InfoRow>
                        </SimpleCell>
                    </Group>
                </Card>
            </CardGrid>
            <CardGrid key="infoBlock2" id="infoBlock2" size='m' padding="true">
                <Card mode="plain">
                    <Group header={<Header mode="primary">Приоритет</Header>} mode="plain">
                        <SimpleCell before={<Icon28CrownOutline width={24} height={24} />}>
                            <InfoRow>{prio}</InfoRow>
                        </SimpleCell>
                    </Group>
                </Card>
                <Card mode="plain">
                    <Group header={<Header mode="primary">После партии</Header>} mode="plain">
                        <SimpleCell before={<Icon28HistoryForwardOutline width={24} height={24} />}>
                            <InfoRow>{(prio - prio * 0.2).toFixed(2)}</InfoRow>
                        </SimpleCell>
                    </Group>
                </Card>
            </CardGrid>
        </>
    )
}

export default LOInfoCard;