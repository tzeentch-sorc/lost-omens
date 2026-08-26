import Icon48Alchemist from "./Icon48Alchemist.tsx";
import Icon48Animist from "./Icon48Animist.tsx";
import Icon48Barbarian from "./Icon48Barbarian.tsx";
import Icon48Bard from "./Icon48Bard.tsx";
import Icon48Cleric from "./Icon48Cleric.tsx";
import Icon48Druid from "./Icon48Druid.tsx";
import Icon48Fighter from "./Icon48Fighter.tsx";
import Icon48Gunslinger from "./Icon48Gunslinger.tsx";
import Icon48Inventor from "./Icon48Inventor.tsx";
import Icon48Investigator from "./Icon48Investigator.tsx";
import Icon48Kineticist from "./Icon48Kineticist.tsx";
import Icon48Magus from "./Icon48Magus.tsx";
import Icon48Monk from "./Icon48Monk.tsx";
import Icon48Oracle from "./Icon48Oracle.tsx";
import Icon48Paladin from "./Icon48Paladin.tsx";
import Icon48Psychic from "./Icon48Psychic.tsx";
import Icon48Ranger from "./Icon48Ranger.tsx";
import Icon48Rogue from "./Icon48Rogue.tsx";
import Icon48Sorcerer from "./Icon48Sorcerer.tsx";
import Icon48Summoner from "./Icon48Summoner.tsx";
import Icon48Swashbuckler from "./Icon48Swashbuckler.tsx";
import Icon48Taumaturg from "./Icon48Taumaturg.tsx";
import Icon48Witch from "./Icon48Witch.tsx";
import Icon48Wizard from "./Icon48Wizard.tsx";

import { FavouriteColor } from '../../../../consts.js';

// Название класса в листе «Экспорт» → иконка. Ключи пишут мастера, поэтому менять их нельзя.
const loClassIcons = {
    "Алхимик": <Icon48Alchemist color={FavouriteColor} />,
    "Анимист": <Icon48Animist color={FavouriteColor} />,
    "Варвар": <Icon48Barbarian color={FavouriteColor} />,
    "Бард": <Icon48Bard color={FavouriteColor} />,
    "Жрец": <Icon48Cleric color={FavouriteColor} />,
    "Друид": <Icon48Druid color={FavouriteColor} />,
    "Боец": <Icon48Fighter color={FavouriteColor} />,
    "Стрелок": <Icon48Gunslinger color={FavouriteColor} />,
    "Изобретатель": <Icon48Inventor color={FavouriteColor} />,
    "Сыщик": <Icon48Investigator color={FavouriteColor} />,
    "Кинетик": <Icon48Kineticist color={FavouriteColor} />,
    "Магус": <Icon48Magus color={FavouriteColor} />,
    "Монах": <Icon48Monk color={FavouriteColor} />,
    "Оракул": <Icon48Oracle color={FavouriteColor} />,
    "Поборник": <Icon48Paladin color={FavouriteColor} />,
    "Психик": <Icon48Psychic color={FavouriteColor} />,
    "Следопыт": <Icon48Ranger color={FavouriteColor} />,
    "Плут": <Icon48Rogue color={FavouriteColor} />,
    "Чародей": <Icon48Sorcerer color={FavouriteColor} />,
    "Призыватель": <Icon48Summoner color={FavouriteColor} />,
    "Сорвиголова": <Icon48Swashbuckler color={FavouriteColor} />,
    "Тауматург": <Icon48Taumaturg color={FavouriteColor} />,
    "Ведьма": <Icon48Witch color={FavouriteColor} />,
    "Волшебник": <Icon48Wizard color={FavouriteColor} />,
};

export default loClassIcons;
