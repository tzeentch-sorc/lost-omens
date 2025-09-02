import {
    Panel, PanelHeader, Header,
    Button, Group,
    PanelHeaderBack,
    SplitCol, SplitLayout,
    Div, Placeholder,
    ScreenSpinner

} from '@vkontakte/vkui';
import {
    Icon56UserAddOutline
} from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import MastersGroup from '../../common/components/MastersGroup.js';
import ArticleBlock from '../../common/components/ArticleBlock.js';
import VUMastersInfoSettings from '../export_settings/VUMastersInfoSettings.js'

import { VKToken, VUArticleLink } from '../../../consts.js'


const VUNoCharsPage = ({ campaignName, user, }) => {

    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const masterData = await VUMastersInfoSettings.getQueryAll();
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
            setTimeout(() => { setPopout(null); setIsDisplayed(true); }, 1000)
        }
        fetchData().catch(console.error);
    }, []);

    const routeNavigator = useRouteNavigator();

    return (
        <Panel nav='campaign' key={campaignName}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>{campaignName}</PanelHeader>
            {
                user && masters &&
                <Group mode="plain">
                    <SplitLayout popout={popout}>
                        {isDisplayed &&
                            <SplitCol>
                                <Group mode="plain">
                                    <ArticleBlock
                                        articleLink={VUArticleLink}
                                        caption='Добро пожаловать в «Глас Теней»!'
                                        description='Знакомство с мегакампанией'
                                        image='/images/vu_banner.jpg'
                                    />
                                    <MastersGroup masters={masters} />
                                    <Group mode="card">
                                        <Placeholder icon={<Icon56UserAddOutline />} header="Создание персонажа">
                                            <Div>
                                                Для создания стоит написать одному из мастеров
                                            </Div>
                                            <Div>
                                                <b>Строго 18+</b>
                                            </Div>
                                        </Placeholder>
                                    </Group>
                                </Group>
                            </SplitCol>
                        }
                    </SplitLayout>
                </Group>
            }
        </Panel>
    );
}

export default VUNoCharsPage;