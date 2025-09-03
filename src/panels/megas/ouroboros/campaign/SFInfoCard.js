import {
	Header,	CardGrid, Card, SimpleCell
} from '@vkontakte/vkui';
import {
	Icon28CrownOutline
} from '@vkontakte/icons'

const SFCharacterInfoCard = ({prio}) => {

    return (
        <CardGrid key="infoBlock" id="infoBlock" size='l'>
            <Card>
                <Header mode="primary">Приоритет</Header>
                <SimpleCell before={<Icon28CrownOutline width={24} height={24} />}> {prio}</SimpleCell>
            </Card>
        </CardGrid>
    )
}

export default SFCharacterInfoCard;