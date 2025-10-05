import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div, Button, Spacing
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';

import '../../common/css/CampaignPanel.css';
import LOInfoCard from './LOInfoCard.js';
import CharUpdateAlert from '../../common/components/CharUpdateAlert.js';
import EmptyCampaignPanel from '../../common/components/EmptyCampaignPanel.js';
import LOCharCard from './LOCharCard.js';
import NoCharsPage from '../../common/components/NOCharsPage.js';
import LOPlayerInfoSettings from '../export_settings/LOPlayerInfoSettings.js'
import LOMastersInfoSettings from '../export_settings/LOMastersInfoSettings.js'
import LOPriorities from './LOPriorities.js';

import { getVkUserUrl } from '../../../util/VKUserURL.js';
import * as logger from '../../../util/Logger.js';

import {
	FormPreEnter, LOLvlupLink, LOLvlupChar, LOLvlupPlayer, LOLvlupChoice,
	LOLvlupLevel, LOCharacter, LOBulletinLink,
	MastersText
} from '../../../consts.js';
import {
	LOArticleLink, LOArticleImage, LONoCharsCaption,
	LONoCharsDescription, CommonNoCharsBody, VKToken, MOCKUP_FETCHED_USER
} from '../../../consts.js';
import MastersGroup from '../../common/components/MastersGroup.js';
import Marquee from '../../common/components/Marquee.js';

const LOCampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("Хроника утеряна")
	const [advName, setAdvName] = useState("Неизвестное приключение")
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner />)
	const [priorities, setPriorities] = useState([]);

	const [masters, setMasters] = useState([]);

	function createPreEnteredLink(playerName, charName, level, link) {
		var newLink = link + FormPreEnter +
			LOLvlupPlayer + `${playerName?.split(" ")?.[0] ?? ''} ${playerName?.split(" ")?.[1]?.charAt(0) ?? ''}`.trim() +
			LOLvlupChar + charName +
			//LOLvlupChoice  + "Выборы на повышении" +
			LOLvlupLevel + level;
		return newLink;
	}

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.name}
				formLink={createPreEnteredLink(element.player, element.name, parseInt(element.lvl, 10) + 1, LOLvlupLink)}
				navLink={LOCharacter}
				closeMethod={() => setPopout(null)}
			/>
		);
	};

	const openAlert = (element) => {
		if (element.lvl_up) {
			openAction(element);
		} else {
			params.set('Player', element.player);
			params.set('CharName', element.name);
			setParams(params);
			logger.log("params: ", params);
			routeNavigator.push(LOCharacter, { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<LOCharCard element={element} key={element.name + "_lo_card"} openAction={() => { openAlert(element) }} />
		);
	}

	useEffect(() => {
		async function fetchData() {
			const prioData = await LOPlayerInfoSettings.getQueryAll();
			setPriorities(prioData.map(elem => ({
				player: elem.player,
				char_name: elem.char_name,
				prio: elem.prio,
				lvl: elem.lvl
			})).sort((a, b) => b.prio - a.prio));
			logger.log("prioData: ", prioData);

			const data = prioData.filter(elem => {
				return getVkUserUrl(elem, "LO", fetchedUser)
			});
			logger.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				player: `${elem.player?.split(" ")?.[0] ?? ''} ${elem.player?.split(" ")?.[1]?.charAt(0) ?? ''}`.trim(),
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true,
				type: elem.char_class,
				race: elem.race
			})));
			if (data.length > 0) {
				data[0].adv_date != "" && setDate(data[0].adv_date);
				data[0].adv != "" && setAdvName(data[0].adv);
				data[0].prio != "" && setPrio(data[0].prio);
			} else {
				setPrio(-2);
			}

			const masterData = await LOMastersInfoSettings.getQueryAll();
			const userIds = masterData.map(elem => elem.id).join(', ');
			logger.log("masterData: ", masterData);
			logger.log("userIds: ", userIds);
			if (window.location.hostname === 'localhost') {
				setMasters([MOCKUP_FETCHED_USER]);
			} else {
				const users = await bridge
					.send('VKWebAppCallAPIMethod', {
						method: 'users.get',
						params: {
							user_ids: userIds,
							v: '5.131',
							fields: 'screen_name, photo_200',
							access_token: VKToken
						}
					}).then(resp => { return resp.response });

				setMasters(users);
			}
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1 && characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={LOArticleLink} articleImage={LOArticleImage} caption={LONoCharsCaption}
				description={LONoCharsDescription} body={CommonNoCharsBody} />
		)
	} else if ((characters.length < 1 && prio == -1) || masters.length < 1) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} else {
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>
					<Marquee text={campaignName} speed={5} repeat={2} rightPadding={70} />
				</PanelHeader>
				{
					fetchedUser &&
					<>
						<MastersGroup masters={masters} text={MastersText} />
						<Group mode='card'>
							<SplitLayout>
								<SplitCol>
									{date && prio && advName &&
										<Group header={<Header size="s">Информация игрока</Header>} mode="plain" padding='s'>
											<LOInfoCard date={date} prio={prio} adventure={advName} />
											<Spacing size={4} />
											<Div style={{ paddingLeft: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
												<LOPriorities setPopout={setPopout} priorities={priorities} appearance='neutral' />
												<Button stretched appearance="negative" size="l" onClick={() => { window.open(LOBulletinLink, "_blank") }}>Доска Авроры</Button>
											</Div>
										</Group>
									}
									<Header size="s">Ваши персонажи</Header>
									<Group mode="plain">
										<Div className="not4mob">
											<CardGrid size="m" style={{ cursor: 'pointer' }}>
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
								{popout}
							</SplitLayout>
						</Group>
					</>
				}
			</Panel>
		)
	}
};

export default LOCampaignPanel;
