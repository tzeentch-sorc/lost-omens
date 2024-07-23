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

import LOInventoryPlaceholder from '../../placeholders/InventoryPlaceholder.js';
import LOSpellsPlaceholder from '../../placeholders/SpellsPlaceholder.js';
import LOFormulaePlaceholder from '../../placeholders/FormulaePlaceholder.js';

import LOCharTabPanel from './LOCharTabPanel.js';
import LOSpells from './LOSpells.js';
import LOInventory from './LOInventory.js';
import LOFormulae from './LOFormulae.js';
import LOMainInfo from './LOMainInfo.js';

import InventorySettings from '../export_settings/LOInventorySettings.js'
import CharBuildSettings from '../export_settings/LOCharBuildSettings.js'
import CharInfoSettings from '../export_settings/LOCharInfoSettings.js'

import './LOCharacter.css'
import LOFeatPanel from './LOFeatPanel.js';


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
	const [feat_race, setFeatRace] = useState();
	const [feat_general, setFeatGeneral] = useState();
	const [feat_class, setFeatClass] = useState();
	const [feat_skill, setFeatSkill] = useState();
	const [feat_archetype, setFeatArchetype] = useState();

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('inventory');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');

	const [easterEgg, setEasterEgg] = useState(0);

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
		return (spell_0[0] != "" || spell_1[0] != "" || spell_2[0] != "" ||
			spell_3[0] != "" || spell_4[0] != "" || spell_5[0] != "" || spell_6[0] != "" ||
			spell_7[0] != "" || spell_8[0] != "" | spell_9[0] != "" || spell_10[0] != ""
		);
	}
	function hasFormulae() {
		return (formulae[0] != "");
	}
	function hasInventory() {
		return (inventory || false);
	}
	function spellist() {
		return ([spell_0, spell_1, spell_2,
			spell_3, spell_4, spell_5, spell_6,
			spell_7, spell_8, spell_9, spell_10]
		)
	}
	function featlist(){
		return ([feat_race, feat_general, 
			feat_class, feat_skill, feat_archetype])
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//получение золота, уровня, даунтайма и опыта
			let characterInfoData = await CharInfoSettings.getFilteredQuery("name", charName);
			console.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setDowntime(characterInfoData[0].downtime);

			//получение инвентаря
			let inventoryData = await InventorySettings.getFilteredQuery("owner", charName);
			console.log("inventory data", inventoryData);

			setInventory(inventoryData.sort((a, b) => b.cost - a.cost));

			//получение черт, заклинаний, формул, черт
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

			setFormulae(characterBuildData[0].formulas.split(','));

			setFeatRace(characterBuildData[0].feat_race.split(','));
			setFeatGeneral(characterBuildData[0].feat_general.split(','));
			setFeatSkill(characterBuildData[0].feat_skill.split(','));
			setFeatClass(characterBuildData[0].feat_class.split(','));
			setFeatArchetype(characterBuildData[0].feat_archetype.split(','));

			setEasterEgg(getRandomInt(14));

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);

			//console.log("new", inventoryData);
		}
		fetchData();
	}, []);

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/campaign/lost_omens', { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<LOMainInfo
						gold={gold}
						downtime={downtime}
						experience={experience}
						level={level}
						easterEgg={easterEgg} />
					<LOFeatPanel featlist={featlist()}/>
					<Group>
						<LOCharTabPanel
							selected={selected}
							setSelected={setSelected}
							onMenuClick={(opened) => {
								setMenuOpened((prevState) => (opened ? !prevState : false));
							}}
						/>
						{selected === 'inventory' && (!hasInventory()) && (
							<LOInventoryPlaceholder />
						)}
						{selected === 'inventory' && (hasInventory()) && (
							<LOInventory inventory={inventory} />
						)}
						{selected === 'spells' && (!hasSpells()) && (
							<LOSpellsPlaceholder />
						)}
						{selected === 'spells' && (hasSpells()) && (
							<LOSpells spellist={spellist()} />
						)}
						{selected === 'formulae' && (!hasFormulae()) && (
							<LOFormulaePlaceholder />
						)}
						{selected === 'formulae' && (hasFormulae()) && (
							<LOFormulae formulae={formulae} />
						)}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default LOCharacter;
