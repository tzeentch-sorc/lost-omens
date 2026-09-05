import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMCharactersSheetID} from '../../../consts.js'

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
	columns: {
		name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, mult: 5,
	},
	range: "A2:F",
});

export default SMCharInfoSettings;