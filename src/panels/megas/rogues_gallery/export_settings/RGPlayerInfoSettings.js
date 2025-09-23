import QuerySettings from '../../../../util/QuerySettings';
import {RGSpreadSheetID, RGPlayersSheetID} from '../../../../consts.js'

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
	query: {
		colByField: { 
			id: 0,
			char_name: 1,
			char_class: 2,
			owner: 3,
			lvl_up: 4
		 },
		fieldByCol: { 
			0: "id",
			1: "char_name",
			2: "char_class",
			3: "owner",
			4: "lvl_up"
		 },
		colIDs: [ 0, 1, 2, 3, 4],
		queryAll: "select A, B, C, D, E",
	},
	range: { min: 0, max: 4, str: "A1:E" },
});

export default RGPlayerInfoSettings;