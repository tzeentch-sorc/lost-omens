import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, SplitCol, SplitLayout
} from '@vkontakte/vkui';
import { Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline, Icon28HourglassErrorBadgeOutline } from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';




const LOCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
	const [gold, setGold] = useState(0);
	const [downtime, setDowntime] = useState(0);
	const [experience, setExperience] = useState();
	const [level, setLevel] = useState();

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');

	function createRow(element) {
		if (element[2] == 0) return;
		var description = "Количество: " + element[2] + "; Цена: " + element[1];
		return (
			<SimpleCell multiline key={element[0]}>
				<InfoRow header={description}>{element[0]}</InfoRow>
			</SimpleCell>
		);
	}

	function countGames(exp, lvl) {
		if (lvl && lvl<7){
			if(exp-lvl*1000>0){
				return 1;
			}else{
				return 2;
			}
		} else {
			var tmpexp = exp-6000;
			if(tmpexp-lvl*1500==0){
				return 3;
			}else if(tmpexp-lvl*1500==500){
				return 2;
			}else{
				return 1;
			}
		}
	}


	useEffect(() => {
		async function fetchData() {
			const data = await axios.post(GOOGLE_SCRIPTS_BASE_URL + "?id=" + charName).then(resp => {
				return resp.data
			})
			setInventory(data.inventory.sort((a, b) => b[1] - a[1]));
			setGold(data.gold);
			setExperience(data.exp);
			setLevel(data.lvl);
			setDowntime(data.downtime);
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
			console.log(data.inventory)
		}
		fetchData();
	}, []);
	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/lost_omens', { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
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
								<Header mode="primary">Опыт</Header>
								<SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
									{experience && (experience)} {!experience && (" ??? ")} XP 
								</SimpleCell>
							</Card>
							<Card key="lvlcountdown">
								<Header mode="primary">Партий до {level && (parseInt(level, 10)+1)} {!level && (" ??? ")} 
								уровня</Header>
								<SimpleCell before={<Icon28HourglassErrorBadgeOutline width={24} height={24} />}>
								 	 {experience && level && (countGames(experience, level))} 
									{(!experience || !level) && (" ??? ")}
								</SimpleCell>
							</Card>
						</CardGrid>
					</Group>
					<Group header={<Header mode="primary">Инвентарь</Header>}>
						{inventory && inventory.map(e => createRow(e))}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default LOCharacter;
