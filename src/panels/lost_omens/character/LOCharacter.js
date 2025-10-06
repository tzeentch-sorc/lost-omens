import React, { useState, useEffect } from 'react';
import {
	Panel, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, SplitCol, SplitLayout, Div, ModalRoot, ModalPage, ModalPageHeader,
	PanelHeaderClose, List, SimpleCell, InfoRow, Cell, Separator, Title, Text
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import InventoryPlaceholder from '../../common/placeholders/InventoryPlaceholder.js';
import SpellsPlaceholder from '../../common/placeholders/SpellsPlaceholder.js';
import FormulaePlaceholder from '../../common/placeholders/FormulaePlaceholder.js';
import Marquee from '../../common/components/Marquee.js';
import LOCharTabPanel from './LOCharTabPanel.js';
import LOSpells from './LOSpells.js';
import LOInventory from './LOInventory.js';
import LOFormulae from './LOFormulae.js';
import LOMainInfo from './LOMainInfo.js';
import LODescription from './LODescription.js';
import LOQuenta from './LOQuenta.js';

import LOInventorySettings from '../export_settings/LOInventorySettings.js'
import LOCharBuildSettings from '../export_settings/LOCharBuildSettings.js'
import LOCharInfoSettings from '../export_settings/LOCharInfoSettings.js'

import '../../common/css/Character.css';

import LOFeatPanel from './LOFeatPanel.js';
import { tierMap } from './tier-data.js';
import * as logger from '../../../util/Logger.js';
import { getVkPhotoSrc } from '../../../util/GetVkPhotoSrc';

import { LOCampaign, VKToken } from '../../../consts.js'

const LOCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState([]);
	const [tokens, setTokens] = useState(0);
	const [room, setRoom] = useState("");
	const [img, setImg] = useState();
	const [fullname, setFullname] = useState("");
	const [backstory, setBackstory] = useState("");
	const [description, setDescription] = useState("");
	const [race, setRace] = useState("");
	const [quenta, setQuenta] = useState("");
	const [wealth, setWealth] = useState(0);
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

	// const [popout, setPopout] = useState(<ScreenSpinner />)
	const charName = params.get('CharName');
	const player = params.get('Player');

	const [easterEgg, setEasterEgg] = useState(0);

	function hasSpells() {
		return (
			Array.isArray(spell_0) && spell_0[0] !== "" ||
			Array.isArray(spell_1) && spell_1[0] !== "" ||
			Array.isArray(spell_2) && spell_2[0] !== "" ||
			Array.isArray(spell_3) && spell_3[0] !== "" ||
			Array.isArray(spell_4) && spell_4[0] !== "" ||
			Array.isArray(spell_5) && spell_5[0] !== "" ||
			Array.isArray(spell_6) && spell_6[0] !== "" ||
			Array.isArray(spell_7) && spell_7[0] !== "" ||
			Array.isArray(spell_8) && spell_8[0] !== "" ||
			Array.isArray(spell_9) && spell_9[0] !== "" ||
			Array.isArray(spell_10) && spell_10[0] !== ""
		);
	}
	function hasFormulae() {
		return (Array.isArray(formulae) && formulae[0] != "");
	}
	function hasInventory() {
		return (inventory.length > 0);
	}
	function spellist() {
		return ([spell_0, spell_1, spell_2,
			spell_3, spell_4, spell_5, spell_6,
			spell_7, spell_8, spell_9, spell_10]
		)
	}
	function featlist() {
		return ([feat_race, feat_general,
			feat_class, feat_skill, feat_archetype])
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function renderSelectedTab() {
		switch (selected) {
			case 'inventory':
				return hasInventory() ? (
					<LOInventory inventory={inventory} totalWealth={wealth} charName={charName} playerName={player} />
				) : (
					<InventoryPlaceholder />
				);
			case 'spells':
				return hasSpells() ? (
					<LOSpells spellist={spellist()} />
				) : (
					<SpellsPlaceholder />
				);
			case 'formulae':
				return hasFormulae() ? (
					<LOFormulae formulae={formulae} />
				) : (
					<FormulaePlaceholder />
				);
			default:
				return null;
		}
	};

	//TODO rework all modals
	const [modalTier, setModalTier] = useState(null);
	const [activeModal, setActiveModal] = useState(null);

	const MODAL_PAGE_TIERS = 'tier-bonuses';

	const openTierModal = (tierId) => {
		setModalTier(tierMap[tierId]);
		setActiveModal(MODAL_PAGE_TIERS);
	};

	const closeModal = () => {
		setActiveModal(null);
		setModalTier(null);
	};

	const getTierInfo = (lvl) => {
		if (lvl < 5) return 1;
		else if (lvl < 7) return 2;
		else if (lvl < 9) return 3;
		else if (lvl < 11) return 4;
		else return 5;
	};

	const getBonusItemLevel = (lvl) => {
		const tier = getTierInfo(lvl);
		logger.log("tier: ", tier)
		if (tier >= 4) return (lvl - 1)
		if (tier >= 2) return (lvl - 2)
	}

	const modal = (
		<ModalRoot activeModal={activeModal} onClose={closeModal}>
			<ModalPage
				id={MODAL_PAGE_TIERS}
				header={
					<ModalPageHeader>
						Бонусы за достижение ранга
					</ModalPageHeader>
				}
				onClose={closeModal}
			>
				{modalTier && (
					<Div>
						<Cell before={modalTier.getIcon(48)}> <Title level="1" style={{ marginBottom: 12, marginTop: 12 }} inline="true">{modalTier.name}</Title></Cell>
						<Separator />
						<Text style={{ fontStyle: 'italic', padding: 20 }}>{modalTier.description}</Text>
						<Separator />
						<List>
							{modalTier.bonuses.map((bonus, index) => {
								const ruleText = bonus.rule.includes('{level}') ? bonus.rule.replace('{level}', getBonusItemLevel(level)) : bonus.rule;
								return (
									<SimpleCell key={index} multiline>
										<InfoRow header={bonus.title}>{ruleText}</InfoRow>
									</SimpleCell>
								)
							})}
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
			let characterInfoData = await LOCharInfoSettings.getFilteredQuery("name", charName);
			logger.log("character info data", characterInfoData);
			setGold(characterInfoData[0].gold);
			setExperience(characterInfoData[0].exp);
			setLevel(characterInfoData[0].lvl);
			setDowntime(characterInfoData[0].downtime);
			setTokens(characterInfoData[0].jods);
			setRoom(characterInfoData[0].room);
			const url = await getVkPhotoSrc("https://vk.com/photo-37784625_457261155", VKToken);
			//const url = await getVkPhotoSrc(characterInfoData[0].photo, VKToken);
			if (url) setImg(url);
			if (characterInfoData[0].fullname) {
				setFullname(characterInfoData[0].fullname);
			} else {
				setFullname(charName);
			}
			setRace(characterInfoData[0].race);
			setBackstory(characterInfoData[0].backstory);
			//setDescription(characterInfoData[0].notes);
			setDescription("Автоматон. Среднего человеческого роста. Говоря человеческими терминами, 'худощавый'. \n\
Основной каркас создан из потускневшего серого металла. Сочленения и конечности закрыты красными пластинами брони. Имеются многочисленные потёртости, царапины и выбоины.\n\
Глаз-окуляр один, находится посередине призмовидной головы. Неярко светится небесно-голубым, лазуритным цветом.\n\
Одет в скрывающий детали фигуры грязно-зелёный плащ. По совету нашедшего их Искателя, носит магический шарф, позволяющий не выделяться в случае необходимости выхода в свет.\n\
\n\
Характер:\n\
Потеря Родины, памяти и родных привела к попытке ухода в юмор и принятие происходящего с улыбкой. Старается шутить и легко относиться к любой ситуации. Что первое, что второе получаются плохо. Часто излишне болтлив, при этом может нести понятную только ему ахинею.\n\
Свою цель видит в опоре и поддержке союзников. В первую очередь — Вульпеса.\n\
Имеет некоторую предубеждённость к осирийцам, хоть и понимает, что текущие жители ни в чём не виноваты.");
			//setQuenta(characterInfoData[0].quenta);
			setQuenta("https://docs.google.com/document/d/13QdzXg847dAlQJ0QdvXWYNjFWLNYAyewVRQI0bvcDRQ/edit?usp=sharing\
				Тогда ещё не Литий был добровольцем, согласившимся на перенос своей души в тело автоматона.Как кинетика, связанного с планом Огня, его определили в отделение Омега, ответственного за магическую поддержку армии Джистки.\n\
				В ходе боёв армия Джистки была вынуждена отступать, сдавая города.После одного из таких сражений повреждённый Литий вывел мирных жителей в убежище и решил там остаться на некоторое время, войдя в состояние медитации с целью восполнения сил.\n\
				Сон затянулся, и Лития разбудил его собрат - автоматон, проснувшийся немногим ранее.\n\
				Автоматоны обнаружили серьёзные пробелы в памяти и, выдав друг другу временные идентификаторы по названию подразделений, продолжили путь вместе.\n\
				Из - за повреждённых банков памяти(и некоторого изменения положения дел в Элементальных планах) Литий смог восстановить лишь крупицу своих сил, но обнаружил доступ к новому элементу Металла.Это в некоторой мере помогло найти небольшой населённый пункт, где автоматонам посчастливилось найти члена Общества Искателей, который рассказал им краткую и неполную историю последних тысячелетий, а также предложил присоединиться к Обществу.Решив, что в текущих условиях это будет неплохим вариантом, 'братья' - автоматоны согласились на предложение.");
			//получение инвентаря
			let inventoryData = await LOInventorySettings.getFilteredQuery("owner", charName);
			logger.log("inventory data", inventoryData);

			if (inventoryData[0] && inventoryData[0].name) {
				setInventory(inventoryData.sort((a, b) => b.cost - a.cost))
				const totalCost = inventoryData.reduce((counter, elem) => counter + Number(elem.cost), 0);
				setWealth(totalCost);
			}

			//получение черт, заклинаний, формул, черт
			let characterBuildData = await LOCharBuildSettings.getFilteredQuery("name", charName);
			logger.log("character build data", characterBuildData);

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

			// setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			// setTimeout(() => setPopout(null), 1000);

			logger.log("new", inventoryData);
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
			<PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace(LOCampaign, { keepSearchParams: true })} />}>
				<Marquee text={charName} speed={5} repeat={2} rightPadding={70} />
			</PanelHeader>
			<SplitLayout>
				{modal}
				<SplitCol>
					<LOMainInfo
						gold={gold}
						tokens={tokens}
						downtime={downtime}
						experience={experience}
						tier={getTierInfo(level)}
						level={level}
						easterEgg={easterEgg}
						// setPopout={setPopout}
						onOpenTierModal={openTierModal}
					/>
					<Group mode="card">
						<LOFeatPanel featlist={featlist()} />
						<LODescription room={room} imageSrc={img} fullname={fullname} backstory={backstory} description={description} race={race} />
						<LOQuenta text={quenta} />
					</Group>
					<Group mode='card'>
						<LOCharTabPanel
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

export default LOCharacter;