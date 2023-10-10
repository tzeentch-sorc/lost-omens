import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Panel, SimpleCell, InfoRow, Header, Button, Group, Div, PanelHeaderBack , PanelHeader, ScreenSpinner, SplitLayout, SplitCol } from '@vkontakte/vkui';

const Character = ({ id, go, fetchedUser, charName, url }) => {
	const [inventory, setInventory] = useState();
	const [gold, setGold] = useState(0);

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)


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
			const data = await axios.post(url + "?id=" + charName).then(resp => {
				return resp.data
			})
			setInventory(data.inventory);
			setGold(data.gold);
			setPopout(null);
		}
		fetchData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={go}/>}>Lost Omens</PanelHeader>
			<Group header={<Header mode="primary">{charName}</Header>}>
				<SplitLayout popout={popout}>
					<SplitCol>
					<Group header={<Header mode="secondary">Инвентарь</Header>}>
						{inventory && inventory.map(e => createRow(e))}
					</Group>
					</SplitCol>
					<SplitCol>
						<Group header={<Header mode="secondary">Золота: {gold}</Header>}/>
					</SplitCol>
				</SplitLayout>
			</Group>
		</Panel>
	);
};

export default Character;
