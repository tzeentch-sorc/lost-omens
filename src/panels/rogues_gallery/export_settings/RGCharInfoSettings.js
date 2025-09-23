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
		downtime: "Даунтайм",
		freetime: "Свободное время",
		budget: "Бюджет",
		income: "Доход",
		expenses: "Расходы",
		drink: "Напиток",
		helped: "Помог",
		hurt: "Помешал"
	},
	query: {
		colByField: { name: 0, rep: 1, humanity: 2, exp: 3, downtime: 4, freetime: 5, budget: 6, income: 7, expenses: 8, drink: 9, helped: 10, hurt: 11 },
		fieldByCol: { 0: "name", 1: "rep", 2: "humanity", 3: "exp", 4: "downtime", 5: "freetime", 6: "budget", 7: "income", 8: "expenses", 9: "drink", 10: "helped", 11: "hurt" },
		colIDs: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		queryAll: "select A, B, C, D, E, F, G, H, I, J, K, L",
	},
	range: { min: 0, max: 11, str: "A2:L" },
});

export default RGCharInfoSettings;