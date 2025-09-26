import QuerySettings from '../../../util/QuerySettings.js';
import {RGSpreadSheetID, RGTransactionsSheetID} from '../../../consts.js'

const sheetId = RGSpreadSheetID; // RG Geekmo Mirror

const RGTransactionsSettings = new QuerySettings({
	sheetId,
	gid: RGTransactionsSheetID, //sheet "transactions" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		activity: "Активность",
		money: "Деньги",
		comment: "Комментарий",
		approved: "Подтверждено",
		master: "Мастер"
	},
	query: {
		colByField: { name: 0, activity: 1, money: 2, comment: 3, approved: 4, master: 5 },
		fieldByCol: { 0: "name", 1: "activity", 2: "money", 3: "comment", 4: "approved", 5: "master" },
		colIDs: [ 0, 1, 2, 3, 4, 5 ],
		queryAll: "select A, B, C, D, E, F",
	},
	range: { min: 0, max: 5, str: "A2:F" },
});

export default RGTransactionsSettings;