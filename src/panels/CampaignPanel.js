import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, Badge
} from '@vkontakte/vkui';

import { Icon28CalendarOutline, Icon28CrownOutline, Icon24UserOutline, Icon24StatisticsOutline, Icon24InfoCircleOutline } from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


const ROUTES = {
	LIST: 'list',
	CHAR: 'char'
}

const CampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("-")
	const [prio, setPrio] = useState()
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)

	function createCard(element) {
		return (
			<Group mode="plain">
				<CardGrid size="l">
					<Card mode="shadow" size="m">
						<SimpleCell
							key={element.name}
							id={element.name}
							onClick={() => {
								if (element.lvl_up) {
									//TODO
								} else {
									params.set('CharName', element.name);
									setParams(params);
									routeNavigator.push('/char', { keepSearchParams: true });
								}

							}} before={<Icon24UserOutline width={24} height={24} />} badgeAfterTitle={element.lvl_up && <Badge></Badge>}> {element.name}</SimpleCell>

						<SimpleCell
							key={element.name}
							id={element.name} before={<Icon24InfoCircleOutline width={24} height={24} />}> {element.race}-{element.type} {element.lvl} уровня</SimpleCell>
					</Card>
				</CardGrid>
			</Group>
		);
	}

	function createInfo(date, prio) {
		return (
			<CardGrid key="infoBlock" id="infoBlock" size='m'>
				<Card >
					<Header mode="primary">Последняя партия</Header>
					<SimpleCell before={<Icon28CalendarOutline width={24} height={24} />}>{date}</SimpleCell>
				</Card>
				<Card>
					<Header mode="primary">Приоритет</Header>
					<SimpleCell before={<Icon28CrownOutline width={24} height={24} />}> {prio}</SimpleCell>
				</Card>
			</CardGrid>
		);
	}


	useEffect(() => {
		async function fetchData() {
			const data = await axios.get(GOOGLE_SCRIPTS_BASE_URL + "?id=" + "a.orlov99").then(resp => {//fetchedUser.screen_name
				return resp.data
			})
			setCharacters(data.chars)
			setDate(data.date)
			setPrio(data.prio)
			setPopout(null)
		}
		fetchData()
	}, []);

	return (
		<Panel nav='campaign'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
			{
				fetchedUser &&
				<Group>
					<SplitLayout popout={popout}>
						<SplitCol>
							{date && prio && createInfo(date, prio)}
							<Header mode="secondary">Ваши персонажи</Header>
							{characters && characters.map((elem) => createCard(elem))}
						</SplitCol>
					</SplitLayout>
				</Group>
			}
		</Panel>
	)
};

export default CampaignPanel;
