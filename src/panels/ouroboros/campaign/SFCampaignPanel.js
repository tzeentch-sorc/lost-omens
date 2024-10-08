import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div

} from '@vkontakte/vkui';

import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './SFCampaignPanel.css'
import SFCharacterInfoCard from './SFInfoCard.js';
import EmptyCampaignPanel from '../../common/EmptyCampaignPanel.js';
import SFNoCharsPage from './SFNoCharsPage.js';
import CharUpdateAlert from '../../common/CharUpdateAlert.js';
import SFCharCard from './SFCharCard.js';
import SFPlayerInfoSettings from '../export_settings/SFPlayerInfoSettings.js'

const SFCampaignPanel = ({ fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [prio, setPrio] = useState(-1) // -1 => loading
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [isDisplayed, setIsDisplayed] = useState(false);

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.name}
				formLink='https://forms.gle/CgVTL2qUVctKja4R7'
				navLink='/char/ouroboros'
				closeMethod={() => setPopout(null)}
			/>
		);
	};

	const openAlert = (element) => {
		if (element.lvl_up) {
			openAction(element)
		} else {
			params.set('CharName', element.name);
			setParams(params);
			routeNavigator.push('/char/ouroboros', { keepSearchParams: true });
		}
	}

	function createCard(elem) {
		return (
			<SFCharCard element={elem} key={elem.name + "_sf_card"} openAction={() => openAlert(elem)} />
		);
	}

	useEffect(() => {
		async function fetchData() {
			const prioData = await SFPlayerInfoSettings.getQueryAll();
			const data = prioData.filter(elem => { return elem.id == ("vk.com/" + fetchedUser.screen_name) });
			console.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true,
			})));
			if (data.length > 0) {
				data[0].prio!="" && setPrio(data[0].prio);
			} else {
				setPrio(-2); // -2 => no character
			}
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => {setPopout(null); setIsDisplayed(true);}, 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (characters.length < 1 && prio != -1) {
		//no chars found
		return (
			<SFNoCharsPage user={fetchedUser} campaignName={campaignName} />
		)
	} else if (characters.length < 1 && prio == -1) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} else {
		//loaded chars
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>
					{campaignName}
				</PanelHeader>
				{fetchedUser &&
					<Group mode="plain">
						<SplitLayout popout={popout}>
							{isDisplayed &&
								<SplitCol>
									{prio && <SFCharacterInfoCard prio={prio} />}
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