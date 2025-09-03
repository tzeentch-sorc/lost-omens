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

import '../../../common/css/CampaignPanel.css';
import EmptyCampaignPanel from '../../../common/components/EmptyCampaignPanel.js';
import NoCharsPage from '../../../common/components/NOCharsPage.js';
import RGMastersInfoSettings from '../export_settings/RGMastersInfoSettings.js'
import { RGArticleLink, RGArticleImage, RGNoCharsCaption, 
	RGNoCharsDescription, CommonNoCharsBody, VKToken } from '../../../../consts.js'


const RGCampaignPanel = ({ fetchedUser }) => {
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [masters, setMasters] = useState([]);

	useEffect(() => {
		async function fetchData() {

			const masterData = await RGMastersInfoSettings.getQueryAll();
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
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1){
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters} 
			ArticleLink={RGArticleLink} articleImage={RGArticleImage} caption={RGNoCharsCaption}
			 description={RGNoCharsDescription} body={CommonNoCharsBody} />
		)
	} else if (masters.length < 1){
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} 
};

export default RGCampaignPanel;
