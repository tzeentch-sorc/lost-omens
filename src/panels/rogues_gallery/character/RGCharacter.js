import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol, SplitLayout, Div, ModalRoot, ModalPage, ModalPageHeader,
	PanelHeaderClose, List, SimpleCell, InfoRow, Cell, Title, Text, Button, Spacing, Separator
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
	Icon28HourglassOutline
} from '@vkontakte/icons'

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import FormulaePlaceholder from '../../common/placeholders/FormulaePlaceholder.js';
import DrinkPlaceholder from '../../common/placeholders/DrinkPlaceholder.js';
import RGCharTabPanel from './RGCharTabPanel.js';
//import RGInventory from './RGInventory.js';
//import RGFormulae from './RGFormulae.js';
import RGMainInfo from './RGMainInfo.js';

//import RGInventorySettings from '../export_settings/RGInventorySettings.js'
//import RGCharBuildSettings from '../export_settings/RGCharBuildSettings.js'
import RGCharInfoSettings from '../export_settings/RGCharInfoSettings.js'

import '../../common/css/Character.css';

import RGImplantsPanel from './RGImplantsPanel.js';

import { RGCampaign, RGDrinkHighPlaceholder, RGDrinkLowPlaceholder, RGRequests } from '../../../consts.js'
import * as logger from '../../../util/Logger.js';
import Marquee from '../../common/components/Marquee.js';

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
	const [implants, setImplants] = useState("None");

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [selected, setSelected] = React.useState('drink');

	// const [popout, setPopout] = useState(<ScreenSpinner />)
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

	function hasDrink() {
		return (drink !== "None" && drink !== "");
	}

	function hasImplants() {
		return (implants !== "None" && implants !== "");
	}

	function renderSelectedTab() {
		switch (selected) {
			case 'inventory':
				return hasInventory() ? (
					//<RGInventory inventory={inventory} totalWealth={wealth} charName={charName} playerName={player} />
					logger.log("inventory")
				) : (
					<InventoryPlaceholder />
				);
			case 'formulae':
				return hasFormulae() ? (
					//<RGFormulae formulae={formulae} />
					logger.log("formulae")
				) : (
					<FormulaePlaceholder />
				);
			case 'drink':
				return hasDrink() ? (
					<SimpleCell key="drink" multiline>
						<InfoRow header="Твой спешелти дринк в баре Посмертие">
							{drink.split('\n').map((line, index) => (
								<Text key={index}>{line}</Text>
							))}
						</InfoRow>
					</SimpleCell>
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
	const [modalFaction, setModalFaction] = useState(null);
	const [activeModal, setActiveModal] = useState(null);

	const MODAL_PAGE_FACTION = 'faction_reputation';

	const openFactionModal = () => {
		setModalFaction(true);
		setActiveModal(MODAL_PAGE_FACTION);
	};

	const openRequests = (element) => {
		params.set('CharName', element);
		setParams(params);
		routeNavigator.push(RGRequests, { keepSearchParams: true });
	}

	const closeModal = () => {
		setActiveModal(null);
		setModalFaction(null);
	};

	const modal = (
		<ModalRoot activeModal={activeModal} onClose={closeModal}>
			<ModalPage
				id={MODAL_PAGE_FACTION}
				header={
					<ModalPageHeader>
						Отношения с фракциями
					</ModalPageHeader>
				}
				onClose={closeModal}
			>
				{modalFaction && (
					<Div>
						<Text style={{ fontStyle: 'italic', padding: 20 }}>Ну, кому ты еще насолил?</Text>
						<Separator />
						<List>
							<SimpleCell key="helped" multiline>
								<InfoRow header="Этим ты помог">
									{helped.split('\n').map((line, index) => (
										<Text key={index}>{line}</Text>
									))}
								</InfoRow>
							</SimpleCell>
							<SimpleCell key="hurt" multiline>
								<InfoRow header="А этим - помешал">
									{hurt.split('\n').map((line, index) => (
										<Text key={index}>{line}</Text>
									))}
								</InfoRow>
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
			logger.log("character info data", characterInfoData);
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
			setImplants(characterInfoData[0].implants);

			//получение инвентаря
			/*
			let inventoryData = await RGInventorySettings.getFilteredQuery("owner", charName);
			logger.log("inventory data", inventoryData);

			if (inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}
			*/

			//получение формул
			/*
			setFormulae(characterBuildData[0].formulas.split(','));
			*/


			// setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			// setTimeout(() => setPopout(null), 1000);

			//logger.log("new", inventoryData);
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
			<PanelHeader className="panelHeader"  before={<PanelHeaderBack onClick={() => routeNavigator.replace(RGCampaign, { keepSearchParams: true })} />}>
				<Marquee text={charName} speed={5} repeat={2} rightPadding={70} />
			</PanelHeader>
			<SplitLayout>
                {modal}
                <SplitCol>
					<RGMainInfo charName={charName}
						helped={helped} hurt={hurt}
						rep={rep} humanity={humanity}
						exp={exp} downtime={downtime} freetime={freetime}
						budget={budget} income={income} expenses={expenses}
						// setPopout={setPopout}
						onOpenFactionModal={openFactionModal}
						openRequests={openRequests}
					/>
					{hasImplants() && <RGImplantsPanel implantList={implants} />}
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