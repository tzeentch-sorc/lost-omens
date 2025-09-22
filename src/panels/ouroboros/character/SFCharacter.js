import React, { useState, useEffect } from 'react';
import {
	Panel, SimpleCell,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, Div, SplitCol, SplitLayout,
	HorizontalCell, SimpleGrid, Text
} from '@vkontakte/vkui';
import {
	Icon56Stars3Outline, Icon28TouchIdOutline, Icon36CoinsStacks3Outline,
	Icon24PlaneOutline, Icon28WrenchOutline
} from '@vkontakte/icons'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import SFCharInfoSettings from '../export_settings/SFCharInfoSettings.js'
import { SFCampaign } from '../../../consts.js'
import * as logger from '../../../util/Logger.js';
import Marquee from '../../common/components/Marquee.js';

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

	useEffect(() => {
		async function fetchData() {
			//получение золота, уровня и опыта
			let characterInfoData = await SFCharInfoSettings.getFilteredQuery("name", charName);
			logger.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExp(characterInfoData[0].exp);
			setLvl(characterInfoData[0].lvl);
			setHist(characterInfoData[0].story);
			setDesc(characterInfoData[0].desc);
			setCharId(characterInfoData[0].id);
			setShip(characterInfoData[0].ship);
			setMech(characterInfoData[0].mech)

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
			logger.log(characterInfoData)
		}
		fetchData().catch(console.error);
	}, []);

	return (

		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace(SFCampaign, { keepSearchParams: true })} />}>
				<Marquee text={charName} speed={5} repeat={2} rightPadding={70} />
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					{charId && lvl > 0 && exp >= 0 &&
						<Group mode="card">
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
									<SimpleGrid align='stretch' columns={3} margin='none' gap='2xs'>
										<HorizontalCell size='m' >
											<Div className="not4mob">
												<SimpleCell subhead='Кредиты' before={<Icon36CoinsStacks3Outline width={24} height={24} />}>
													{gold}
												</SimpleCell>
											</Div>
											<Div className="formob">
												<SimpleCell subhead='Кредиты' before={<Icon36CoinsStacks3Outline width={20} height={20} />}>
													{gold}
												</SimpleCell>
											</Div>

										</HorizontalCell>
										<HorizontalCell size='m' >
											<Div className="not4mob">
												<SimpleCell subhead='Корабль' before={<Icon24PlaneOutline width={24} height={24} />}>
													{ship}
												</SimpleCell>
											</Div>
											<Div className="formob">
												<SimpleCell subhead='Корабль' before={<Icon24PlaneOutline width={20} height={20} />}>
													{ship}
												</SimpleCell>
											</Div>
										</HorizontalCell>
										<HorizontalCell size='s' >
											<Div className="not4mob">
												<SimpleCell subhead='Мех' before={<Icon28WrenchOutline width={24} height={24} />}>
													{mech}
												</SimpleCell>
											</Div>
											<Div className="formob">
												<SimpleCell subhead='Мех' before={<Icon28WrenchOutline width={20} height={20} />}>
													{mech}
												</SimpleCell>
											</Div>
										</HorizontalCell>
									</SimpleGrid>
								</Card>
							</CardGrid>
							<CardGrid size="l" >
								<Card key="desc">
									<Header mode="primary">Описание персонажа</Header>
									<Div>
										{desc.split('\n').map((line, index) => (
											<Text key={index}>{line}</Text>
										))}
									</Div>
								</Card>
								<Card key="hist">
									<Header mode="primary">История</Header>
									<Div>
										{hist.split('\n').map((line, index) => (
											<Text key={index}>{line}</Text>
										))}
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
