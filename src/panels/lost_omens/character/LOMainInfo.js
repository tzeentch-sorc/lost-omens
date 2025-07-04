import React from 'react';
import {
    SimpleCell,
    Header, Group, CardGrid, Card
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
    Icon28HourglassErrorBadgeOutline, Icon28CompassOutline
} from '@vkontakte/icons'
import TierCard from './TierCard';


const LOMainInfo = ({ gold, tokens, downtime, tier, experience, level, easterEgg, onOpenTierModal }) => {
    
    function countGames(exp, lvl) {
        if (lvl && lvl < 7) {
            var tmplvl = lvl - 1;
            if (exp - (tmplvl * 1000) > 0) {
                return 1;
            } else {
                return 2;
            }
        } else {
            var tmpexp = exp - 6000;
            var tmplvl = lvl - 7;
            if (tmpexp - (tmplvl * 1500) == 0) {
                return 3;
            } else if (tmpexp - (tmplvl * 1500) == 500) {
                return 2;
            } else {
                return 1;
            }
        }
    }

    return (
        <Group mode='card' header={<Header mode='secondary'>Ресурсы и опыт персонажа</Header>}>
            <CardGrid size='m'>
                <Card key="gold">
                    <Header mode="primary">Золото</Header>
                    <SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{gold}</SimpleCell>
                </Card>
                <Card key="tokens">
                    <Header mode="primary">{easterEgg == 11 ? "ЖОПы" : "ЖОДы"}</Header>
                    <SimpleCell before={<Icon28CompassOutline width={24} height={24} />}>{tokens}</SimpleCell>
                </Card>
                <Card key="downtime">
                    <Header mode="primary">Даунтайм</Header>
                    <SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime} / 56 дней</SimpleCell>
                </Card>
                <TierCard tier={tier} onOpenTierModal={onOpenTierModal}/>
            </CardGrid>
            <CardGrid size='m'>
                <Card key="experience">
                    <Header mode="primary">Уровень</Header>
                    <SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
                        {experience && level && (level + " (" + experience + " XP)")} {!experience && ("unknown")}
                    </SimpleCell>
                </Card>
                <Card key="lvlcountdown">
                    <Header mode="primary">
                        Партий до {level && (parseInt(level, 10) + 1)} {!level && (" ??? ")} ур.
                    </Header>
                    <SimpleCell before={<Icon28HourglassErrorBadgeOutline width={24} height={24} />}>
                        {experience && level && (countGames(experience, level) + (easterEgg == 7 ? " Игорей" : " шт."))}
                        {(!experience || !level) && (" ??? ")}
                    </SimpleCell>
                </Card>
            </CardGrid>
        </Group>)
}

export default LOMainInfo;