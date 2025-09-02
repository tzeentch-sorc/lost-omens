import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div, Button

} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../../common/css/CampaignPanel.css';
import SFCharacterInfoCard from './SFInfoCard.js';
import EmptyCampaignPanel from '../../common/components/EmptyCampaignPanel.js';
import NoCharsPage from '../../common/components/NOCharsPage.js';
import CharUpdateAlert from '../../common/components/CharUpdateAlert.js';
import SFCharCard from './SFCharCard.js';
import SFPlayerInfoSettings from '../export_settings/SFPlayerInfoSettings.js'
import SFMastersInfoSettings from '../export_settings/SFMastersInfoSettings.js'

import { SFCharacter, SFLvlupLink, SFCreateLink } from '../../../consts.js'
import { getVkUserUrl } from '../../../util/VKUserURL.js';
import {
	SFArticleLink, SFArticleImage, SFNoCharsCaption,
	SFNoCharsDescription, SFNoCharsBody, VKToken
} from '../../../consts.js'

const SFCampaignPanel = ({ fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [prio, setPrio] = useState(-1) // -1 => loading
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [isDisplayed, setIsDisplayed] = useState(false);

	const [masters, setMasters] = useState([]);

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.name}
				formLink={SFLvlupLink}
				navLink={SFCharacter}
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
			routeNavigator.push(SFCharacter, { keepSearchParams: true });
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
			const data = prioData.filter(elem => { return getVkUserUrl(elem, fetchedUser) });
			console.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true,
			})));
			if (data.length > 0) {
				data[0].prio != "" && setPrio(data[0].prio);
			} else {
				setPrio(-2); // -2 => no character
			}

			const masterData = await SFMastersInfoSettings.getQueryAll();
			const userIds = masterData.map(elem => elem.id).join(', ');
			//console.log(masterData);
			//console.log(userIds);
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
			setTimeout(() => { setPopout(null); setIsDisplayed(true); }, 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1 && characters.length < 1 && prio != -1) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={SFArticleLink} articleImage={SFArticleImage} caption={SFNoCharsCaption}
				description={SFNoCharsDescription} body={SFNoCharsBody}
				action={<Button
					size="m"
					appearance="positive"
					onClick={() => window.open(SFCreateLink, "_blank")}
				>
					Создать
				</Button>} />
		)
	} else if (characters.length < 1 && characters.length < 1 && prio == -1) {
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
					<Group mode="card">
						<SplitLayout popout={popout}>
							{isDisplayed &&
								<SplitCol>
									{prio && <SFCharacterInfoCard prio={prio} />}
									<Header mode="secondary">Ваши персонажи</Header>
									<Group mode="plain">
										<Div className="not4mob" style={{ cursor: 'pointer' }}>
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