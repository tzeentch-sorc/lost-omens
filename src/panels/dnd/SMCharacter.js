import React, { useState, useEffect } from 'react';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, SplitCol,
	SplitLayout
} from '@vkontakte/vkui';
import {
	Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon56Stars3Outline,
	Icon28HourglassErrorBadgeOutline
} from '@vkontakte/icons'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import SMInventoryPlaceholder from './placeholders/SMInventoryPlaceholder.js';
import SMSpellsPlaceholder from './placeholders/SMSpellsPlaceholder.js';
import SMCharTabPanel from './character_parts/SMCharTabPanel.js';
import SMSpells from './character_parts/SMCharAccordionSpells.js';
import SMInventory from './character_parts/SMInventory.js';

import InventorySettings from './export_settings/SMInventorySettings.js'
import CharBuildSettings from './export_settings/SMCharBuildSettings.js'
import CharInfoSettings from './export_settings/SMCharInfoSettings.js'

import './SMCharacter.css'


const SMCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
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

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('inventory');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');

	function hasSpells() {
		return (spell_0[0] != "" || spell_1[0] != "" || spell_2[0] != "" ||
			spell_3[0] != "" || spell_4[0] != "" || spell_5[0] != "" || spell_6[0] != "" ||
			spell_7[0] != ""
		);
	}
	function hasInventory() {
		return (inventory || false);
	}
	function spellist() {
		return ([spell_0, spell_1, spell_2,
			spell_3, spell_4, spell_5, spell_6,
			spell_7]
		)
	}


	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//получение инвентаря
			let inventoryData = await InventorySettings.getFilteredQuery("owner", charName);
			console.log("inventory data", inventoryData);

			setInventory(inventoryData.sort((a, b) => b.cost - a.cost));

			//получение черт, заклинаний, формул
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

			//получение золота, уровня, даунтайма и опыта
			let characterInfoData = await CharInfoSettings.getFilteredQuery("name", charName);
			console.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setDowntime(characterInfoData[0].downtime);
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);

			//console.log("new", inventoryData);
		}
		fetchData();
	}, []);

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/silver_marshes', { keepSearchParams: true })} />}>
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
								<SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime}</SimpleCell>
							</Card>
						</CardGrid>
						<CardGrid size='m'>
							<Card key="experience">
								<Header mode="primary">Уровень</Header>
								<SimpleCell before={<Icon56Stars3Outline width={24} height={24} />}>
									{experience && level && (level + " (" + experience + " XP)")} {!experience && ("unknown")}
								</SimpleCell>
							</Card>
						</CardGrid>
					</Group>
					<Group>
						<SMCharTabPanel
							selected={selected}
							setSelected={setSelected}
							onMenuClick={(opened) => {
								setMenuOpened((prevState) => (opened ? !prevState : false));
							}}
						/>
						{selected === 'inventory' && (!hasInventory()) && (
							<SMInventoryPlaceholder />
						)}
						{selected === 'inventory' && (hasInventory()) && (
							<SMInventory inventory={inventory} />
						)}
						{selected === 'spells' && (!hasSpells()) && (
							<SMSpellsPlaceholder />
						)}
						{selected === 'spells' && (hasSpells()) && (
							<SMSpells spellist={spellist()} />
						)}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default SMCharacter;
