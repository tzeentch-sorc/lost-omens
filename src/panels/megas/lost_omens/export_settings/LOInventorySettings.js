import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOInventorySheetID} from '../../../consts.js'

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
	},
	query: {
		colByField: { name: 0, cost: 1, count: 2, owner: 3 },
		fieldByCol: { 0: "name", 1: "cost", 2: "count", 3: "owner" },
		colIDs: [ 0, 1, 2, 3 ],
		queryAll: "select A, B, C, D",
	},
	range: { min: 0, max: 3, str: "A2:D" },
});

export default LOInventorySettings;