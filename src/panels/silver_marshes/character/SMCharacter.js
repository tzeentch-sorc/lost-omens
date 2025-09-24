import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol,
	SplitLayout
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import SpellsPlaceholder from '../../common/placeholders/SpellsPlaceholder.js';

import SMCharTabPanel from './SMCharTabPanel.js';
import SMSpells from './SMSpells.js';
import SMInventory from './SMInventory.js';
import SMMainInfo from './SMMainInfo.js';

import SMInventorySettings from '../export_settings/SMInventorySettings.js'
import SMCharBuildSettings from '../export_settings/SMCharBuildSettings.js'
import SMCharInfoSettings from '../export_settings/SMCharInfoSettings.js'

import '../../common/css/Character.css';

import SMFeatPanel from './SMFeatPanel.js';

import { SMCampaign } from '../../../consts.js';
import * as logger from '../../../util/Logger.js'; 
import Marquee from '../../common/components/Marquee.js';

const SMCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState([]);
	const [gold, setGold] = useState(0);
	const [wealth, setWealth] = useState(0);
	const [downtime, setDowntime] = useState(0);
	const [experience, setExperience] = useState();
	const [level, setLevel] = useState();
	const [mult, setMult] = useState();
	const [spell_0, setSpell_0] = useState();
	const [spell_1, setSpell_1] = useState();
	const [spell_2, setSpell_2] = useState();
	const [spell_3, setSpell_3] = useState();
	const [spell_4, setSpell_4] = useState();
	const [spell_5, setSpell_5] = useState();
	const [spell_6, setSpell_6] = useState();
	const [spell_7, setSpell_7] = useState();
	const [feat_general, setFeatGeneral] = useState();
	const [feat_class, setFeatClass] = useState();

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
		logger.log("inventory", inventory);
		logger.log("hasInventory", (inventory.length > 0));
		return (inventory.length > 0);
	}
	function spellist() {
		return ([spell_0, spell_1, spell_2,
			spell_3, spell_4, spell_5, spell_6,
			spell_7]
		)
	}
	function featlist() {
		return ([feat_general,
			feat_class])
	}

	function renderSelectedTab() {
		switch (selected) {
			case 'inventory':
				return hasInventory() ? (
					logger.log("render inventory", inventory),
					<SMInventory inventory={inventory} totalWealth={wealth} />
				) : (
					<InventoryPlaceholder />
				);
			case 'spells':
				return hasSpells() ? (
					<SMSpells spellist={spellist()} />
				) : (
					<SpellsPlaceholder />
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//получение золота, уровня, даунтайма и опыта
			let characterInfoData = await SMCharInfoSettings.getFilteredQuery("name", charName);
			logger.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setDowntime(characterInfoData[0].downtime);
			setMult(characterInfoData[0].mult);

			//получение инвентаря
			let inventoryData = await SMInventorySettings.getFilteredQuery("owner", charName);
			logger.log("inventory data", inventoryData);

			if (inventoryData[0] && inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}

			//получение черт, заклинаний, формул, черт
			let characterBuildData = await SMCharBuildSettings.getFilteredQuery("name", charName);
			logger.log("character build data", characterBuildData);

			setSpell_0(characterBuildData[0].spells_0.split(','));
			setSpell_1(characterBuildData[0].spells_1.split(','));
			setSpell_2(characterBuildData[0].spells_2.split(','));
			setSpell_3(characterBuildData[0].spells_3.split(','));
			setSpell_4(characterBuildData[0].spells_4.split(','));
			setSpell_5(characterBuildData[0].spells_5.split(','));
			setSpell_6(characterBuildData[0].spells_6.split(','));
			setSpell_7(characterBuildData[0].spells_7.split(','));

			setFeatGeneral(characterBuildData[0].feat_general.split(',')); //TODO - rework with ; splitter
			setFeatClass(characterBuildData[0].feat_class.split(','));

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);

			logger.log("new", inventoryData);
		}
		fetchData().catch(console.error);
	}, []);

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace(SMCampaign, { keepSearchParams: true })} />}>
				<Marquee text={charName} speed={5} repeat={2} rightPadding={70} />
			</PanelHeader>
			<SplitLayout popout={popout}>
				<SplitCol>
					<SMMainInfo
						gold={gold}
						downtime={downtime}
						experience={experience}
						level={level}
						mult={mult} />
					<SMFeatPanel featlist={featlist()} />
					<Group mode='card'>
						<SMCharTabPanel
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

export default SMCharacter;
