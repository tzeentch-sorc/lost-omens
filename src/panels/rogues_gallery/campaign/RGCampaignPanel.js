import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div

} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';

import '../../common/css/CampaignPanel.css';
import EmptyCampaignPanel from '../../common/components/EmptyCampaignPanel.js';
import NoCharsPage from '../../common/components/NOCharsPage.js';
import RGMastersInfoSettings from '../export_settings/RGMastersInfoSettings.js'
import RGPlayerInfoSettings from '../export_settings/RGPlayerInfoSettings.js'
import { RGCharacter } from '../../../consts.js';
import RGCharUpdateAlert from './RGCharUpdateAlert.js';
import RGCharCard from './RGCharCard.js';
import {
	RGArticleLink, RGArticleImage, RGNoCharsCaption,
	RGNoCharsDescription, CommonNoCharsBody, VKToken,
	MastersText
} from '../../../consts.js'

import { getVkUserUrl } from '../../../util/VKUserURL.js';
import * as logger from '../../../util/Logger.js';
import MastersGroup from '../../common/components/MastersGroup.js';
import Marquee from '../../common/components/Marquee.js';


const RGCampaignPanel = ({ fetchedUser }) => {
	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [masters, setMasters] = useState([]);
	const [prio, setPrio] = useState(-1); // while loading

	const [isDisplayed, setIsDisplayed] = useState(false);
	const [characters, setCharacters] = useState([]);

	const openAction = (element) => {
		setPopout(
			<RGCharUpdateAlert
				charName={element.name}
				navLink={RGCharacter}
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
			routeNavigator.push(RGCharacter, { keepSearchParams: true });
		}
	}

	function createCard(elem) {
		return (
			<RGCharCard element={elem} key={elem.name + "_rg_card"} openAction={() => openAlert(elem)} />
		);
	}

	useEffect(() => {
		async function fetchData() {
			const playerData = await RGPlayerInfoSettings.getQueryAll();
			const data = playerData.filter(elem => { return getVkUserUrl(elem, fetchedUser) });
			logger.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				type: elem.char_class,
				owner: elem.owner,
				lvl_up: elem.lvl_up === "TRUE" ? true : false,
			})));
			if (data.length > 0) {
				data[0].name != "" && setPrio(1); //loaded
			} else {
				setPrio(-2); // -2 => no character
			}

			const masterData = await RGMastersInfoSettings.getQueryAll();
			const userIds = masterData.map(elem => elem.id).join(', ');
			logger.log(masterData);
			logger.log(userIds);
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

	if (masters.length >= 1 && characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={RGArticleLink} articleImage={RGArticleImage} caption={RGNoCharsCaption}
				description={RGNoCharsDescription} body={CommonNoCharsBody} />
		)
	} else if (masters.length < 1 || (characters.length < 1 && prio == -1)) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} else {
		//loaded chars
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>
					<Marquee text={campaignName} speed={5} repeat={2} rightPadding={70} />
				</PanelHeader>
				{fetchedUser &&
					<>
						<MastersGroup masters={masters} text={MastersText} />
						<Group mode="card">
							<SplitLayout popout={popout}>
								{isDisplayed &&
									<SplitCol>
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
					</>
				}
			</Panel>
		)
	}
};

export default RGCampaignPanel;
