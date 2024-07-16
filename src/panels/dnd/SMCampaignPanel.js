import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div

} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './SMCampaignPanel.css'
import SMInfoCard from './SMInfoCard.js';
import CharUpdateAlert from '../CharUpdateAlert.js';
import EmptyCampaignPanel from '../EmptyCampaignPanel.js';
import SMCharCard from './SMCharCard.js';
import SMNoCharsPage from './SMNoCharsPage.js';
import SMPlayerInfoSettings from './export_settings/SMPlayerInfoSettings.js'

const SMCampaignPanel = ({ fetchedUser }) => {
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
				navLink='/char/silver_marshes'
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
			routeNavigator.push('/char/silver_marshes', { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<SMCharCard element={element} key={element.name + "_sm_card"} openAction={() => {openAlert(element)}} />
		);
	}

	useEffect(() => {
		async function fetchData() {
			const data = await SMPlayerInfoSettings.getFilteredQuery("id", "vk.com/id"+ "96607288");//fetchedUser.id);
			console.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true ,
				type: elem.char_class,
				race: elem.race
			})));
			setDate(data[0].adv_date)
			setAdvName(data[0].adv)
			setPrio(data[0].prio)
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData()
	}, []);
	console.log(characters);
	if (characters.length == 1 && !characters[0].name) {
		//no chars found
		return (
			<SMNoCharsPage user={fetchedUser} campaignName={campaignName} />
		)
	} else if (characters.length == 0) {
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
									<SMInfoCard date={date} prio={prio} adventure={advName} />
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

export default SMCampaignPanel;
