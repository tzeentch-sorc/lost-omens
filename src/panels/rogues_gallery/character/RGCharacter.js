import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol, SplitLayout, Div, ModalRoot, ModalPage, ModalPageHeader,
	PanelHeaderClose, List, SimpleCell, InfoRow, Cell, Separator, Title, Text
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
	Icon28HourglassOutline
} from '@vkontakte/icons'

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import FormulaePlaceholder from '../../common/placeholders/FormulaePlaceholder.js';
import RGCharTabPanel from './RGCharTabPanel.js';
//import RGInventory from './RGInventory.js';
//import RGFormulae from './RGFormulae.js';
import RGMainInfo from './RGMainInfo.js';

//import RGInventorySettings from '../export_settings/RGInventorySettings.js'
//import RGCharBuildSettings from '../export_settings/RGCharBuildSettings.js'
import RGCharInfoSettings from '../export_settings/RGCharInfoSettings.js'

import '../../common/css/Character.css';

//import RGFeatPanel from './RGFeatPanel.js';

import { RGCampaign } from '../../../consts.js'

const RGCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	//const [inventory, setInventory] = useState([]);
	//const [formulae, setFormulae] = useState();
	const [helped, setHelped] = useState();
	const [hurt, setHurt] = useState();
	const [rep, setRep] = useState();
	const [humanity, setHumanity] = useState();
	const [exp, setExp] = useState();
	const [downtime, setDowntime] = useState();
	const [freetime, setFreetime] = useState();
	const [budget, setBudget] = useState();
	const [income, setIncome] = useState();
	const [expenses, setExpenses] = useState();
	const [drink, setDrink] = useState("None");

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('inventory');

	// const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const charName = params.get('CharName');
	const player = params.get('Player');


	function hasFormulae() {
		//return ( Array.isArray(formulae) && formulae[0] != "");
		return false;
	}

	function hasInventory() {
		//return (inventory.length > 0);
		return false;
	}

	/*
	function featlist() {
		return ([feat_race, feat_general,
			feat_class, feat_skill, feat_archetype])
	}
	*/
	function hasDrink() {
		return (drink !== "None");
	}

	function renderSelectedTab() {
		switch (selected) {
			case 'inventory':
				return hasInventory() ? (
					//<RGInventory inventory={inventory} totalWealth={wealth} charName={charName} playerName={player} />
					console.log("inventory")
				) : (
					<InventoryPlaceholder />
				);
			case 'formulae':
				return hasFormulae() ? (
					//<RGFormulae formulae={formulae} />
					console.log("formulae")
				) : (
					<FormulaePlaceholder />
				);
			case 'drink':
				return hasDrink() ? (
					<Text>{drink}</Text>
				) : (

					rep < 4
						? <DrinkPlaceholder text={RGDrinkLowPlaceholder} />
						: <DrinkPlaceholder text={RGDrinkHighPlaceholder} />

				);
			default:
				return null;
		}
	};

	//TODO rework all modals
	const [modalFraction, setModalFraction] = useState(null);
	const [activeModal, setActiveModal] = useState(null);

	const MODAL_PAGE_FRACTION = 'fraction_reputation';

	const openFractionModal = () => {
		setModalFraction(true);
		setActiveModal(MODAL_PAGE_FRACTION);
	};

	const closeModal = () => {
		setActiveModal(null);
		setModalFraction(null);
	};

	const modal = (
		<ModalRoot activeModal={activeModal} onClose={closeModal}>
			<ModalPage
				id={MODAL_PAGE_FRACTION}
				header={
					<ModalPageHeader>
						Отношения с фракциями
					</ModalPageHeader>
				}
				onClose={closeModal}
			>
				{modalFraction && (
					<Div>
						<List>
							<SimpleCell key="helped" multiline>
								<InfoRow header="Этим ты помог">{helped}</InfoRow>
							</SimpleCell>
							<SimpleCell key="hurt" multiline>
								<InfoRow header="А этим - помешал">{hurt}</InfoRow>
							</SimpleCell>
						</List>
					</Div>
				)}
			</ModalPage>
		</ModalRoot>
	);

	useEffect(() => {
		async function fetchData() {
			//попытка получить через spreadsheetApp
			//получение золота, уровня, даунтайма и опыта
			let characterInfoData = await RGCharInfoSettings.getFilteredQuery("name", charName);
			console.log("character info data", characterInfoData);
			setHelped(characterInfoData[0].helped);
			setHurt(characterInfoData[0].hurt);
			setRep(characterInfoData[0].rep);
			setHumanity(characterInfoData[0].humanity);
			setExp(characterInfoData[0].exp);
			setDowntime(characterInfoData[0].downtime);
			setFreetime(characterInfoData[0].freetime);
			setBudget(characterInfoData[0].budget);
			setIncome(characterInfoData[0].income);
			setExpenses(characterInfoData[0].expenses);
			setDrink(characterInfoData[0].drink);

			//получение инвентаря
			/*
			let inventoryData = await RGInventorySettings.getFilteredQuery("owner", charName);
			console.log("inventory data", inventoryData);

			if (inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}
			*/

			//получение черт, формул
			/*
			let characterBuildData = await RGCharBuildSettings.getFilteredQuery("name", charName);
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
			*/


			// setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			// setTimeout(() => setPopout(null), 1000);

			//console.log("new", inventoryData);
		}
		fetchData().catch(console.error);

		const appRoot = document.querySelector('.vkuiAppRoot');
		if (!appRoot) return;

		if (activeModal) {
			appRoot.style.overflow = 'hidden';
		} else {
			appRoot.style.overflow = '';
		}
	}, [activeModal]);

	return (
		<Panel nav='char'>
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace(RGCampaign, { keepSearchParams: true })} />}>
				{charName}
			</PanelHeader>
			<SplitLayout /*popout={popout} */ modal={modal}>
				<SplitCol>
					<RGMainInfo
						helped={helped} hurt={hurt}
						rep={rep} humanity={humanity}
						exp={exp} downtime={downtime} freetime={freetime}
						budget={budget} income={income} expenses={expenses}
						// setPopout={setPopout}
						onOpenFractionModal={openFractionModal}
					/>
					{/*<RGFeatPanel featlist={featlist()} />*/}
					<Group mode='card'>
						<RGCharTabPanel
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

export default RGCharacter;