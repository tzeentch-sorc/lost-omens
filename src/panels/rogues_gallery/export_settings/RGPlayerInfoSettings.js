import QuerySettings from '../../../util/QuerySettings';
import {RGSpreadSheetID, RGPlayersSheetID} from '../../../consts.js'

const sheetId = RGSpreadSheetID; // RG Geekmo Mirror

const RGPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: RGPlayersSheetID, //sheet "players"
	headrow: 1,
	fields: {
		id: "VK",
		char_name: "Персонаж",	
		char_class: "Роль",
		owner: "Чья жопа",
		lvl_up: "Повышение"				
	},
	columns: {
		id: 0,
		char_name: 1,
		char_class: 2,
		owner: 3,
		lvl_up: 4,
	},
	range: "A1:E",
});

export default RGPlayerInfoSettings;