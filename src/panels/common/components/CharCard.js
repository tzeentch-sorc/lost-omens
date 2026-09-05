import { Card, RichCell, Counter } from "@vkontakte/vkui";
import { Icon28UserOutgoingOutline, Icon24UserOutline } from "@vkontakte/icons";

import { FavouriteColor } from '../../../consts.js';

// Каркас карточки персонажа. Кампании различаются только иконкой и подписями:
// before — иконка класса, если она у кампании есть, иначе общий силуэт.
const CharCard = ({ element, openAction, before, subtitle, extraSubtitle }) => {
    return (
        <Card mode="shadow" size="m" onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={before || <Icon24UserOutline width={48} height={48} color={FavouriteColor} />}
                subtitle={subtitle}
                extraSubtitle={extraSubtitle}
                after={element.lvl_up &&
                    <Counter size="s" mode="primary" appearance="accent">
                        <Icon28UserOutgoingOutline width={16} height={16} />
                    </Counter>}
                afterCaption={element.lvl_up && "Доступно повышение"}
            >
                {element.name}
            </RichCell>
        </Card>
    )
}

export default CharCard;
