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
import MastersGroup from '../MastersGroup';
import ArticleBlock from '../ArticleBlock';


const SFNoCharsPage = ({campaignName, user, }) => {

    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
		async function fetchData() {
			const users = await bridge
				.send('VKWebAppCallAPIMethod', {
					method: 'users.get',
					params: {
						user_ids: 'faa_magic, rizaevns, iaroslavvvv, ferrafenex, never_tell_never',
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
                                        articleLink='https://vk.com/@geekmo-ouroboros-invitation'
                                        caption='Добро пожаловать на станцию «Уроборос»!'
                                        description='Введение в систему и мегакампанию'
                                        image='https://sun9-27.userapi.com/impg/U72Npb3EfzT-0av7QwY-QSjTWDQQrVTFZkV9bA/zgigXh3DtTQ.jpg?size=1280x720&quality=95&sign=71fe8128d8bcc4598df9b0c524269dbe&type=album'
                                    />
                                    <MastersGroup masters={masters}/>
                                    <Group>
                                        <Placeholder
                                            icon={<Icon56UserAddOutline />}
                                            header="Создание персонажа"
                                            action={
                                                <Button
                                                    size="m"
                                                    appearance="positive"
                                                    onClick={() => window.open('https://forms.gle/DfWmZwPJ7vYA5Yhg7', "_blank")}
                                                >
                                                    Создать
                                                </Button>
                                            }>
                                            <Div>
                                                Кажется, у тебя еще нет персонажа на станции «Уроборос»!
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

export default SFNoCharsPage;