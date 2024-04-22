import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, Badge, Alert, Counter, Div, RichCell, InfoRow

} from '@vkontakte/vkui';

import {
	Icon28CalendarOutline, Icon28CrownOutline, Icon24UserOutline,
	Icon24StatisticsOutline, Icon20ArrowUpOutline, Icon24BookmarkOutline
} from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './CampaignPanel.css'

const CampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("-")
	const [advName, setAdvName] = useState("неизвестное приключение")
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
							routeNavigator.push('/char/lost_omens', { keepSearchParams: true });
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
			<Card mode="shadow" size="m" key={element.name + "_lo_card"}
				onClick={() => {
					if (element.lvl_up) {
						openAction(element);
					} else {
						params.set('CharName', element.name);
						setParams(params);
						routeNavigator.push('/char/lost_omens', { keepSearchParams: true });
					}
				}}>
				<RichCell
					key={element.name}
					id={element.name}
					before={<Icon24UserOutline width={48} height={48} color='#008cff'/>}
					text={element.type+ ", " +element.lvl + " ур."} 
					caption={element.race}
					after={element.lvl_up &&
						<Counter size="s" mode="primary">
							<Icon20ArrowUpOutline width={16} height={16}/>
						</Counter>}
					afterCaption={element.lvl_up && "Доступно повышение"}
				>
					{element.name}
				</RichCell>
			</Card>
		);
	}

	function createInfo(date, prio) {
		return (
			<Group header={<Header mode="secondary">Информация игрока</Header>} mode="plain">
				<CardGrid key="infoBlock" id="infoBlock" size='l'>
					<Card mode="plain" key="last_game">
						<Group header={<Header mode="primary">Последняя партия</Header>} mode="plain">
							<SimpleCell before={<Icon28CalendarOutline width={24} height={24} />}>
								<InfoRow header="Дата партии">{date}</InfoRow>
							</SimpleCell>
							<SimpleCell before={<Icon24BookmarkOutline width={24} height={24}/>}>
								<InfoRow header="Название партии">{advName}</InfoRow>
							</SimpleCell>
						</Group>
					</Card>
					<Card mode="plain">
						<Group header={<Header mode="primary">Приоритет</Header>} mode="plain">
							<SimpleCell before={<Icon28CrownOutline width={24} height={24} />}>
								<InfoRow>{prio}</InfoRow>
							</SimpleCell>
						</Group>
					</Card>
				</CardGrid>
			</Group>
		);
	}


	useEffect(() => {
		async function fetchData() {
			const data = await axios.get(GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {
				return resp.data
			})
			setCharacters(data.chars)
			setDate(data.date)
			setAdvName(data.adv_name)
			setPrio(data.prio)
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
		}
		fetchData()
	}, []);

	return (
		<Panel nav='campaign' key={campaignName}>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
			{
				fetchedUser &&
				<Group>
					<SplitLayout popout={popout}>
						<SplitCol>
							{date && prio && createInfo(date, prio)}
							<Header mode="secondary">Ваши персонажи</Header>
							<Group mode="plain">
								<Div className="not4mob">
									<CardGrid size="m">
										{characters && characters.map((elem) => createCard(elem))}
									</CardGrid>
								</Div>
								<Div className="formob">
									<CardGrid size="l">
										{characters && characters.map((elem) => createCard(elem))}
									</CardGrid>
								</Div>
							</Group>
						</SplitCol>
					</SplitLayout>
				</Group>
			}
		</Panel>
	)
};

export default CampaignPanel;
