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


const LOCharCard = ({element, openAction}) => {
    const iconMap = {
        "Алхимик": <Icon48Alchemist color='#008cff'/>,
        "Анимист": <Icon48Animist color='#008cff'/>,
        "Варвар": <Icon48Barbarian color='#008cff'/>,
        "Бард": <Icon48Bard color='#008cff'/>,
        "Жрец": <Icon48Cleric color='#008cff'/>,
        "Друид": <Icon48Druid color='#008cff'/>,
        "Боец": <Icon48Fighter color='#008cff'/>,
        "Стрелок": <Icon48Gunslinger color='#008cff'/>,
        "Изобретатель": <Icon48Inventor color='#008cff'/>,
        "Сыщик": <Icon48Investigator color='#008cff'/>,
        "Кинетик": <Icon48Kineticist color='#008cff'/>,
        "Магус": <Icon48Magus color='#008cff'/>,
        "Монах": <Icon48Monk color='#008cff'/>,
        "Оракул": <Icon48Oracle color='#008cff'/>,
        "Поборник": <Icon48Paladin color='#008cff'/>,
        "Психик": <Icon48Psychic color='#008cff'/>,
        "Следопыт": <Icon48Ranger color='#008cff'/>,
        "Плут": <Icon48Rogue color='#008cff'/>,
        "Чародей": <Icon48Sorcerer color='#008cff'/>,
        "Призыватель": <Icon48Summoner color='#008cff'/>,
        "Сорвиголова": <Icon48Swashbuckler color='#008cff'/>,
        "Тауматург": <Icon48Taumaturg color='#008cff'/>,
        "Ведьма": <Icon48Witch color='#008cff'/>,
        "Волшебник": <Icon48Wizard color='#008cff'/>,

        // Add more types and icons as needed
    };

    return (
        <Card mode="shadow" size="m" key={element.name + "_lo_card"}
            onClick={openAction}>
            <RichCell
                key={element.name}
                id={element.name}
                before={
                     iconMap[element.type] || <Icon24UserOutline width={48} height={48} color='#008cff' />
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