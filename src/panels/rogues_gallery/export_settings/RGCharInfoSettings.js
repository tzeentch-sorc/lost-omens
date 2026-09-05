import QuerySettings from '../../../util/QuerySettings.js';
import {RGSpreadSheetID, RGCharactersSheetID} from '../../../consts.js'

const sheetId = RGSpreadSheetID; // RG Geekmo Mirror

const RGCharInfoSettings = new QuerySettings({
	sheetId,
	gid: RGCharactersSheetID, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		rep: "Репутация",
		humanity: "Человечность",
		exp: "Опыт в навыке",
		downtime: "Часов даунтайма",
		freetime: "Свободное время",
		budget: "Бюджет",
		income: "Доходы",
		expenses: "Расходы",
		drink: "Напиток",
		helped: "Помог",
		hurt: "Помешал",
		implants: "Импланты"
	},
	columns: {
		name: 0, rep: 1, humanity: 2, exp: 3, downtime: 4, freetime: 5, budget: 6, income: 7, expenses: 8, drink: 9, helped: 10, hurt: 11, implants: 12,
	},
	range: "A2:M",
});

export default RGCharInfoSettings;