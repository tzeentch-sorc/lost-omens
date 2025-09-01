import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div, Button, Spacing
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './HGCampaignPanel.css'
//import HGInfoCard from './HGInfoCard.js';
import EmptyCampaignPanel from '../../common/EmptyCampaignPanel.js';
//import HGCharCard from './HGCharCard.js';
import HGNoCharsPage from './HGNoCharsPage.js';
//import HGPlayerInfoSettings from '../export_settings/HGPlayerInfoSettings.js'
//import HGPriorities from './HGPriorities.js';
//import HGCharUpdateAlert from './HGCharUpdateAlert.js';
import { getVkUserUrl } from '../../../util/utilFunc.js';

const HGCampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("Хроника утеряна")
	const [advName, setAdvName] = useState("Неизвестное приключение")
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [priorities, setPriorities] = useState([]);

	/*
	const openAction = (element) => {
		setPopout(
			<HGCharUpdateAlert
				charName={element.name}
				navLink='/char/golarion_heroes'
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
			//console.log(params);
			routeNavigator.push('/char/golarion_heroes', { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<HGCharCard element={element} key={element.name + "_hg_card"} openAction={() => { openAlert(element) }} />
		);
	}
	*/

	/*useEffect(() => {
		async function fetchData() {
			const prioData = await HGPlayerInfoSettings.getQueryAll();
			setPriorities(prioData.map(elem => ({
				player: elem.player,
				char_name: elem.char_name,
				prio: elem.prio,
				lvl: elem.lvl
			})).sort((a, b) => b.prio - a.prio));
			//console.log(prioData);

			const data = prioData.filter(elem => {
				return elem.id == ("vk.com/" + fetchedUser.screen_name) || elem.id == ("vk.com/id" + fetchedUser.id)
			});
			console.log("data: ", data);
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

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);*/

	//if (characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<HGNoCharsPage user={fetchedUser} campaignName={campaignName} />
		);
	/*} else if (characters.length < 1 && prio == -1) {
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
										<HGInfoCard date={date} prio={prio} adventure={advName} />
										<Spacing size={4} />
										<HGPriorities setPopout={setPopout} priorities={priorities} />
									</Group>
								}
								<Header mode="secondary">Ваши персонажи</Header>
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
						</SplitLayout>
					</Group>
				}
			</Panel>
		)
	}*/
};

export default HGCampaignPanel;
