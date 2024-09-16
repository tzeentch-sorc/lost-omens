import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div

} from '@vkontakte/vkui';

import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './SFCampaignPanel.css'
import SFCharacterInfoCard from './SFInfoCard';
import EmptyCampaignPanel from '../common/EmptyCampaignPanel';
import SFNoCharsPage from './SFNoCharsPage';
import CharUpdateAlert from '../common/CharUpdateAlert';
import SFCharCard from './SFCharCard';

const SFCampaignPanel = ({ fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [isDisplayed, setIsDisplayed] = useState(false);

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.full_name}
				formLink='https://forms.gle/CgVTL2qUVctKja4R7'
				navLink='/char/ouroboros'
				closeMethod={() => setPopout(null)}
			/>
		);
	};

	const openAlert = (element) => {
		if (element.lvl_up == 'TRUE') {
			openAction(element)
		} else {
			params.set('CharName', element.full_name);
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
			const data = await axios.get(SF_GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {//TODO "id306494424" + fetchedUser.screen_name
				return resp.data
			});

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

export const SF_GOOGLE_SCRIPTS_BASE_URL = "https://script.google.com/macros/s/AKfycbwhqD4nmaw7eE_kYJrnvxAhdtOj1kse6iazqU9uWquPDUm3Rh6ct_P0banY9zXiXxzuew/exec"
