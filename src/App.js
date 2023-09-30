import React, { useState, useEffect } from 'react';
import bridge, { EGetLaunchParamsResponseLanguages } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Snackbar, Gradient } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro.js'

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
}

const STORAGE_KEYS = {
	STATUS: 'status'
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSeenIntro, setSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(false);

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
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS)
			})
			const data = {};
			storageData.keys.forEach(({ key, value }) => {
				try {
					data[key] = value ? JSON.parse(value) : {};
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].seenIntro) {
								setActivePanel(ROUTES.HOME);
								setSeenIntro(true);
							}
							break;
						default: break;
					}
				} catch (err) {
					setSnackbar(<Snackbar
						layout='vertical'
						onClose={() => setSnackbar(null)}
						duration={900}
					>
						Failed to get data from storage.
					</Snackbar>)
				}
			});
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	const viewIntro = async function () {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({ seenIntro: true }) //TODO true
			})
			go(ROUTES.HOME)
		}
		catch (err) {
			setSnackbar(<Snackbar
				layout='vertical'
				onClose={() => setSnackbar(null)}
				duration={900}
			>
				Failed to get data from storage.
				{err}
			</Snackbar>)
		}
	}

	//TODO fix bug when it does not get user when going back to init page
	const initialState = async function () {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({ seenIntro: false }) //TODO true
			})
			go(ROUTES.INTRO)
		}
		catch (err) {
			setSnackbar(<Snackbar
				layout='vertical'
				onClose={() => setSnackbar(null)}
				duration={900}
			>
				Failed to get data from storage.
				{err}
			</Snackbar>)
		}
	}

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel} >
								<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={initialState} snackbarErr={snackbar} />
								<Intro id={ROUTES.INTRO} go={viewIntro} snackbarErr={snackbar} fetchedUser={fetchedUser} seenIntro={userSeenIntro} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
