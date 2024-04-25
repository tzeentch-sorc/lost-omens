import { Card, RichCell, Counter } from "@vkontakte/vkui";
import {
    Icon24UserOutline, Icon28UserOutgoingOutline
} from '@vkontakte/icons'

const SFCharCard = ({ element, openAction }) => {
    return (
        <Card mode="shadow" size="m" key={element.name + "_sf_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={<Icon24UserOutline width={48} height={48} color='#008cff' />}
                text={element.lvl + " ур."}
                after={element.lvl_up == 'TRUE' ?
                    <Counter size="s" mode="primary">
                        <Icon28UserOutgoingOutline width={16} height={16} />
                    </Counter> : null}
                afterCaption={element.lvl_up == 'TRUE' ? "Доступно повышение" : ""}
            >
                {element.name}
            </RichCell>
        </Card>
    )
}


export default SFCharCard;