import React from 'react';

import CampaignPanel from '../../common/components/CampaignPanel.js';
import loClassIcons from '../../common/custom_icons/LOClassIcons/index.js';
import LOPlayerInfoSettings from '../export_settings/LOPlayerInfoSettings.js'
import LOMastersInfoSettings from '../export_settings/LOMastersInfoSettings.js'
import LOAgents from './LOAgents.js';

import {
	FormPreEnter, LOLvlupLink, LOLvlupChar, LOLvlupPlayer, LOLvlupChoice,
	LOLvlupLevel, LOCharacter, LOBulletinLink,
	LOArticleLink, LOArticleImage, LONoCharsCaption, LONoCharsDescription
} from '../../../consts.js';

function lvlupFormLink({ player, name, lvl }) {
	return LOLvlupLink + FormPreEnter +
		LOLvlupPlayer + player +
		LOLvlupChar + name +
		//LOLvlupChoice  + "Выборы на повышении" +
		LOLvlupLevel + (parseInt(lvl, 10) + 1);
}

const campaign = {
	key: 'LO',
	characterRoute: LOCharacter,
	playerInfoSettings: LOPlayerInfoSettings,
	mastersInfoSettings: LOMastersInfoSettings,
	classIcons: loClassIcons,
	keepsPlayerParam: true,
	lvlupFormLink,
	extraButton: { text: 'Доска Авроры', link: LOBulletinLink },
	extraSection: ({ players, setPopout }) => <LOAgents players={players} setPopout={setPopout} />,
	noChars: {
		articleLink: LOArticleLink,
		articleImage: LOArticleImage,
		caption: LONoCharsCaption,
		description: LONoCharsDescription,
	},
};

const LOCampaignPanel = ({ fetchedUser }) => (
	<CampaignPanel fetchedUser={fetchedUser} campaign={campaign} />
);

export default LOCampaignPanel;
