import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, Div, SplitCol, SplitLayout,
	HorizontalCell, Flex
} from '@vkontakte/vkui';
import {
	Icon56Stars3Outline, Icon28TouchIdOutline, Icon36CoinsStacks3Outline,
	Icon24PlaneOutline, Icon28WrenchOutline
} from '@vkontakte/icons'
import { SF_GOOGLE_SCRIPTS_BASE_URL } from '../campaign/SFCampaignPanel.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const SFCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();

	const [charId, setCharId] = useState("Неизвестно");
	const [lvl, setLvl] = useState(-1);
	const [exp, setExp] = useState(-1);
	const [desc, setDesc] = useState("Нет данных");
	const [hist, setHist] = useState("Нет данных");
	const [gold, setGold] = useState("Нет данных");
	const [ship, setShip] = useState("Нет данных");
	const [mech, setMech] = useState("Нет данных");


	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');
	var isFinished = false
	useEffect(() => {
		async function fetchData() {
			isFinished = false
			const data = await axios.post(SF_GOOGLE_SCRIPTS_BASE_URL + "?id=" + charName).then(resp => { //charName  "Кима"
				return resp.data
			})
			setCharId(data.id)
			setLvl(data.lvl)
			setExp(data.exp)
			if (data.hist)
				setHist(data.hist)
			if (data.desc)
				setDesc(data.desc)
			if (data.gold)
				setGold(data.gold)
			if (data.psVal)
				setShip(data.psVal)
			if (data.pmVal)
				setMech(data.pmVal)
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
			console.log(data)
		}
		fetchData();
	}, []);

	return (

		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/ouroboros', { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					{charId && lvl > 0 && exp >= 0 &&
						<Group mode="plain">
							<CardGrid size="m" >
								<Card key="full_name">
									<Header mode="primary">ID</Header>
									<SimpleCell before={<Icon28TouchIdOutline width={24} height={24} />}>{charId}</SimpleCell>
								</Card>
								<Card key="level">
									<Header mode="primary">Уровень и опыт</Header>
									<SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>{lvl} ({exp} XP)</SimpleCell>
								</Card>
							</CardGrid>
							<CardGrid size="l" >
								<Card key="gold">
									<Header mode="primary">Финансы</Header>
									<Flex noWrap justify='center'>
										<HorizontalCell size='l' >
											<SimpleCell subhead='Кредиты' before={<Icon36CoinsStacks3Outline width={24} height={24} />}>
												{gold}
											</SimpleCell>
										</HorizontalCell>
										<HorizontalCell size='l' >
											<SimpleCell subhead='Корабль' before={<Icon24PlaneOutline width={24} height={24} />}>
												{ship}
											</SimpleCell>
										</HorizontalCell>
										<HorizontalCell size='l' >
											<SimpleCell subhead='Мех' before={<Icon28WrenchOutline width={24} height={24} />}>
												{mech}
											</SimpleCell>
										</HorizontalCell>
									</Flex>
								</Card>
							</CardGrid>
							<CardGrid size="l" >
								<Card key="desc">
									<Header mode="primary">Описание персонажа</Header>
									<Div>
										{desc}
									</Div>
								</Card>
								<Card key="hist">
									<Header mode="primary">История</Header>
									<Div>
										{hist}
									</Div>
								</Card>
							</CardGrid>
						</Group>
					}
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default SFCharacter;
