import { Card, RichCell, Counter } from "@vkontakte/vkui";
import { Icon28UserOutgoingOutline, Icon24UserOutline } from "@vkontakte/icons";

import Icon48Warlock from "../../common/custom_icons/Icon48Warlock.tsx";

const SMCharCard = ({element, openAction}) => {
    const iconMap = {
            "Колдун": <Icon48Warlock color='#008cff'/>,
            // Add more types and icons as needed
        };

    return (
        <Card mode="shadow" size="m" key={element.name + "_sm_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={<Icon48Warlock color='#008cff'/>}
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

export default SMCharCard;