import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMInventorySheetID} from '../../../consts.js'

const sheetId = SMSpreadSheetID; // SM Geekmo Mirror

const SMInventorySettings = new QuerySettings({
	sheetId,
	gid: SMInventorySheetID, //sheet "inventory"
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

export default SMInventorySettings;