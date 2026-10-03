import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGMagInventorySheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; // RCG Geekmo Mirror

const RCGMagInventorySettings = new QuerySettings({
	sheetId,
	gid: RCGMagInventorySheetID, //sheet "maginventory"
	headrow: 1,
	fields: {
		name: "Предмет",
		link: "Ссылка",
		cost: "Цена",
		count: "Штук",
		owner: "Владелец"
	},

	columns: {
		name: 0, link:1, cost:2, count: 3, owner: 4,
	},
	range: "A2:E",
});

export default RCGMagInventorySettings;