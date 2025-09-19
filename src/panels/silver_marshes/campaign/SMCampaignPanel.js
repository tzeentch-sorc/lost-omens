import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div,
	Spacing, Button

} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';

import '../../common/css/CampaignPanel.css';
import SMInfoCard from './SMInfoCard.js';
import SMCharUpdateAlert from './SMCharUpdateAlert.js';
import EmptyCampaignPanel from '../../common/components/EmptyCampaignPanel.js';
import SMCharCard from './SMCharCard.js';
import NoCharsPage from '../../common/components/NOCharsPage.js';
import SMPlayerInfoSettings from '../export_settings/SMPlayerInfoSettings.js'
import SMMastersInfoSettings from '../export_settings/SMMastersInfoSettings.js'
import SMPriorities from './SMPriorities.js';

import { SMCharacter, SMCreateLink } from '../../../consts.js';
import { getVkUserUrl } from '../../../util/VKUserURL.js';
import * as logger from '../../../util/Logger.js';
import {
	SMArticleLink, SMArticleImage, SMNoCharsCaption,
	SMNoCharsDescription, CommonNoCharsBody, VKToken
} from '../../../consts.js'

const SMCampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("Хроника утеряна")
	const [advName, setAdvName] = useState("Неизвестное приключение")
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [priorities, setPriorities] = useState([]);
	const [masters, setMasters] = useState([]);

	const openAction = (element) => {
		setPopout(
			<SMCharUpdateAlert
				charName={element.name}
				navLink={SMCharacter}
				closeMethod={() => setPopout(null)}
			/>
		);
	};

	const openAlert = (element) => {
		if (element.lvl_up) {
			openAction(element);
		} else {
			params.set('CharName', element.name);
			setParams(params);
			routeNavigator.push(SMCharacter, { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<SMCharCard element={element} key={element.name + "_sm_card"} openAction={() => { openAlert(element) }} />
		);
	}

	useEffect(() => {
		async function fetchData() {
			const prioData = await SMPlayerInfoSettings.getQueryAll();
			setPriorities(prioData.map(elem => ({
				player: elem.player,
				char_name: elem.char_name,
				prio: elem.prio,
				lvl: elem.lvl
			})).sort((a, b) => b.prio - a.prio));
			logger.log(prioData);
			const data = prioData.filter(elem => { return getVkUserUrl(elem, fetchedUser) });
			logger.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
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

			const masterData = await SMMastersInfoSettings.getQueryAll();
			const userIds = masterData.map(elem => elem.id).join(', ');
			logger.log(masterData);
			logger.log(userIds);
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

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1 && characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={SMArticleLink} articleImage={SMArticleImage} caption={SMNoCharsCaption}
				description={SMNoCharsDescription} body={CommonNoCharsBody}
				action={
					<Button
						size="m"
						appearance="positive"
						onClick={() => window.open(SMCreateLink)}
					>
						Статья о создании персонажа
					</Button>} />
		)
	} else if (characters.length < 1 || (characters.length < 1 && prio == -1)) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} else {
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
				{
					fetchedUser &&
					<Group mode='card'>
						<SplitLayout popout={popout}>
							<SplitCol>
								{date && prio && advName &&
									<Group header={<Header mode="secondary">Информация игрока</Header>} mode="plain" padding='s'>
										<SMInfoCard date={date} prio={prio} adventure={advName} />
										<Spacing size={4} />
										<SMPriorities setPopout={setPopout} priorities={priorities} />
									</Group>
								}
								<Header mode="secondary">Ваши персонажи</Header>
								<Group mode="plain">
									<Div className="not4mob">
										<CardGrid size="m" style={{ cursor: 'pointer' }} >
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
	}
};

export default SMCampaignPanel;
