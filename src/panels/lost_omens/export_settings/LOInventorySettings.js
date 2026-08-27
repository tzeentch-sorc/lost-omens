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
	columns: {
		name: 0, cost: 1, count: 2, owner: 3,
	},
	range: "A2:D",
});

export default LOInventorySettings;