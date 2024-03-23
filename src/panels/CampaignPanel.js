import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, Badge, ModalRoot, ModalCard,
	ButtonGroup

} from '@vkontakte/vkui';

import {
	Icon28CalendarOutline, Icon28CrownOutline, Icon24UserOutline,
	Icon24StatisticsOutline, Icon24InfoCircleOutline
} from '@vkontakte/icons'
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

	const [activeModal, setActiveModal] = useState(null);
	const [modalHistory, setModalHistory] = useState([]);

	const changeActiveModal = (activeModal) => {
		activeModal = activeModal || null;
		let localModalHistory = modalHistory ? [...modalHistory] : [];

		if (activeModal === null) {
			localModalHistory = [];
		} else if (modalHistory.indexOf(activeModal) !== -1) {
			localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
		} else {
			localModalHistory.push(activeModal);
		}

		setActiveModal(activeModal);
		setModalHistory(localModalHistory);
	};

	const modalBack = () => {
		changeActiveModal(modalHistory[modalHistory.length - 2]);
	};

	const modal = (
		<ModalRoot activeModal={activeModal} onClose={modalBack}>
			<ModalCard
				id="confirmLvlup"
				onClose={() => changeActiveModal(null)}
				icon={<Icon24StatisticsOutline width={56} height={56} />}
				header="Вашему персонажу необходимо повышение уровня"
				subheader="Теперь вы можете перейти к форме повышения уровня прямо из нашего приложения"
				actions={
					<React.Fragment>
						<ButtonGroup mode="horizontal" gap="m" stretched>
							<Button
								size="l"
								mode="primary"
								stretched
								onClick={()=>window.open('https://docs.google.com/forms/d/e/1FAIpQLSf4rQ2XSS3zMYp8NLPlh1Oj7eqAMCWFbO7iyW6XdY-i-Aa4dA/viewform', "_blank")}
							>
								Повысить уровень
							</Button>
							<Button
								size="l"
								mode="secondary"
								stretched
								onClick={() => {
									//TODO
									params.set('CharName', element.name);
									setParams(params);
									routeNavigator.push('/char', { keepSearchParams: true });
								}}
							>
								Продолжить
							</Button>
						</ButtonGroup>

					</React.Fragment>
				}
			/>
		</ModalRoot>
	);

	function createCard(element) {
		return (
			<SplitLayout modal={modal}>
				<SplitCol>
					<Group mode="plain">
						<CardGrid size="l">
							<Card mode="shadow" size="m">
								<SimpleCell
									key={element.name}
									id={element.name}
									onClick={() => {
										if (element.lvl_up) {
											changeActiveModal("confirmLvlup");
										} else {
											params.set('CharName', element.name);
											setParams(params);
											routeNavigator.push('/char', { keepSearchParams: true });
										}

									}} before={<Icon24UserOutline width={24} height={24} />} badgeAfterTitle={element.lvl_up && <Badge></Badge>}> {element.name}</SimpleCell>

								<SimpleCell before={<Icon24InfoCircleOutline width={24} height={24} />}> {element.race}-{element.type} {element.lvl} уровня</SimpleCell>
							</Card>
						</CardGrid>
					</Group>
				</SplitCol>
			</SplitLayout>
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
