import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View, ScreenSpinner, Root
} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';


import '@vkontakte/vkui/dist/vkui.css';

import { VKToken, MOCKUP_FETCHED_USER } from './consts.js';

import Intro from './panels/Intro.js';
import Form from './panels/form/Form.js';
import LOCampaignPanel from './panels/megas/lost_omens/campaign/LOCampaignPanel.js';
import LOCharacter from './panels/megas/lost_omens/character/LOCharacter.js';
import HGCampaignPanel from './panels/megas/golarion_heroes/campaign/HGCampaignPanel.js';
//import HGCharacter from './panels/megas/golarion_heroes/character/HGCharacter.js';
import SFCampaignPanel from './panels/megas/ouroboros/campaign/SFCampaignPanel.js';
import SFCharacter from './panels/megas/ouroboros/character/SFCharacter.js';
import SMCampaignPanel from './panels/megas/silver_marshes/campaign/SMCampaignPanel.js';
import SMCharacter from './panels/megas/silver_marshes/character/SMCharacter.js';
import BWCampaignPanel from './panels/megas/blue_waters/campaign/BWCampaignPanel.js';
import VUCampaignPanel from './panels/megas/voux_umbra/campaign/VUCampaignPanel.js';
import RGCampaignPanel from './panels/megas/rogues_gallery/campaign/RGCampaignPanel.js';
import RGCharacter from './panels/megas/rogues_gallery/character/RGCharacter.js';
import RGRequests from './panels/megas/rogues_gallery/requests/RGRequests.js';

const ROUTES = {
	CAMPAIGN: 'campaign',
	INTRO: 'intro',
	CHAR: 'char',
	FORM: 'enter',
	REQUESTS: 'requests'
}

const App = (router) => {

	const { view: activeView, panel: activePanel } = useActiveVkuiLocation();

	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner />);

	useEffect(() => {
		async function fetchData() {
			if (window.location.hostname === 'localhost') {
				setUser(MOCKUP_FETCHED_USER);
				setPopout(null);
				return;
			}
			const uid = await bridge.send('VKWebAppGetLaunchParams');
			const user = await bridge
				.send('VKWebAppCallAPIMethod', {
					method: 'users.get',
					params: {
						user_ids: uid.vk_user_id,
						v: '5.131',
						fields: 'screen_name, photo_200',
						access_token:  VKToken
					}
				}).then(resp => { return resp.response[0] });
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	return (
		<Root popout={popout} activeView={activeView} className='gradient-app'>
			<View activePanel={activePanel} nav='default'>
				<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} />
				<Form id={ROUTES.FORM} fetchedUser={fetchedUser}/>
			</View>
			<View activePanel={activePanel} nav='lost_omens'>
				<LOCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				<LOCharacter id={ROUTES.CHAR} />
			</View>
			<View activePanel={activePanel} nav='golarion_heroes'>
				<HGCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				{/*<HGCharacter id={ROUTES.CHAR}/>*/}
			</View>
			<View activePanel={activePanel} nav='ouroboros'>
				<SFCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				<SFCharacter id={ROUTES.CHAR} />
			</View>
			<View activePanel={activePanel} nav='silver_marshes'>
				<SMCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				<SMCharacter id={ROUTES.CHAR} />
			</View>
			<View activePanel={activePanel} nav='blue_waters'>
				<BWCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
			</View>
			<View activePanel={activePanel} nav='voux_umbra'>
				<VUCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
			</View>
			<View activePanel={activePanel} nav='rogues_gallery'>
				<RGCampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				<RGCharacter id={ROUTES.CHAR} />
				<RGRequests id={ROUTES.REQUESTS} />
			</View>
		</Root>
	);
}

export default App;
