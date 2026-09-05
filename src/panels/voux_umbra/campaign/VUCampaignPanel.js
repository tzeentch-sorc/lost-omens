import NoCharsCampaignPanel from '../../common/components/NoCharsCampaignPanel.js';
import VUMastersInfoSettings from '../export_settings/VUMastersInfoSettings.js';
import {
	VUArticleLink, VUArticleImage, VUNoCharsCaption, VUNoCharsDescription
} from '../../../consts.js';

const VUCampaignPanel = ({ fetchedUser }) => (
	<NoCharsCampaignPanel
		fetchedUser={fetchedUser}
		mastersSettings={VUMastersInfoSettings}
		articleLink={VUArticleLink}
		articleImage={VUArticleImage}
		caption={VUNoCharsCaption}
		description={VUNoCharsDescription}
	/>
);

export default VUCampaignPanel;
