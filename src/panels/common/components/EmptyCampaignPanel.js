import {
	Panel, PanelHeader, Group,
	PanelHeaderBack, SplitLayout

} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Marquee from './Marquee';

const EmptyCampaignPanel = ({user, campaignName, popout}) => {
    const routeNavigator = useRouteNavigator();
    return (
        <Panel nav='campaign' key={campaignName}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>
                <Marquee text={campaignName} speed={5} repeat={2} rightPadding={70} />
            </PanelHeader>
            {
                user &&
                <Group mode="plain">
                    <SplitLayout popout={popout} />
                </Group>
            }
        </Panel>
    );
}

export default EmptyCampaignPanel;