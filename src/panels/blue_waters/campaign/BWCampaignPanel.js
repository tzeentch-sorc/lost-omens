import NoCharsCampaignPanel from '../../common/components/NoCharsCampaignPanel.js';
import BWMastersInfoSettings from '../export_settings/BWMastersInfoSettings.js';
import {
	BWArticleLink, BWArticleImage, BWNoCharsCaption, BWNoCharsDescription
} from '../../../consts.js';

const BWCampaignPanel = ({ fetchedUser }) => (
	<NoCharsCampaignPanel
		fetchedUser={fetchedUser}
		mastersSettings={BWMastersInfoSettings}
		articleLink={BWArticleLink}
		articleImage={BWArticleImage}
		caption={BWNoCharsCaption}
		description={BWNoCharsDescription}
	/>
);

export default BWCampaignPanel;
