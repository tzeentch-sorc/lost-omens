import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div,
	FixedLayout

} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './SMCampaignPanel.css'
import SMInfoCard from './SMInfoCard.js';
import SMCharUpdateAlert from './SMCharUpdateAlert.js';
import EmptyCampaignPanel from '../../common/EmptyCampaignPanel.js';
import SMCharCard from './SMCharCard.js';
import SMNoCharsPage from './SMNoCharsPage.js';
import SMPlayerInfoSettings from '../export_settings/SMPlayerInfoSettings.js'
import SMPriorities from './SMPriorities.js';

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

	const openAction = (element) => {
		setPopout(
			<SMCharUpdateAlert
				charName={element.name}
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
			//console.log(prioData);

			const data = prioData.filter(elem => { return elem.id == ("vk.com/id" + "160166959")});//fetchedUser.id) });
			console.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true,
				type: elem.char_class,
				race: elem.race
			})));
			if (data.length > 0) {
				setDate(data[0].adv_date);
				setAdvName(data[0].adv);
				setPrio(data[0].prio);
			} else {
				setPrio(-2);
			}

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData()
	}, []);

	if (characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<SMNoCharsPage user={fetchedUser} campaignName={campaignName} />
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
				<FixedLayout filled vertical="bottom">
					<SMPriorities setPopout={setPopout} priorities={priorities} />
				</FixedLayout>

			</Panel>
		)
	}
};

export default SMCampaignPanel;
