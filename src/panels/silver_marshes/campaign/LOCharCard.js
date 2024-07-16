import { Card, RichCell, Counter } from "@vkontakte/vkui";
import { Icon28UserOutgoingOutline, Icon24UserOutline } from "@vkontakte/icons";

const LOCharCard = ({element, openAction}) => {

    return (
        <Card mode="shadow" size="m" key={element.name + "_lo_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={<Icon24UserOutline width={48} height={48} color='#008cff' />}
                text={element.type + ", " + element.lvl + " ур."}
                caption={element.race}
                after={element.lvl_up &&
                    <Counter size="s" mode="primary">
                        <Icon28UserOutgoingOutline width={16} height={16} />
                    </Counter>}
                afterCaption={element.lvl_up && "Доступно повышение"}
            >
                {element.name}
            </RichCell>
        </Card>)
}

export default LOCharCard;