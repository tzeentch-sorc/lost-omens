import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, Badge, Alert, Counter, Div

} from '@vkontakte/vkui';

import {
	Icon28CalendarOutline, Icon28CrownOutline, Icon24UserOutline,
	Icon24StatisticsOutline, Icon24InfoCircleOutline
} from '@vkontakte/icons'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './SFCampaignPanel.css'
const SFCampaignPanel = ({ fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
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
							window.open('https://forms.gle/CgVTL2qUVctKja4R7', "_blank")
						},
					},
					{
						title: 'Пропустить',
						mode: 'cancel',
						action: () => {
							params.set('CharName', element.name);
							setParams(params);
							routeNavigator.push('/char/starfinder', { keepSearchParams: true });
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

			<Card mode="shadow" size="m" key={element.name + "_sf_card"}
				onClick={() => {
					if (element.lvl_up) {
						openAction(element);
					} else {
						params.set('CharName', element.name);
						setParams(params);
						routeNavigator.push('/char/starfinder', { keepSearchParams: true });
					}

				}}>
				<SimpleCell
					key={element.name}
					id={element.name}
					indicator={
						element.lvl_up &&
						<Counter size="m" mode="prominent">
							<Icon24StatisticsOutline width={16} height={16} />
						</Counter>
					}
					before={<Icon24UserOutline width={24} height={24} />}> {element.name}</SimpleCell>

				<SimpleCell before={<Icon24InfoCircleOutline width={24} height={24} />}> {element.lvl} уровня</SimpleCell>
			</Card>

		);
	}

	function createInfo(prio) {
		return (
			<CardGrid key="infoBlock" id="infoBlock" size='l'>
				<Card>
					<Header mode="primary">Приоритет</Header>
					<SimpleCell before={<Icon28CrownOutline width={24} height={24} />}> {prio}</SimpleCell>
				</Card>
			</CardGrid>
		);
	}


	useEffect(() => {
		async function fetchData() {
			const data = await axios.get(SF_GOOGLE_SCRIPTS_BASE_URL + "?id=id306494424").then(resp => {//TODO + fetchedUser.screen_name
				return resp.data
			})
			setCharacters(data.chars)
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
							{prio && createInfo(prio)}
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

export default SFCampaignPanel;

export const SF_GOOGLE_SCRIPTS_BASE_URL = "https://script.google.com/macros/s/AKfycbwhqD4nmaw7eE_kYJrnvxAhdtOj1kse6iazqU9uWquPDUm3Rh6ct_P0banY9zXiXxzuew/exec"
