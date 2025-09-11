import { Card, RichCell, Counter } from "@vkontakte/vkui";
import {
    Icon24UserOutline, Icon28UserOutgoingOutline
} from '@vkontakte/icons'

import {FavouriteColor} from '../../../consts.js'

const RGCharCard = ({ element, openAction }) => {
    return (
        <Card mode="shadow" size="m" key={element.name + "_rg_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={<Icon24UserOutline 
                    width={48} height={48} 
                    color={FavouriteColor} 
                    style={{ filter: `drop-shadow(0 0 4px ${FavouriteColor})` }}
                    />}
                text={element.type}
                caption={element.owner && 
                    ("Собственность " + element.owner)}
                after={element.lvl_up &&
                    <Counter size="s" mode="primary">
                        <Icon28UserOutgoingOutline width={16} height={16} />
                    </Counter>}
                afterCaption={element.lvl_up && "Доступно повышение"}
            >
                {element.name}
            </RichCell>
        </Card>
    )
}


export default RGCharCard;