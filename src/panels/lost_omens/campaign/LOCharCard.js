import { Card, RichCell, Counter, Image } from "@vkontakte/vkui";
import { Icon28UserOutgoingOutline, Icon24UserOutline } from "@vkontakte/icons";

import Icon48Alchemist from "../../common/custom_icons/Icon48Alchemist.tsx";
import Icon48Animist from "../../common/custom_icons/Icon48Animist.tsx";
import Icon48Barbarian from "../../common/custom_icons/Icon48Barbarian.tsx";
import Icon48Bard from "../../common/custom_icons/Icon48Bard.tsx";
import Icon48Cleric from "../../common/custom_icons/Icon48Cleric.tsx";
import Icon48Druid from "../../common/custom_icons/Icon48Druid.tsx";
import Icon48Fighter from "../../common/custom_icons/Icon48Fighter.tsx";
import Icon48Gunslinger from "../../common/custom_icons/Icon48Gunslinger.tsx";
import Icon48Inventor from "../../common/custom_icons/Icon48Inventor.tsx";
import Icon48Investigator from "../../common/custom_icons/Icon48Investigator.tsx";
import Icon48Kineticist from "../../common/custom_icons/Icon48Kineticist.tsx";
import Icon48Magus from "../../common/custom_icons/Icon48Magus.tsx";
import Icon48Monk from "../../common/custom_icons/Icon48Monk.tsx";
import Icon48Oracle from "../../common/custom_icons/Icon48Oracle.tsx";
import Icon48Paladin from "../../common/custom_icons/Icon48Paladin.tsx";
import Icon48Psychic from "../../common/custom_icons/Icon48Psychic.tsx";
import Icon48Ranger from "../../common/custom_icons/Icon48Ranger.tsx";
import Icon48Rogue from "../../common/custom_icons/Icon48Rogue.tsx";
import Icon48Sorcerer from "../../common/custom_icons/Icon48Sorcerer.tsx";
import Icon48Summoner from "../../common/custom_icons/Icon48Summoner.tsx";
import Icon48Swashbuckler from "../../common/custom_icons/Icon48Swashbuckler.tsx";
import Icon48Taumaturg from "../../common/custom_icons/Icon48Taumaturg.tsx";
import Icon48Witch from "../../common/custom_icons/Icon48Witch.tsx";
import Icon48Wizard from "../../common/custom_icons/Icon48Wizard.tsx";

import {FavouriteColor} from '../../../util/consts.js'


const LOCharCard = ({element, openAction}) => {
    const iconMap = {
        "Алхимик": <Icon48Alchemist color={FavouriteColor}/>,
        "Анимист": <Icon48Animist color={FavouriteColor}/>,
        "Варвар": <Icon48Barbarian color={FavouriteColor}/>,
        "Бард": <Icon48Bard color={FavouriteColor}/>,
        "Жрец": <Icon48Cleric color={FavouriteColor}/>,
        "Друид": <Icon48Druid color={FavouriteColor}/>,
        "Боец": <Icon48Fighter color={FavouriteColor}/>,
        "Стрелок": <Icon48Gunslinger color={FavouriteColor}/>,
        "Изобретатель": <Icon48Inventor color={FavouriteColor}/>,
        "Сыщик": <Icon48Investigator color={FavouriteColor}/>,
        "Кинетик": <Icon48Kineticist color={FavouriteColor}/>,
        "Магус": <Icon48Magus color={FavouriteColor}/>,
        "Монах": <Icon48Monk color={FavouriteColor}/>,
        "Оракул": <Icon48Oracle color={FavouriteColor}/>,
        "Поборник": <Icon48Paladin color={FavouriteColor}/>,
        "Психик": <Icon48Psychic color={FavouriteColor}/>,
        "Следопыт": <Icon48Ranger color={FavouriteColor}/>,
        "Плут": <Icon48Rogue color={FavouriteColor}/>,
        "Чародей": <Icon48Sorcerer color={FavouriteColor}/>,
        "Призыватель": <Icon48Summoner color={FavouriteColor}/>,
        "Сорвиголова": <Icon48Swashbuckler color={FavouriteColor}/>,
        "Тауматург": <Icon48Taumaturg color={FavouriteColor}/>,
        "Ведьма": <Icon48Witch color={FavouriteColor}/>,
        "Волшебник": <Icon48Wizard color={FavouriteColor}/>,

        // Add more types and icons as needed
    };

    return (
        <Card mode="shadow" size="m" key={element.name + "_lo_card"}
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

export default LOCharCard;