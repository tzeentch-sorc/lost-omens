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
		invest: "Can Invest?",
		type: "Категория",
	},
	columns: {
		name: 0, cost: 1, count: 2, owner: 3, invest: 4, type: 5,
	},
	range: "A2:F",
});

export default LOInventorySettings;