import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card
} from '@vkontakte/vkui';
import { Icon28HourglassOutline, Icon36CoinsStacks3Outline } from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';




const Character = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
	const [gold, setGold] = useState(0);
	const [downtime, setDowntime] = useState(0);

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


	useEffect(() => {
		async function fetchData() {
			const data = await axios.post(GOOGLE_SCRIPTS_BASE_URL + "?id=" + charName).then(resp => {
				return resp.data
			})
			setInventory(data.inventory);
			setGold(data.gold);
			setDowntime(data.downtime);
			setPopout(null);
			setDowntime(data.downtime);
		}
		fetchData();
	}, []);

	return (
		<Panel popout={popout} nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign', {keepSearchParams: true})} />}>
				{charName}
			</PanelHeader>
			<Group>
				<CardGrid size='m'>
					<Card >
						<Header mode="primary">Золото</Header>
						<SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{gold}</SimpleCell>
					</Card>
					<Card>
						<Header mode="primary">Даунтайм</Header>
						<SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime}</SimpleCell>
					</Card>
				</CardGrid>
			</Group>
			<Group header={<Header mode="primary">Инвентарь</Header>}>
				{inventory && inventory.map(e => createRow(e))}
			</Group>
		</Panel>
	);
};

export default Character;
