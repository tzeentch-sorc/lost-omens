import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, SplitCol,
	SplitLayout, Tabs, TabsItem, Div, Placeholder,
	Accordion
} from '@vkontakte/vkui';
import {
	Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
	Icon28HourglassErrorBadgeOutline, Icon28CubeBoxOutline,
	Icon28MagicWandOutline, Icon24BookSpreadOutline, Icon28MagicHatOutline,
	Icon28MortarOutline, Icon56DiamondOutline
} from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import '../Character.css'
import InventorySettings from './LOInventorySettings.js'
import CharBuildSettings from './LOCharBuildSettings.js'


const LOCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
	const [formulae, setFormulae] = useState();
	const [gold, setGold] = useState(0);
	const [downtime, setDowntime] = useState(0);
	const [experience, setExperience] = useState();
	const [level, setLevel] = useState();
	const [spell_0, setSpell_0] = useState();
	const [spell_1, setSpell_1] = useState();
	const [spell_2, setSpell_2] = useState();
	const [spell_3, setSpell_3] = useState();
	const [spell_4, setSpell_4] = useState();
	const [spell_5, setSpell_5] = useState();
	const [spell_6, setSpell_6] = useState();
	const [spell_7, setSpell_7] = useState();
	const [spell_8, setSpell_8] = useState();
	const [spell_9, setSpell_9] = useState();
	const [spell_10, setSpell_10] = useState();

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('inventory');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');

	function createRow(element) {
		if (element[2] == 0) return;
		var description = "Количество: " + element[2] + "; Цена: " + element[1];
		return (
			<SimpleCell multiline key={element[0]}>
				<InfoRow header={description}>{element[0]}</InfoRow>
			</SimpleCell>
		);
	}

	function createSpell(element) {
		return (
			<SimpleCell multiline key={element}>
				<InfoRow>{element}</InfoRow>
			</SimpleCell>
		);
	}

	function countGames(exp, lvl) {
		if (lvl && lvl < 7) {
			if (exp - (lvl - 1) * 1000 > 0) {
				return 1;
			} else {
				return 2;
			}
		} else {
			var tmpexp = exp - 6000;
			if (tmpexp - (lvl - 7) * 1500 == 0) {
				return 3;
			} else if (tmpexp - (lvl - 7) * 1500 == 500) {
				return 2;
			} else {
				return 1;
			}
		}
	}

	function hasSpells() {
		return (spell_0 || spell_1 || spell_2 ||
			spell_3 || spell_4 || spell_5 || spell_6 ||
			spell_7 || spell_8 | spell_9 || spell_10
		)
	}

	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//для инвентаря требуется доработка на стороне таблички
			//let inventoryData = await InventorySettings.getFilteredQuery("owner", charName);
			//console.log("inventory data", inventoryData);

			//получение черт и заклинаний
			let characterBuildData = await CharBuildSettings.getFilteredQuery("name", charName);
			console.log("character build data", characterBuildData);
			setSpell_0(characterBuildData[0].spells_0.split(','));
			setSpell_1(characterBuildData[0].spells_1.split(','));
			setSpell_2(characterBuildData[0].spells_2.split(','));
			setSpell_3(characterBuildData[0].spells_3.split(','));
			setSpell_4(characterBuildData[0].spells_4.split(','));
			setSpell_5(characterBuildData[0].spells_5.split(','));
			setSpell_6(characterBuildData[0].spells_6.split(','));
			setSpell_7(characterBuildData[0].spells_7.split(','));
			setSpell_8(characterBuildData[0].spells_8.split(','));
			setSpell_9(characterBuildData[0].spells_9.split(','));
			setSpell_10(characterBuildData[0].spells_10.split(','));

			//Посмотреть все данные листа
			//let allData = await CharBuildSettings.getQueryAll();
			//console.log("all data", allData);

			//старое
			const data = await axios.post(GOOGLE_SCRIPTS_BASE_URL + "?id=" + charName).then(resp => {
				return resp.data
			})
			setInventory(data.inventory.sort((a, b) => b[1] - a[1]));
			setFormulae(data.formulae);
			setGold(data.gold);
			setExperience(data.exp);
			setLevel(data.lvl);
			setDowntime(data.downtime);
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
			//console.log(data.inventory);
		}
		fetchData();
	}, []);

	const DefaultInPanel = ({ menuOpened, onMenuClick, selected, setSelected }) => {
		return (
			<Tabs>
				<TabsItem
					selected={selected === 'inventory'}
					onClick={() => {
						if (selected === 'inventory') {
							onMenuClick(true);
						}
						setSelected('inventory');
					}}
					id="tab-inventory"
					aria-controls="tab-content-inventory"
				>
					<SimpleCell before={<Icon28CubeBoxOutline width={24} height={24} />}> <div className="not4mob">Инвентарь</div></SimpleCell>
				</TabsItem>
				<TabsItem
					selected={selected === 'spells'}
					onClick={() => {
						onMenuClick(false);
						setSelected('spells');
					}}
					id="tab-spells"
					aria-controls="tab-content-spells"
				>
					<SimpleCell before={<Icon28MagicWandOutline width={24} height={24} />}> <div className="not4mob">Заклинания</div></SimpleCell>
				</TabsItem>
				<TabsItem
					selected={selected === 'formulae'}
					onClick={() => {
						onMenuClick(false);
						setSelected('formulae');
					}}
					id="tab-formulae"
					aria-controls="tab-content-formulae"
				>
					<SimpleCell before={<Icon24BookSpreadOutline width={24} height={24} />}> <div className="not4mob">Формулы</div> </SimpleCell>
				</TabsItem>
			</Tabs>
		);
	};

	const infoStyle = { color: 'var(--vkui--color_text_subhead)' };
	const AccordionSpells = () => {
		const [openId, setOpenId] = React.useState(null);

		return (
			<Group
				id="tab-content-spells"
				aria-controls="tab-spells"
				role="tabpanel"
				mode="plain">
				{spell_0[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Кантрипы</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_0 && spell_0.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_1[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 1</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_1 && spell_1.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_2[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 2</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_2 && spell_2.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_3[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 3</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_3 && spell_3.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_4[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 4</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_4 && spell_4.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_5[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 5</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_5 && spell_5.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_6[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 6</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_6 && spell_6.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_7[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 7</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_7 && spell_7.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_8[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 8</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_8 && spell_8.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_9[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 9</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_9 && spell_9.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
				{spell_10[0] != '' && (
					<Accordion>
						<Accordion.Summary iconPosition="before">Круг 10</Accordion.Summary>
						<Accordion.Content>
							<Div style={infoStyle}>
								{spell_10 && spell_10.map(e => createSpell(e))}
							</Div>
						</Accordion.Content>
					</Accordion>)}
			</Group>
		)
	};

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/lost_omens', { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<Group>
						<CardGrid size='m'>
							<Card key="gold">
								<Header mode="primary">Золото</Header>
								<SimpleCell before={<Icon36CoinsStacks3Outline width={24} height={24} />}>{gold}</SimpleCell>
							</Card>
							<Card key="downtime">
								<Header mode="primary">Даунтайм</Header>
								<SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime} / 56 дней</SimpleCell>
							</Card>
						</CardGrid>
						<CardGrid size='m'>
							<Card key="experience">
								<Header mode="primary">Опыт</Header>
								<SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
									{experience && (experience)} {!experience && (" ??? ")} XP
								</SimpleCell>
							</Card>
							<Card key="lvlcountdown">
								<Header mode="primary">
									Партий до {level && (parseInt(level, 10) + 1)} {!level && (" ??? ")} ур.
								</Header>
								<SimpleCell before={<Icon28HourglassErrorBadgeOutline width={24} height={24} />}>
									{experience && level && (countGames(experience, level))}
									{(!experience || !level) && (" ??? ")}
								</SimpleCell>
							</Card>
						</CardGrid>
						<DefaultInPanel
							selected={selected}
							setSelected={setSelected}
							onMenuClick={(opened) => {
								setMenuOpened((prevState) => (opened ? !prevState : false));
							}}
						/>
						{selected === 'inventory' && (!inventory || inventory.length < 1) && (
							<Group
								id="tab-content-inventory"
								aria-controls="tab-inventory"
								role="tabpanel"
								mode="plain">
								<Placeholder icon={<Icon56DiamondOutline width={56} height={56} />} header="Здесь будет ваш инвентарь">
									<Div>
										Сходи, закупись, не скупись!
									</Div>
								</Placeholder>
							</Group>
						)}
						{selected === 'inventory' && inventory && inventory.length >= 1 && (
							<Group
								id="tab-content-inventory"
								aria-controls="tab-inventory"
								role="tabpanel"
								mode="plain">
								{inventory && inventory.map(e => createRow(e))}
							</Group>
						)}
						{selected === 'spells' && (!hasSpells()) && (
							<Group
								id="tab-content-spells"
								aria-controls="tab-spells"
								role="tabpanel"
								mode="plain"
							>
								<Placeholder icon={<Icon28MagicHatOutline width={56} height={56} />} header="Здесь будут ваши заклинания">
									<Div>
										Ты думал здесь что-то будет?
									</Div>
								</Placeholder>

							</Group>
						)}
						{selected === 'spells' && (hasSpells()) && (
							<AccordionSpells />
						)}
						{selected === 'formulae' && (!formulae || formulae.length < 1) && (
							<Group
								id="tab-content-formulae"
								aria-controls="tab-formulae"
								role="tabpanel"
								mode="plain"
							>
								<Placeholder icon={<Icon28MortarOutline width={56} height={56} />} header="Здесь будут ваши формулы">
									<Div>
										Never gonna give you up...
									</Div>
								</Placeholder>

							</Group>
						)}
						{selected === 'formulae' && formulae && formulae.length >= 1 && (
							<Group
								id="tab-content-formulae"
								aria-controls="tab-formulae"
								role="tabpanel"
								mode="plain"
							>
								{formulae && formulae.map(e => createRow(e))}
							</Group>
						)}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default LOCharacter;
