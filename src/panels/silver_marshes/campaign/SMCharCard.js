import { Card, RichCell, Counter } from "@vkontakte/vkui";
import { Icon28UserOutgoingOutline, Icon24UserOutline } from "@vkontakte/icons";

import Icon48DndWarlock from "../../common/custom_icons/Icon48DndWarlock.tsx";
import Icon48DndBarbarian from "../../common/custom_icons/Icon48DndBarbarian.tsx";
import Icon48DndBard from "../../common/custom_icons/Icon48DndBard.tsx";
import Icon48DndCleric from "../../common/custom_icons/Icon48DndCleric.tsx";
import Icon48DndDruid from "../../common/custom_icons/Icon48DndDruid.tsx";
import Icon48DndFighter from "../../common/custom_icons/Icon48DndFighter.tsx";
import Icon48DndMonk from "../../common/custom_icons/Icon48DndMonk.tsx";
import Icon48DndPaladin from "../../common/custom_icons/Icon48DndPaladin.tsx";
import Icon48DndRanger from "../../common/custom_icons/Icon48DndRanger.tsx";
import Icon48DndRogue from "../../common/custom_icons/Icon48DndRogue.tsx";
import Icon48DndSorcerer from "../../common/custom_icons/Icon48DndSorcerer.tsx";
import Icon48DndWizard from "../../common/custom_icons/Icon48DndWizard.tsx";

const SMCharCard = ({element, openAction}) => {
    const iconMap = {
            "Варвар": <Icon48DndBarbarian color={FavouriteColor}/>,
            "Бард": <Icon48DndBard color={FavouriteColor}/>,
            "Жрец": <Icon48DndCleric color={FavouriteColor}/>,
            "Друид": <Icon48DndDruid color={FavouriteColor}/>,
            "Воин": <Icon48DndFighter color={FavouriteColor}/>,
            "Монах": <Icon48DndMonk color={FavouriteColor}/>,
            "Паладин": <Icon48DndPaladin color={FavouriteColor}/>,
            "Следопыт": <Icon48DndRanger color={FavouriteColor}/>,
            "Плут": <Icon48DndRogue color={FavouriteColor}/>,
            "Чародей": <Icon48DndSorcerer color={FavouriteColor}/>,
            "Колдун": <Icon48DndWarlock color={FavouriteColor}/>,
            "Волшебник": <Icon48DndWizard color={FavouriteColor}/>,
            // Add more types and icons as needed
        };

    return (
        <Card mode="shadow" size="m" key={element.name + "_sm_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={
                    iconMap[element.type] || <Icon24UserOutline width={48} height={48} color={FavouriteColor} />
                }
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