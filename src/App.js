import React, { useState, useEffect } from 'react';
import bridge, { EGetLaunchParamsResponseLanguages } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, Snackbar, Root } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';


import '@vkontakte/vkui/dist/vkui.css';

import CampaignPanel from './panels/CampaignPanel.js';
import Intro from './panels/Intro.js';
import Character from './panels/Character.js';


const ROUTES = {
	CAMPAIGN: 'campaign',
	INTRO: 'intro',
	CHAR: 'char'
}

// const STORAGE_KEYS = {
// 	STATUS: 'status'
// }

const App = (router) => {

	const activePanel = useGetPanelForView('default');
	const { view: activeView } = useActiveVkuiLocation();

	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	//const [userSeenIntro, setSeenIntro] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const uid = await bridge.send('VKWebAppGetLaunchParams');
			const user = await bridge
				.send('VKWebAppCallAPIMethod', {
					method: 'users.get',
					params: {
						user_ids: uid.vk_user_id,
						v: '5.131',
						fields: 'screen_name, photo_200',
						access_token: '3d1cfde53d1cfde53d1cfde5923e09382633d1c3d1cfde55808b77a146aa66ab68e156d'
					}
				}).then(resp => { return resp.response[0] });
			// const storageData = await bridge.send('VKWebAppStorageGet', {
			// 	keys: Object.values(STORAGE_KEYS)
			// })
			// const data = {};
			// storageData.keys.forEach(({ key, value }) => {
			// 	try {
			// 		data[key] = value ? JSON.parse(value) : {};
			// 		switch (key) {
			// 			case STORAGE_KEYS.STATUS:
			// 				if (data[key].seenIntro) {
			// 					setActivePanel(ROUTES.HOME);
			// 					setSeenIntro(true);
			// 				}
			// 				break;
			// 			default: break;
			// 		}
			// 	} catch (err) {
			// 		setSnackbar(<Snackbar
			// 			layout='vertical'
			// 			onClose={() => setSnackbar(null)}
			// 			duration={900}
			// 		>
			// 			{err}
			// 		</Snackbar>)
			// 	}
			// });
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	return (

		<Root popout={popout} activeView={activeView}>
			<View activePanel={activePanel} nav='default'>
				<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} /*seenIntro={userSeenIntro}*/ />
				<CampaignPanel id={ROUTES.CAMPAIGN} fetchedUser={fetchedUser} />
				<Character id={ROUTES.CHAR} />
			</View>
		</Root>
	);
}

export default App;

export const GOOGLE_SCRIPTS_BASE_URL = 'https://script.google.com/macros/s/AKfycbyHwbc7G8ZBzv4wD-dRuLQNLcjibe3MSNd_a7tQUEVvmdV9-mcl46sR64otlmZH1V7IcQ/exec'