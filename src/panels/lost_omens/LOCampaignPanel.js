import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div

} from '@vkontakte/vkui';
import { GOOGLE_SCRIPTS_BASE_URL } from '../../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './LOCampaignPanel.css'
import LOInfoCard from './LOInfoCard.js';
import CharUpdateAlert from '../CharUpdateAlert.js';
import EmptyCampaignPanel from '../EmptyCampaignPanel.js';
import LOCharCard from './LOCharCard.js';
import LONoCharsPage from './LONoCharsPage.js';

const LOCampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("Хроника утеряна")
	const [advName, setAdvName] = useState("Неизвестное приключение")
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.name}
				formLink='https://docs.google.com/forms/d/e/1FAIpQLSf4rQ2XSS3zMYp8NLPlh1Oj7eqAMCWFbO7iyW6XdY-i-Aa4dA/viewform'
				navLink='/char/lost_omens'
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
			routeNavigator.push('/char/lost_omens', { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<LOCharCard element={element} key={element.name + "_lo_card"} openAction={() => {openAlert(element)}} />
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

	if (characters.length < 1 && prio != -1) {
		//no chars found
		return (
			<LONoCharsPage user={fetchedUser} campaignName={campaignName} />
		)
	} else if (characters.length < 1 && prio == -1) {
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
					<Group>
						<SplitLayout popout={popout}>
							<SplitCol>
								{date && prio && advName &&
									<LOInfoCard date={date} prio={prio} adventure={advName} />
								}
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
	}
};

export default LOCampaignPanel;
