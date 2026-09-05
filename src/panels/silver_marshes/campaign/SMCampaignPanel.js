import React from 'react';
import { Button } from '@vkontakte/vkui';

import CampaignPanel from '../../common/components/CampaignPanel.js';
import dndClassIcons from '../../common/custom_icons/DNDClassIcons/index.js';
import SMPlayerInfoSettings from '../export_settings/SMPlayerInfoSettings.js'
import SMMastersInfoSettings from '../export_settings/SMMastersInfoSettings.js'

import {
	SMCharacter, SMCreateLink, SMSite,
	SMArticleLink, SMArticleImage, SMNoCharsCaption, SMNoCharsDescription
} from '../../../consts.js';

const campaign = {
	key: 'SM',
	characterRoute: SMCharacter,
	playerInfoSettings: SMPlayerInfoSettings,
	mastersInfoSettings: SMMastersInfoSettings,
	classIcons: dndClassIcons,
	prioritiesText: 'Открыть список приоритетов',
	extraButton: { text: 'Наш сайт', link: SMSite },
	noChars: {
		articleLink: SMArticleLink,
		articleImage: SMArticleImage,
		caption: SMNoCharsCaption,
		description: SMNoCharsDescription,
		action: (
			<Button
				size="m"
				appearance="positive"
				onClick={() => window.open(SMCreateLink)}
			>
				Статья о создании персонажа
			</Button>),
	},
};

const SMCampaignPanel = ({ fetchedUser }) => (
	<CampaignPanel fetchedUser={fetchedUser} campaign={campaign} />
);

export default SMCampaignPanel;
