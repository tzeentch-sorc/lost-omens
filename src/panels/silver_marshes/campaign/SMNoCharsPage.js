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
import MastersGroup from '../../common/MastersGroup';
import ArticleBlock from '../../common/ArticleBlock';
import SMMastersInfoSettings from '../export_settings/SMMastersInfoSettings.js'


const SMNoCharsPage = ({ campaignName, user, }) => {

    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const masterData = await SMMastersInfoSettings.getQueryAll();
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
                        access_token: '3d1cfde53d1cfde53d1cfde5923e09382633d1c3d1cfde55808b77a146aa66ab68e156d'
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
                                        articleLink='https://vk.com/@geekmo-dnd-5e-campaign'
                                        caption='Добро пожаловать в «Серебряный Предел»!'
                                        description='Знакомство с мегакампанией'
                                        image='/images/sm_bannerjpg.jpg'
                                    />
                                    <MastersGroup masters={masters} />
                                    <Group mode='card'>
                                        <Placeholder icon={<Icon56UserAddOutline />} 
                                        header="Создание персонажа"
                                        action={
                                            <Button
                                                size="m"
                                                appearance="positive"
                                                onClick={() => window.open('https://vk.com/@geekmo-new-character-dnd-5e')}
                                            >
                                                Статья о создании персонажа
                                            </Button>
                                        }>
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

export default SMNoCharsPage;