import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMCharactersSheetID} from '../../../util/consts.js'

const sheetId = SMSpreadSheetID; // SM Geekmo Mirror

const SMCharInfoSettings = new QuerySettings({
	sheetId,
	gid: SMCharactersSheetID, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Золото",
		downtime: "Даунтайм",
		mult: "Класс",	
	},
	query: {
		colByField: { name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, mult: 5},
		fieldByCol: { 0: "name", 1: "lvl", 2: "exp", 3: "gold", 4: "downtime", 5: "mult" },
		colIDs: [ 0, 1, 2, 3, 4, 5 ],
		queryAll: "select A, B, C, D, E, F",
	},
	range: { min: 0, max: 5, str: "A2:F" },
});

export default SMCharInfoSettings;