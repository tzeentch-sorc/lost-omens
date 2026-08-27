import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGInventorySheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; // RCG Geekmo Mirror

const RCGInventorySettings = new QuerySettings({
	sheetId,
	gid: RCGInventorySheetID, //sheet "inventory"
	headrow: 1,
	fields: {
		name: "Предмет",
		count: "Шт.",
		owner: "Владелец",
	},

	columns: {
		name: 0, count: 1, owner: 2,
	},
	range: "A2:D",
});

export default RCGInventorySettings;