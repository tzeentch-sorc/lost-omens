import Icon24AgentTier from "../../../common/custom_icons/LOTierIcons/Icon24AgentTier.tsx";
import Icon24AdeptTier from "../../../common/custom_icons/LOTierIcons/Icon24AdeptTier.tsx";
import Icon24CaptainTier from "../../../common/custom_icons/LOTierIcons/Icon24CaptainTier.tsx";
import Icon24MasterTier from "../../../common/custom_icons/LOTierIcons/Icon24MasterTier.tsx";
import Icon24SeniorTier from "../../../common/custom_icons/LOTierIcons/Icon24SeniorTier.tsx";

const bonusA = {
    title: "Доступ к складам Общества",
    rule: "Можете выбрать бесплатный расходник на партию (одноразовый на партию, только то, к чему есть доступ), максимальный уровень расходника: {level}" 
};

const bonusB = {
    title: "Сеть информаторов",
    rule: "Бонус обстоятельства +1 для проверок Дипломатии и Общества, если в поселении есть Ложа Искателей" 
};

const bonusC = {
    title: "Бесплатная Pathfinder's Coin",
    rule: "Устройство способное хранить запись речи и воспроизводить только с помощью Путеискателя"
};

const bonusD = {
    title: "Доступ к мастерским Общества",
    rule: "Бесплатная установка common рун в мастерских Общества Искателей"
};

const bonusE = {
    title: "Улучшенное снабжение",
    rule: "Можете выбрать бесплатный расходник на партию (одноразовый на партию, только то, к чему есть доступ), максимальный уровень расходника: {level}"
};

const bonusF = {
    title: "Удача агента",
    rule: "Один раз за партию можно использовать усиленную версию переброса за Очко Героизма - оставляется лучший куб из двух"
};

const bonusG = {
    title: "Указ Децемвирата о сохранении особо важных агентов",
    rule: "50% стоимости на ритуалы воскрешения оплачивает Общество Искателей"
};

const bonusH = {
    title: "Развитая сеть информаторов",
    rule: "Бонус обстоятельства +2 для проверок Дипломатии и Общества, если в поселении есть Ложа Искателей" 
};

export const tierMap = {
  1: {
    getIcon: (size = 24) => <Icon24AgentTier width={size} height={size} />,
    name: 'Агент',
    bonuses: [
    ],
    description: "Молодой Агент! Твой путь только начался - будь готов принимать выпадающие на твою долю испытания, Общество Искателей оценит это и вознаградит"
  },
  2: {
    getIcon: (size = 24) => <Icon24AdeptTier width={size} height={size} />,
    name: 'Адепт',
    bonuses: [
        bonusA,
        bonusB,
        bonusC,
    ],
    description: "Главная ложа снабжает опытных Искателей расходными материалами и информацией..."
  },
  3: {
    getIcon: (size = 24) => <Icon24SeniorTier width={size} height={size} />,
    name: 'Старший Искатель',
    bonuses:  [
        bonusA,
        bonusB,
        bonusC,
        bonusD
    ],
    description: "... Кузнецы Главной Ложи смогут найти время для помощи опытным агентам..."
  }
  ,
  4: {
    getIcon: (size = 24) => <Icon24MasterTier width={size} height={size} />,
    name: 'Мастер-искатель',
    bonuses:  [
        bonusE,
        bonusB,
        bonusC,
        bonusD,
        bonusF
    ],
    description: "... опытные искатели набираются уверенности в своих силах, и способны совершать поистине героические поступки."
  }
  ,
  5: {
    getIcon: (size = 24) =>  <Icon24CaptainTier width={size} height={size} />,
    name: 'Капитан-Экспедитор',
    bonuses:  [
        bonusE,
        bonusH,
        bonusC,
        bonusD,
        bonusF,
        bonusG
    ],
    description: "Есть такие агенты, за успехами которых Децемвират следит лично."
  }
};
