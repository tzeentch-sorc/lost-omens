import React from 'react';
import { Button } from '@vkontakte/vkui';

import CampaignPanel from '../../common/components/CampaignPanel.js';
import dndClassIcons from '../../common/custom_icons/DNDClassIcons/index.js';
import RCGPlayerInfoSettings from '../export_settings/RCGPlayerInfoSettings.js'
import RCGMastersInfoSettings from '../export_settings/RCGMastersInfoSettings.js'

import {
	RCGCharacter, RCGCreateLink, RCGSite,
	RCGArticleLink, RCGArticleImage, RCGNoCharsCaption, RCGNoCharsDescription
} from '../../../consts.js';

const campaign = {
	key: 'RCG',
	characterRoute: RCGCharacter,
	playerInfoSettings: RCGPlayerInfoSettings,
	mastersInfoSettings: RCGMastersInfoSettings,
	classIcons: dndClassIcons,
	prioritiesText: 'Открыть список приоритетов',
	extraButton: { text: 'Наш сайт', link: RCGSite },
	noChars: {
		articleLink: RCGArticleLink,
		articleImage: RCGArticleImage,
		caption: RCGNoCharsCaption,
		description: RCGNoCharsDescription,
		action: (
			<Button
				size="m"
				appearance="positive"
				onClick={() => window.open(RCGCreateLink)}
			>
				Статья о создании персонажа
			</Button>),
	},
};

const RCGCampaignPanel = ({ fetchedUser }) => (
	<CampaignPanel fetchedUser={fetchedUser} campaign={campaign} />
);

export default RCGCampaignPanel;
