import {
	Header,	CardGrid, Card, SimpleCell, InfoRow, Group
} from '@vkontakte/vkui';
import {
	Icon28CrownOutline, Icon24BookmarkOutline, Icon28CalendarOutline
} from '@vkontakte/icons'

const LOInfoCard = ({date, prio, adventure}) => {

    return (
        <Group header={<Header mode="secondary">Информация игрока</Header>} mode="plain">
        <CardGrid key="infoBlock" id="infoBlock" size='l'>
            <Card mode="plain" key="last_game">
                <Group header={<Header mode="primary">Последняя партия</Header>} mode="plain">
                    <SimpleCell before={<Icon28CalendarOutline width={24} height={24} />}>
                        <InfoRow header="Дата партии">{date}</InfoRow>
                    </SimpleCell>
                    <SimpleCell before={<Icon24BookmarkOutline width={24} height={24}/>}>
                        <InfoRow header="Название партии">{adventure}</InfoRow>
                    </SimpleCell>
                </Group>
            </Card>
            <Card mode="plain">
                <Group header={<Header mode="primary">Приоритет</Header>} mode="plain">
                    <SimpleCell before={<Icon28CrownOutline width={24} height={24} />}>
                        <InfoRow>{prio}</InfoRow>
                    </SimpleCell>
                </Group>
            </Card>
        </CardGrid>
    </Group>
    )
}

export default LOInfoCard;