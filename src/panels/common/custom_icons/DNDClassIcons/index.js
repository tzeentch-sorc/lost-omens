import Icon48DndBarbarian from "./Icon48DndBarbarian.tsx";
import Icon48DndBard from "./Icon48DndBard.tsx";
import Icon48DndCleric from "./Icon48DndCleric.tsx";
import Icon48DndDruid from "./Icon48DndDruid.tsx";
import Icon48DndFighter from "./Icon48DndFighter.tsx";
import Icon48DndMonk from "./Icon48DndMonk.tsx";
import Icon48DndPaladin from "./Icon48DndPaladin.tsx";
import Icon48DndRanger from "./Icon48DndRanger.tsx";
import Icon48DndRogue from "./Icon48DndRogue.tsx";
import Icon48DndSorcerer from "./Icon48DndSorcerer.tsx";
import Icon48DndWarlock from "./Icon48DndWarlock.tsx";
import Icon48DndWizard from "./Icon48DndWizard.tsx";

import { FavouriteColor } from '../../../../consts.js';

// Название класса в листе «Экспорт» → иконка. Ключи пишут мастера, поэтому менять их нельзя.
const dndClassIcons = {
    "Варвар": <Icon48DndBarbarian color={FavouriteColor} />,
    "Бард": <Icon48DndBard color={FavouriteColor} />,
    "Жрец": <Icon48DndCleric color={FavouriteColor} />,
    "Друид": <Icon48DndDruid color={FavouriteColor} />,
    "Воин": <Icon48DndFighter color={FavouriteColor} />,
    "Монах": <Icon48DndMonk color={FavouriteColor} />,
    "Паладин": <Icon48DndPaladin color={FavouriteColor} />,
    "Следопыт": <Icon48DndRanger color={FavouriteColor} />,
    "Плут": <Icon48DndRogue color={FavouriteColor} />,
    "Чародей": <Icon48DndSorcerer color={FavouriteColor} />,
    "Колдун": <Icon48DndWarlock color={FavouriteColor} />,
    "Волшебник": <Icon48DndWizard color={FavouriteColor} />,
};

export default dndClassIcons;
