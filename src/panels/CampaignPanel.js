import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, Badge, Alert, Counter

} from '@vkontakte/vkui';

import {
	Icon28CalendarOutline, Icon28CrownOutline, Icon24UserOutline,
	Icon24StatisticsOutline, Icon24InfoCircleOutline
} from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './CampaignPanel.css'

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

	const closePopout = () => {
		setPopout(null);
	};

	const openAction = (element) => {
		setPopout(
			<Alert
				actions={[
					{
						title: <Icon24StatisticsOutline width={24} height={24} />,
						mode: 'default',
						action: () => {
							window.open('https://docs.google.com/forms/d/e/1FAIpQLSf4rQ2XSS3zMYp8NLPlh1Oj7eqAMCWFbO7iyW6XdY-i-Aa4dA/viewform', "_blank")
						},
					},
					{
						title: 'Пропустить',
						mode: 'cancel',
						action: () => {
							params.set('CharName', element.name);
							setParams(params);
							routeNavigator.push('/char', { keepSearchParams: true });
						},
					},
				]}
				onClose={closePopout}
				header={element.name + ' нуждается в повышении уровня!'}
				text="Можно повысить уровень прямо сейчас или продолжить работу без повышения"
			/>,
		);
	};

	function createCard(element) {
		return (

			<Card mode="shadow" size="m">
				<SimpleCell
					key={element.name}
					id={element.name}
					indicator={
						element.lvl_up &&
						<Counter size="m" mode="prominent">
							<Icon24StatisticsOutline width={16} height={16} />
						</Counter>
					}
					onClick={() => {
						if (element.lvl_up) {
							openAction(element);
						} else {
							params.set('CharName', element.name);
							setParams(params);
							routeNavigator.push('/char', { keepSearchParams: true });
						}

					}} before={<Icon24UserOutline width={24} height={24} />}> {element.name}</SimpleCell>

				<SimpleCell before={<Icon24InfoCircleOutline width={24} height={24} />}> {element.race}-{element.type} {element.lvl} уровня</SimpleCell>
			</Card>

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
			const data = await axios.get(GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {//fetchedUser.screen_name
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
							<SplitLayout popout={popout}>
								<SplitCol>
									<Group mode="plain">
										<div class="not4mob">
										<CardGrid size="m">
											{characters && characters.map((elem) => createCard(elem))}
										</CardGrid>
										</div>
										<div class="formob">
										<CardGrid size="l">
											{characters && characters.map((elem) => createCard(elem))}
										</CardGrid>
										</div>
									</Group>
								</SplitCol>
							</SplitLayout>
						</SplitCol>
					</SplitLayout>
				</Group>
			}
		</Panel>
	)
};

export default CampaignPanel;
