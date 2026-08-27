import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol,
	SplitLayout
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import SpellsPlaceholder from '../../common/placeholders/SpellsPlaceholder.js';

import RCGCharTabPanel from './RCGCharTabPanel.js';
import RCGSpells from './RCGSpells.js';
import Inventory from '../../common/components/Inventory.js';
import RCGMainInfo from './RCGMainInfo.js';

import RCGInventorySettings from '../export_settings/RCGInventorySettings.js'
import RCGCharBuildSettings from '../export_settings/RCGCharBuildSettings.js'
import RCGCharInfoSettings from '../export_settings/RCGCharInfoSettings.js'

import '../../common/css/Character.css';

import RCGFeatPanel from './RCGFeatPanel.js';

import { RCGCampaign } from '../../../consts.js';
import * as logger from '../../../util/Logger.js'; 
import Marquee from '../../common/components/Marquee.js';

const RCGCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState([]);
	const [gold, setGold] = useState(0);
	const [wealth, setWealth] = useState(0);
	const [downtime, setDowntime] = useState(0);
	const [experience, setExperience] = useState();
	const [level, setLevel] = useState();
	const [mult, setMult] = useState();
	const [spells, setSpells] = useState();
	const [cantrips, setCantrips] = useState();
	const [feat_general, setFeatGeneral] = useState();
	const [feat_class, setFeatClass] = useState();

	const [selected, setSelected] = React.useState('inventory');

	const [popout, setPopout] = useState(<ScreenSpinner />)
	const charName = params.get('CharName');

	function hasSpells() {
		return (spells[0] != "" || cantrips[0] != "");
	}

	function hasInventory() {
		logger.log("inventory", inventory);
		logger.log("hasInventory", (inventory.length > 0));
		return (inventory.length > 0);
	}
	function spellist() {
		return ([cantrips, spells]
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
					<Inventory inventory={inventory} totalWealth={wealth} />
				) : (
					<InventoryPlaceholder />
				);
			case 'spells':
				return hasSpells() ? (
					<RCGSpells spellist={spellist()} />
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
			let characterInfoData = await RCGCharInfoSettings.getFilteredQuery("name", charName);
			logger.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setDowntime(characterInfoData[0].downtime);
			setMult(characterInfoData[0].mult);

			//получение инвентаря
			let inventoryData = await RCGInventorySettings.getFilteredQuery("owner", charName);
			logger.log("inventory data", inventoryData);

			if (inventoryData[0] && inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}

			//получение черт, заклинаний, формул, черт
			let characterBuildData = await RCGCharBuildSettings.getFilteredQuery("name", charName);
			logger.log("character build data", characterBuildData);

			setSpells(characterBuildData[0].spells.split('\n'));
			setCantrips(characterBuildData[0].cantrips.split('\n'));

			setFeatGeneral(characterBuildData[0].feat_general.split('\n')); //TODO - rework with ; splitter
			setFeatClass(characterBuildData[0].feat_class.split('\n'));

			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);

			logger.log("new", inventoryData);
		}
		fetchData().catch(console.error);
	}, []);

	return (
		<Panel nav='char'>
			<PanelHeader className="panelHeader"  before={<PanelHeaderBack onClick={() => routeNavigator.replace(RCGCampaign, { keepSearchParams: true })} />}>
				<Marquee text={charName} speed={5} repeat={2} rightPadding={70} />
			</PanelHeader>
			<SplitLayout>
                {popout}
                <SplitCol>
					<RCGMainInfo
						gold={gold}
						downtime={downtime}
						experience={experience}
						level={level}
						mult={mult} />
					<RCGFeatPanel featlist={featlist()} />
					<Group mode='card'>
						<RCGCharTabPanel
							selected={selected}
							setSelected={setSelected}
						/>
						{renderSelectedTab()}
					</Group>
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default RCGCharacter;
