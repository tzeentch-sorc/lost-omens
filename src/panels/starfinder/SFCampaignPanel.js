import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header,
	Button, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Card, SimpleCell, RichCell, Alert,
	Counter, Div, Placeholder, Avatar,
	Separator, ContentCard, HorizontalScroll, HorizontalCell

} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import {
	Icon28CrownOutline, Icon24UserOutline,
	Icon56UserAddOutline, Icon28UserOutgoingOutline
} from '@vkontakte/icons'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './SFCampaignPanel.css'
const SFCampaignPanel = ({ fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [isDisplayed, setIsDisplayed] = useState(false);
	const [masters, setMasters] = useState([]);

	const closePopout = () => {
		setPopout(null);
	};

	const renderAction = ({ mode, ...restProps }) => {
		return <Button mode={mode === 'cancel' ? 'secondary' : 'primary'} size="m" {...restProps} />;
	};

	const openAction = (element) => {
		setPopout(
			<Alert
				actions={[
					{
						title: 'Пропустить',
						mode: 'cancel',
						action: () => {
							params.set('CharName', element.full_name);
							setParams(params);
							routeNavigator.push('/char/starfinder', { keepSearchParams: true });
						},
					},
					{
						title: 'Повысить',
						mode: 'destructive',
						action: () => {
							window.open('https://forms.gle/CgVTL2qUVctKja4R7', "_blank")
						},
					}
				]}
				onClose={closePopout}
				renderAction={renderAction}
				header={element.name + ' нуждается в повышении уровня!'}
				text="Можно повысить уровень прямо сейчас или продолжить работу без повышения"
			/>,
		);
	};


	function createCard(element) {
		return (
			<Card mode="shadow" size="m" key={element.name + "_sf_card"}
				onClick={() => {
					if (element.lvl_up == 'TRUE') {
						openAction(element);
					} else {
						params.set('CharName', element.full_name);
						setParams(params);
						routeNavigator.push('/char/starfinder', { keepSearchParams: true });
					}

				}}>
				<RichCell
					key={element.name}
					id={element.name}
					before={<Icon24UserOutline width={48} height={48} color='#008cff' />}
					text={element.lvl + " ур."}
					after={element.lvl_up == 'TRUE' ?
						<Counter size="s" mode="primary">
							<Icon28UserOutgoingOutline width={16} height={16} />
						</Counter> : null}
					afterCaption={element.lvl_up == 'TRUE' ? "Доступно повышение" : ""}
				>
					{element.name}
				</RichCell>
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

	function createUserRef(user) {
		return (
			<HorizontalCell onClick={() => { window.open('https://vk.com/im?sel=' + user.id) }} key={user.id} size="s" header={user.first_name}>
				<Avatar size={56} src={user.photo_200} />
			</HorizontalCell>
		)
	}

	useEffect(() => {
		async function fetchData() {
			const data = await axios.get(SF_GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {//TODO id306494424 + fetchedUser.screen_name
				return resp.data
			})
			const users = await bridge
				.send('VKWebAppCallAPIMethod', {
					method: 'users.get',
					params: {
						user_ids: 'faa_magic, rizaevns, iaroslavvvv, ferrafenex, never_tell_never',
						v: '5.131',
						fields: 'screen_name, photo_200',
						access_token: '3d1cfde53d1cfde53d1cfde5923e09382633d1c3d1cfde55808b77a146aa66ab68e156d'
					}
				}).then(resp => { return resp.response });

			setMasters(users);
			setCharacters(data.chars)
			setPrio(data.prio)
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => { setPopout(null); setIsDisplayed(true); }, 1000)
		}
		fetchData().catch(console.error);
	}, []);

	if (characters.length < 1 && prio != -1) {
		//no chars found
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
				{
					fetchedUser &&
					<Group mode="plain">
						<SplitLayout popout={popout}>
							{isDisplayed &&
								<SplitCol>
									<Group mode="plain">
										<Group header={<Header mode='secondary'>О мегакампании</Header>}>
											<CardGrid size="l">
												<ContentCard
													onClick={() => { window.open('https://vk.com/@geekmo-ouroboros-invitation') }}
													subtitle="Статья о мегакампании"
													header='Добро пожаловать на станцию «Уроборос»!'
													text='Введение в систему и мегакампанию'
													src='https://sun9-27.userapi.com/impg/U72Npb3EfzT-0av7QwY-QSjTWDQQrVTFZkV9bA/zgigXh3DtTQ.jpg?size=1280x720&quality=95&sign=71fe8128d8bcc4598df9b0c524269dbe&type=album'
													maxHeight={150}
												/>
											</CardGrid>
										</Group>
										<Group header={
											<Header
												mode='secondary'
												subtitle="Этим людям, можно написать, если остались вопросы"
											>
												Мастера
											</Header>}>
											<HorizontalScroll>
												<div style={{ display: 'flex' }}>
													{masters && masters.map((masterRef) => createUserRef(masterRef))}
												</div>
											</HorizontalScroll>
										</Group>
										<Group>
											<Placeholder
												icon={<Icon56UserAddOutline />}
												header="Создание персонажа"
												action={
													<Button
														size="m"
														appearance="positive"
														onClick={() => window.open('https://forms.gle/DfWmZwPJ7vYA5Yhg7', "_blank")}
													>
														Создать
													</Button>
												}>
												<Div>
													Кажется, у тебя еще нет персонажа в мегакампании Уробороса!
												</Div>
											</Placeholder>
										</Group>
									</Group>
								</SplitCol>
							}
						</SplitLayout>
					</Group>
				}
			</Panel>
		)
	} else if (characters.length < 1 && prio == -1) {
		//while loading
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
				{
					fetchedUser &&
					<Group mode="plain">
						<SplitLayout popout={popout} />
					</Group>
				}
			</Panel>
		)
	} else {
		//loaded chars
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
				{
					fetchedUser &&
					<Group mode="plain">
						<SplitLayout popout={popout}>
							{isDisplayed &&
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
							}
						</SplitLayout>
					</Group>
				}
			</Panel>
		)
	}
};

export default SFCampaignPanel;

export const SF_GOOGLE_SCRIPTS_BASE_URL = "https://script.google.com/macros/s/AKfycbwhqD4nmaw7eE_kYJrnvxAhdtOj1kse6iazqU9uWquPDUm3Rh6ct_P0banY9zXiXxzuew/exec"
