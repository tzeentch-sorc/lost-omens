import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div,
	Spacing

} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';

import '../../common/css/CampaignPanel.css';
import EmptyCampaignPanel from '../../common/components/EmptyCampaignPanel.js';
import NoCharsPage from '../../common/components/NOCharsPage.js';
import BWMastersInfoSettings from '../export_settings/BWMastersInfoSettings.js'
import {
	BWArticleLink, BWArticleImage, BWNoCharsCaption,
	BWNoCharsDescription, CommonNoCharsBody, VKToken, MOCKUP_FETCHED_USER
} from '../../../consts.js'
import * as logger from '../../../util/Logger.js';

const BWCampaignPanel = ({ fetchedUser }) => {
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');
	const [popout, setPopout] = useState(<ScreenSpinner />)
	const [masters, setMasters] = useState([]);


	useEffect(() => {
		async function fetchData() {

			const masterData = await BWMastersInfoSettings.getQueryAll();
			const userIds = masterData.map(elem => elem.id).join(', ');
			logger.log("masterData: ", masterData);
			logger.log("userIds: ", userIds);
			if (window.location.hostname === 'localhost') {
				setMasters([MOCKUP_FETCHED_USER]);
			} else {
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
			}
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={BWArticleLink} articleImage={BWArticleImage} caption={BWNoCharsCaption}
				description={BWNoCharsDescription} body={CommonNoCharsBody} />
		);
	} else if (masters.length < 1) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	}
};

export default BWCampaignPanel;
