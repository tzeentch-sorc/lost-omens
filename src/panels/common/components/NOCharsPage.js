import {
    Panel, PanelHeader, Group,
    PanelHeaderBack,
    SplitCol, SplitLayout,
    Div, Placeholder,

} from '@vkontakte/vkui';
import {
    Icon56UserAddOutline
} from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import MastersGroup from './MastersGroup.js';
import ArticleBlock from './ArticleBlock.js';

const NoCharsPage = ({ campaignName, user, ArticleLink, articleImage, caption, description, masters, action, body }) => {

    const routeNavigator = useRouteNavigator();

    return (
        <Panel nav='campaign' key={campaignName}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
            {
                user && masters &&
                <Group mode="plain">
                    <SplitLayout>
                            <SplitCol>
                                <Group mode="plain">
                                    <ArticleBlock
                                        articleLink={ArticleLink}
                                        caption={caption}
                                        description={description}
                                        image={articleImage}
                                    />
                                    <MastersGroup masters={masters} />
                                    <Group mode="card">
                                        <Placeholder icon={<Icon56UserAddOutline />} header="Создание персонажа" action={action}>
                                            <Div>
                                                {body}
                                            </Div>
                                        </Placeholder>
                                    </Group>
                                </Group>
                            </SplitCol>
                    </SplitLayout>
                </Group>
            }
        </Panel>
    );
}

export default NoCharsPage;