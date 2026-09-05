import NoCharsCampaignPanel from '../../common/components/NoCharsCampaignPanel.js';
import HGMastersInfoSettings from '../export_settings/HGMastersInfoSettings.js';
import {
	HGArticleLink, HGArticleImage, HGNoCharsCaption, HGNoCharsDescription
} from '../../../consts.js';

const HGCampaignPanel = ({ fetchedUser }) => (
	<NoCharsCampaignPanel
		fetchedUser={fetchedUser}
		mastersSettings={HGMastersInfoSettings}
		articleLink={HGArticleLink}
		articleImage={HGArticleImage}
		caption={HGNoCharsCaption}
		description={HGNoCharsDescription}
	/>
);

export default HGCampaignPanel;
