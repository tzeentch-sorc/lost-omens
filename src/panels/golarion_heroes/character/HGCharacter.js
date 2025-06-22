import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol, SplitLayout
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import SpellsPlaceholder from '../../common/placeholders/SpellsPlaceholder.js';
import FormulaePlaceholder from '../../common/placeholders/FormulaePlaceholder.js';
import HGCharTabPanel from './HGCharTabPanel.js';
import HGSpells from './HGSpells.js';
import HGInventory from './HGInventory.js';
import HGFormulae from './HGFormulae.js';
import HGMainInfo from './HGMainInfo.js';

import HGInventorySettings from '../export_settings/HGInventorySettings.js'
import HGCharBuildSettings from '../export_settings/HGCharBuildSettings.js'
import HGCharInfoSettings from '../export_settings/HGCharInfoSettings.js'

import './HGCharacter.css'
import HGFeatPanel from './HGFeatPanel.js';

const HGCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState([]);
	const [wealth, setWealth] = useState(0);
	const [formulae, setFormulae] = useState();
	const [gold, setGold] = useState(0);
	const [mult, setMult] = useState();
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
	const [feat_general, setFeatGeneral] = useState();
	const [feat_class, setFeatClass] = useState();

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('inventory');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');

	function hasSpells() {
		return (spell_0[0] != "" || spell_1[0] != "" || spell_2[0] != "" ||
			spell_3[0] != "" || spell_4[0] != "" || spell_5[0] != "" || spell_6[0] != "" ||
			spell_7[0] != "" || spell_8[0] != "" | spell_9[0] != ""
		);
	}
	function hasFormulae() {
		return (formulae[0] != "");
	}
	function hasInventory() {
		return (inventory.length > 0);
	}
	function spellist() {
		return ([spell_0, spell_1, spell_2,
			spell_3, spell_4, spell_5, spell_6,
			spell_7, spell_8, spell_9]
		)
	}
	function featlist() {
		return ([feat_class, feat_general])
	}

	function renderSelectedTab() {
		switch (selected) {
			case 'inventory':
				return hasInventory() ? (
					<HGInventory inventory={inventory} totalWealth={wealth}/>
				) : (
					<InventoryPlaceholder />
				);
			case 'spells':
				return hasSpells() ? (
					<HGSpells spellist={spellist()} />
				) : (
					<SpellsPlaceholder />
				);
			case 'formulae':
				return hasFormulae() ? (
					<HGFormulae formulae={formulae} />
				) : (
					<FormulaePlaceholder />
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//получение золота, уровня и опыта
			let characterInfoData = await HGCharInfoSettings.getFilteredQuery("name", charName);
			console.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setMult(characterInfoData[0].mult);

			//получение инвентаря
			let inventoryData = await HGInventorySettings.getFilteredQuery("owner", charName);
			console.log("inventory data", inventoryData);

			if (inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}

			//получение черт, заклинаний, формул
			let characterBuildData = await HGCharBuildSettings.getFilteredQuery("name", charName);
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

			setFormulae(characterBuildData[0].formulas.split(','));

			setFeatGeneral(characterBuildData[0].feat_general.split(','));
			setFeatClass(characterBuildData[0].feat_class.split(','));

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);

			//console.log("new", inventoryData);
		}
		fetchData().catch(console.error);
	}, []);

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/golarion_heroes', { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<HGMainInfo
						gold={gold}
						experience={experience}
						level={level}
						mult={mult}
					/>
					<HGFeatPanel featlist={featlist()} />
					<Group mode='card'>
						<HGCharTabPanel
							selected={selected}
							setSelected={setSelected}
							onMenuClick={(opened) => {
								setMenuOpened((prevState) => (opened ? !prevState : false));
							}}
						/>
						{renderSelectedTab()}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default HGCharacter;