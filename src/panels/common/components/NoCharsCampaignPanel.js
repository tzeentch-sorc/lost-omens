import { useEffect, useState } from 'react';
import { ScreenSpinner } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import '../css/CampaignPanel.css';
import EmptyCampaignPanel from './EmptyCampaignPanel.js';
import NoCharsPage from './NOCharsPage.js';
import { CommonNoCharsBody } from '../../../consts.js';
import { getMasters } from '../../../util/GetMasters.js';

// Кампания, у которой в приложении есть только статья-приглашение и список мастеров:
// персонажи в таблицы ещё не заведены. Пока мастера не загрузились — заглушка со спиннером.
const NoCharsCampaignPanel = ({
    fetchedUser,
    mastersSettings,
    articleLink,
    articleImage,
    caption,
    description,
    body = CommonNoCharsBody
}) => {
    const [params] = useSearchParams();
    const campaignName = params.get('CampaignName');

    const [popout, setPopout] = useState(<ScreenSpinner />);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setMasters(await getMasters(mastersSettings));
            setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
            setTimeout(() => setPopout(null), 700);
        }
        fetchData().catch(console.error);
    }, []);

    if (masters.length < 1) {
        return (
            <EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
        );
    }

    return (
        <NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
            ArticleLink={articleLink} articleImage={articleImage} caption={caption}
            description={description} body={body} />
    );
};

export default NoCharsCampaignPanel;
