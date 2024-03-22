import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Panel, SimpleCell, InfoRow,
	Header, Group, PanelHeaderBack, PanelHeader,
	ScreenSpinner, CardGrid, Card, SplitCol, SplitLayout, Tabs, TabsItem
} from '@vkontakte/vkui';
import { Icon28HourglassOutline, Icon36CoinsStacks3Outline, Icon28CubeBoxOutline, Icon28MagicWandOutline, Icon28EducationOutline } from '@vkontakte/icons'
import { GOOGLE_SCRIPTS_BASE_URL } from '../../App.js'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './Character.css'



const LOCharacter = () => {

	const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();
	const [inventory, setInventory] = useState();
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
			setGold(data.gold);
			setDowntime(data.downtime);
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
					<SimpleCell before={<Icon28EducationOutline width={24} height={24} />}> <div class="not4mob">Формулы</div> </SimpleCell>
				</TabsItem>
			</Tabs>
		);
	};

	/*
		const Scrollable = () => {
			const [mode, setMode] = React.useState('default');
			const [layoutFillMode, setLayoutFillMode] = React.useState('auto');
			const [selected, setSelected] = React.useState('news');
			const [disabled, setDisabled] = React.useState(false);
	
			return (
				<Group>
					<Tabs
						mode={mode}
						layoutFillMode={layoutFillMode}
						withScrollToSelectedTab
						scrollBehaviorToSelectedTab="center"
					>
						<HorizontalScroll arrowSize="m">
							<TabsItem
								selected={selected === 'groups'}
								disabled={disabled}
								onClick={() => setSelected('groups')}
							>
								Сообщества
							</TabsItem>
							<TabsItem
								before={mode === 'default' ? <Icon24NewsfeedOutline /> : <Icon20NewsfeedOutline />}
								after={<Icon16Dropdown />}
								selected={selected === 'news'}
								disabled={disabled}
								onClick={() => setSelected('news')}
							>
								Лента
							</TabsItem>
							<TabsItem
								before={mode === 'default' ? <Icon24ThumbsUpOutline /> : <Icon20ThumbsUpOutline />}
								status={<Badge mode="prominent">Есть новые</Badge>}
								after={<Icon16Dropdown />}
								selected={selected === 'recommendations'}
								disabled={disabled}
								onClick={() => setSelected('recommendations')}
							>
								Рекомендации
							</TabsItem>
							<TabsItem
								before={mode === 'default' ? <Icon24UsersOutline /> : <Icon20UsersOutline />}
								status={
									<Counter mode="prominent" size="s">
										3
									</Counter>
								}
								after={<Icon16Dropdown />}
								selected={selected === 'friends'}
								disabled={disabled}
								onClick={() => setSelected('friends')}
							>
								Друзья
							</TabsItem>
							<TabsItem
								before={mode === 'default' ? <Icon24PictureOutline /> : <Icon20PictureOutline />}
								status={23}
								after={<Icon16Dropdown />}
								selected={selected === 'photos'}
								disabled={disabled}
								onClick={() => setSelected('photos')}
							>
								Фотографии
							</TabsItem>
						</HorizontalScroll>
					</Tabs>
					<FormItem top="mode">
						<CustomSelect
							value={mode}
							options={[
								{
									label: 'default',
									value: 'default',
								},
								{
									label: 'accent',
									value: 'accent',
								},
								{
									label: 'secondary',
									value: 'secondary',
								},
							]}
							onChange={(event) => setMode(event.target.value)}
						/>
					</FormItem>
					<FormItem top="layoutFillMode">
						<CustomSelect
							value={layoutFillMode}
							options={[
								{
									label: 'auto',
									value: 'auto',
								},
								{
									label: 'stretched',
									value: 'stretched',
								},
								{
									label: 'shrinked',
									value: 'shrinked',
								},
							]}
							onChange={(event) => setLayoutFillMode(event.target.value)}
						/>
					</FormItem>
					<Checkbox onChange={() => setDisabled((prev) => !prev)}>disabled</Checkbox>
				</Group>
			);
		};
	*/

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
					</Group>
					<DefaultInPanel
						selected={selected}
						setSelected={setSelected}
						onMenuClick={(opened) => {
							setMenuOpened((prevState) => (opened ? !prevState : false));
						}}
					/>
					{selected === 'inventory' && (
				<Group id="tab-content-inventory" aria-labelledby="tab-inventory" role="tabpanel">
					{inventory && inventory.map(e => createRow(e))}
				</Group>
			)}
			{selected === 'spells' && (
				<Group
					id="tab-content-spells"
					aria-labelledby="tab-spells"
					role="tabpanel"
				>
					Ты думал здесь что-то будет?
				</Group>
			)}
			{selected === 'formulae' && (
				<Group
					id="tab-content-formulae"
					aria-labelledby="tab-formulae"
					role="tabpanel"
				>
					Never gonna give you up...
				</Group>
			)}
				</SplitCol>
			</SplitLayout>
		</Panel>
	);
};

export default LOCharacter;
