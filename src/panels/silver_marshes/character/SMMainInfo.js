import React from 'react';
import {
    SimpleCell,
    Header, Group, CardGrid, Card
} from '@vkontakte/vkui';
import {
    Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
    Icon28WidgetsOutline
} from '@vkontakte/icons'


const SMMainInfo = ({gold, downtime, experience, level, mult}) => {
    function countGames(exp, lvl) {
		if (lvl && lvl < 7) {
			if (exp - (lvl - 1) * 1000 > 0) {
				return 1;
			} else {
				return 2;
			}
		} else {
			var tmpexp = exp - 6000;
			if (tmpexp - (lvl - 7) * 1500 == 0) {
				return 3;
			} else if (tmpexp - (lvl - 7) * 1500 == 500) {
				return 2;
			} else {
				return 1;
			}
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
                        {experience && level && (level + " (" + experience + " XP)")} {!experience && ("unknown")}
                    </SimpleCell>
                </Card>
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