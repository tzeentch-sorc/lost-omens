import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGCharactersSheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; // RCG Geekmo Mirror

const RCGCharInfoSettings = new QuerySettings({
	sheetId,
	gid: RCGCharactersSheetID, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Золото",
		downtime: "Даунтайм",
		mult: "Класс",	
	},

	columns: {
		name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, mult: 5,
	},
	range: "A2:F",
});//WIP пока только те поля, что брали марши.

export default RCGCharInfoSettings;