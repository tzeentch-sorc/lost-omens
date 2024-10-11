import React from 'react';
import {
    SimpleCell,
    Header, Group, CardGrid, Card
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
    Icon28WidgetsOutline, Icon28HourglassErrorBadgeOutline
} from '@vkontakte/icons'


const SMMainInfo = ({gold, downtime, experience, level, mult}) => {
    function countGames(exp, lvl) {
		if (lvl && lvl < 5) {
            var tmplvl = lvl-3;
			if (exp - (tmplvl*2) == 0) {
				return 2;
			} else {
				return 1;
			}
		} else if (lvl && lvl < 9){
			var tmpexp = exp - 4;
            var tmplvl = lvl - 5;
			if (tmpexp - (tmplvl*3) == 0) {
				return 3;
			} else if (tmpexp - (tmplvl*3) == 1) {
				return 2;
			} else {
				return 1;
			}
		} else if (lvl && lvl < 15) {
            var tmpexp = exp - 16;
            var tmplvl = lvl - 9;
			if (tmpexp - (tmplvl*4) == 0) {
				return 4;
			} else if (tmpexp - (tmplvl*4) == 1) {
				return 3;
			} else if (tmpexp - (tmplvl*4) == 2) {
				return 2;
			} else {
				return 1;
			}
        } else if (lvl) {
            return "∞";
        }
	}

    return (
        <Group>

            <CardGrid size='m'>
                <Card key="gold">
                    <Header mode="primary">Золото</Header>
                    <SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{gold}</SimpleCell>
                </Card>
                <Card key="downtime">
                    <Header mode="primary">Даунтайм</Header>
                    <SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime}</SimpleCell>
                </Card>
            </CardGrid>
            <CardGrid size='m'>
                <Card key="experience">
                    <Header mode="primary">Уровень</Header>
                    <SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
                        {experience && level && (level)} {!experience && ("unknown")}
                    </SimpleCell>
                </Card>
                <Card key="lvlcountdown">
                    <Header mode="primary">
                        Партий до {level && (parseInt(level, 10) + 1)} {!level && (" ??? ")} ур.
                    </Header>
                    <SimpleCell before={<Icon28HourglassErrorBadgeOutline width={24} height={24} />}>
                        {experience && level && (countGames(experience, level) + ( " шт."))}
                        {(!experience || !level) && (" ??? ")}
                    </SimpleCell>
                </Card>
            </CardGrid>
            <CardGrid size="l" >
                <Card key="mult">
                    <Header mode="primary">Класс</Header>
                    <SimpleCell before={<Icon28WidgetsOutline width={24} height={24} />}>
                        {mult}
                    </SimpleCell>
                </Card>
            </CardGrid>
        </Group>)
}

export default SMMainInfo;