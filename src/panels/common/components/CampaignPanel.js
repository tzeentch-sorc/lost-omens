import React, { useEffect, useState } from 'react';
import {
	Panel, PanelHeader, Header, Group,
	PanelHeaderBack, ScreenSpinner,
	SplitCol, SplitLayout,
	CardGrid, Div, Button, Spacing
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import '../css/CampaignPanel.css';
import InfoCard from './InfoCard.js';
import CharUpdateAlert from './CharUpdateAlert.js';
import EmptyCampaignPanel from './EmptyCampaignPanel.js';
import CharCard from './CharCard.js';
import NoCharsPage from './NOCharsPage.js';
import Priorities from './Priorities.js';
import MastersGroup from './MastersGroup.js';
import Marquee from './Marquee.js';

import { getVkUserUrl } from '../../../util/VKUserURL.js';
import * as logger from '../../../util/Logger.js';
import { getMasters } from '../../../util/GetMasters.js';
import { CommonNoCharsBody, MastersText } from '../../../consts.js';

// Панель мегакампании, у которой в приложении есть персонажи.
// Всё, чем кампании отличаются, приходит одним объектом campaign — см. *CampaignPanel.js.
const CampaignPanel = ({ fetchedUser, campaign }) => {
	const {
		key,
		characterRoute,
		playerInfoSettings,
		mastersInfoSettings,
		classIcons,
		keepsPlayerParam = false,
		lvlupFormLink,
		infoCardPadding = false,
		prioritiesText,
		extraButton,
		noChars,
	} = campaign;

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const campaignName = params.get('CampaignName');

	const [characters, setCharacters] = useState([])
	const [date, setDate] = useState("Хроника утеряна")
	const [advName, setAdvName] = useState("Неизвестное приключение")
	const [prio, setPrio] = useState(-1)
	const [popout, setPopout] = useState(<ScreenSpinner />)
	const [priorities, setPriorities] = useState([]);
	const [masters, setMasters] = useState([]);

	const openAction = (element) => {
		setPopout(
			<CharUpdateAlert
				charName={element.name}
				formLink={lvlupFormLink && lvlupFormLink(element)}
				navLink={characterRoute}
				closeMethod={() => setPopout(null)}
			/>
		);
	};

	const openAlert = (element) => {
		if (element.lvl_up) {
			openAction(element);
		} else {
			// Панель персонажа Lost Omens подставляет имя игрока в форму добавления предмета.
			if (keepsPlayerParam) {
				params.set('Player', element.player);
			}
			params.set('CharName', element.name);
			setParams(params);
			routeNavigator.push(characterRoute, { keepSearchParams: true });
		}
	}

	function createCard(element) {
		return (
			<CharCard
				element={element}
				key={element.name + "_" + key.toLowerCase() + "_card"}
				openAction={() => { openAlert(element) }}
				before={classIcons[element.type]}
				subtitle={element.type + ", " + element.lvl + " ур."}
				extraSubtitle={element.race}
			/>
		);
	}

	useEffect(() => {
		async function fetchData() {
			const prioData = await playerInfoSettings.getQueryAll();
			setPriorities(prioData.map(elem => ({
				player: elem.player,
				char_name: elem.char_name,
				prio: elem.prio,
				lvl: elem.lvl
			})).sort((a, b) => b.prio - a.prio));
			logger.log("prioData: ", prioData);

			const data = prioData.filter(elem => {
				return getVkUserUrl(elem, key, fetchedUser)
			});
			logger.log("data: ", data);
			setCharacters(data.map(elem => ({
				name: elem.char_name,
				player: `${elem.player?.split(" ")?.[0] ?? ''} ${elem.player?.split(" ")?.[1]?.charAt(0) ?? ''}`.trim(),
				lvl: elem.lvl,
				lvl_up: elem.lvl_up === "FALSE" ? false : true,
				type: elem.char_class,
				race: elem.race
			})));
			if (data.length > 0) {
				data[0].adv_date != "" && setDate(data[0].adv_date);
				data[0].adv != "" && setAdvName(data[0].adv);
				data[0].prio != "" && setPrio(data[0].prio);
			} else {
				setPrio(-2);
			}

			setMasters(await getMasters(mastersInfoSettings));
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 700);
		}
		fetchData().catch(console.error);
	}, []);

	if (masters.length >= 1 && characters.length < 1 && prio == -2) {
		//no chars found
		return (
			<NoCharsPage user={fetchedUser} campaignName={campaignName} masters={masters}
				ArticleLink={noChars.articleLink} articleImage={noChars.articleImage}
				caption={noChars.caption} description={noChars.description}
				body={CommonNoCharsBody} action={noChars.action} />
		)
	} else if ((characters.length < 1 && prio == -1) || masters.length < 1) {
		//while loading
		return (
			<EmptyCampaignPanel user={fetchedUser} campaignName={campaignName} popout={popout} />
		)
	} else {
		return (
			<Panel nav='campaign' key={campaignName}>
				<PanelHeader className="panelHeader" before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>
					<Marquee text={campaignName} speed={5} repeat={2} rightPadding={70} />
				</PanelHeader>
				{
					fetchedUser &&
					<>
						<MastersGroup masters={masters} text={MastersText} />
						<Group mode='card'>
							<SplitLayout>
								<SplitCol>
									{date && prio && advName &&
										<Group header={<Header size="s">Информация игрока</Header>} mode="plain" padding='s'>
											<InfoCard date={date} prio={prio} adventure={advName} padding={infoCardPadding} />
											<Spacing size={4} />
											<Div style={{ paddingLeft: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
												<Priorities setPopout={setPopout} priorities={priorities} appearance='neutral' text={prioritiesText} />
												{extraButton &&
													<Button stretched appearance="negative" size="l" onClick={() => { window.open(extraButton.link, "_blank") }}>
														{extraButton.text}
													</Button>}
											</Div>
										</Group>
									}
									<Header size="s">Ваши персонажи</Header>
									<Group mode="plain">
										<Div className="not4mob">
											<CardGrid size="m" style={{ cursor: 'pointer' }}>
												{characters && characters.map((elem) => createCard(elem))}
											</CardGrid>
										</Div>
										<Div className="formob">
											<CardGrid size="l">
												{characters && characters.map((elem) => createCard(elem))}
											</CardGrid>
										</Div>
									</Group>
								</SplitCol>
								{popout}
							</SplitLayout>
						</Group>
					</>
				}
			</Panel>
		)
	}
};

export default CampaignPanel;
