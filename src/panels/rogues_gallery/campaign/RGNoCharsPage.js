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
import MastersGroup from '../../common/MastersGroup.js';
import ArticleBlock from '../../common/ArticleBlock.js';
import RGMastersInfoSettings from '../export_settings/RGMastersInfoSettings.js'

import { VKToken, VUArticleLink } from '../../../util/consts.js'


const RGNoCharsPage = ({ campaignName, user, }) => {

    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const masterData = await RGMastersInfoSettings.getQueryAll();
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
                                        articleLink={RGArticleLink}
                                        caption='Добро пожаловать в «Rogues Gallery»!'
                                        description='Знакомство с мегакампанией'
                                        image='/images/rg_banner.jpg'
                                    />
                                    <MastersGroup masters={masters} />
                                    <Group mode="card">
                                        <Placeholder icon={<Icon56UserAddOutline />} header="Создание персонажа">
                                            <Div>
                                                Для создания стоит написать одному из мастеров
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

export default RGNoCharsPage;