import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, SplitCol, SplitLayout, Tabs, TabsItem, Div, Placeholder
} from '@vkontakte/vkui';
import {
	Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon28CubeBoxOutline,
	Icon28MagicWandOutline, Icon24BookSpreadOutline, Icon28MagicHatOutline, 
	Icon28MortarOutline, Icon56DiamondOutline
} from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import '../Character.css'



const LOCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
	const [spellList, setSpellList] = useState();
	const [formulae, setFormulae] = useState();
	const [gold, setGold] = useState(0);
	const [downtime, setDowntime] = useState(0);

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


	useEffect(() => {
		async function fetchData() {
			const data = await axios.post(GOOGLE_SCRIPTS_BASE_URL + "?id=" + charName).then(resp => {
				return resp.data
			})
			setInventory(data.inventory.sort((a, b) => b[1] - a[1]));
			setSpellList(data.spells);
			setFormulae(data.formulae);
			setGold(data.gold);
			setDowntime(data.downtime);
			setPopout(<ScreenSpinner state="done">Успешно</ScreenSpinner>);
			setTimeout(() => setPopout(null), 1000);
			console.log(data.inventory)
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
					<SimpleCell before={<Icon28CubeBoxOutline width={24} height={24} />}> <div class="not4mob">Инвентарь</div></SimpleCell>
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
					<SimpleCell before={<Icon28MagicWandOutline width={24} height={24} />}> <div class="not4mob">Заклинания</div></SimpleCell>
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
					<SimpleCell before={<Icon24BookSpreadOutline width={24} height={24} />}> <div class="not4mob">Формулы</div> </SimpleCell>
				</TabsItem>
			</Tabs>
		);
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
								<SimpleCell before={<Icon28HourglassOutline width={24} height={24} />}>{downtime}</SimpleCell>
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
							<Group id="tab-content-inventory" aria-labelledby="tab-inventory" role="tabpanel" mode="plain">
								<Placeholder icon={<Icon56DiamondOutline width={56} height={56} />} header="Здесь будtт ваш инвентарь">
									<Div>
										Сходи, закупись, не скупись!
									</Div>
								</Placeholder>
							</Group>
						)}
						{selected === 'inventory' && inventory && inventory.length >= 1 && (
							<Group id="tab-content-inventory" aria-labelledby="tab-inventory" role="tabpanel" mode="plain">
								{inventory && inventory.map(e => createRow(e))}
							</Group>
						)}
						{selected === 'spells'&& (!spellList || spellList.length < 1) && (
							<Group
								id="tab-content-spells"
								aria-labelledby="tab-spells"
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
						{selected === 'spells' && spellList && spellList.length >= 1 && (
							<Group
								id="tab-content-spells"
								aria-labelledby="tab-spells"
								role="tabpanel"
								mode="plain"
							>
								{spellList && spellList.map(e => createRow(e))}

							</Group>
						)}
						{selected === 'formulae'&& (!formulae || formulae.length < 1) && (
							<Group
								id="tab-content-formulae"
								aria-labelledby="tab-formulae"
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
								aria-labelledby="tab-formulae"
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
