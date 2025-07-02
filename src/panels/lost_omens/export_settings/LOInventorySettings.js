import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOInventorySheetID} from '../../../util/consts.js'

const sheetId = LOSpreadSheetID; // LO Geekmo Mirror

const LOInventorySettings = new QuerySettings({
	sheetId,
	gid: LOInventorySheetID, //sheet "inventory"
	headrow: 1,
	fields: {
		name: "Предмет",
		cost: "Цена",
		count: "Шт.",
		owner: "Владелец",
		invest: "Can Invest?",
		type: "Категория"
	},
	query: {
		colByField: { name: 0, cost: 1, count: 2, owner: 3, invest: 4, type: 5 },
		fieldByCol: { 0: "name", 1: "cost", 2: "count", 3: "owner", 4: "invest", 5: "type" },
		colIDs: [ 0, 1, 2, 3, 4, 5 ],
		queryAll: "select A, B, C, D, E, F",
	},
	range: { min: 0, max: 3, str: "A2:F" },
});

export default LOInventorySettings;