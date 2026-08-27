import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGTransactionsSheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; // RG Geekmo Mirror

const RCGTransactionsSettings = new QuerySettings({
	sheetId,
	gid: RCGTransactionsSheetID, //sheet "transactions" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		activity: "Активность",
		money: "Деньги",
		comment: "Комментарий",
		approved: "Подтверждено",
		master: "Мастер",
		date: "Дата"
	},

	columns: {
		name: 0, activity: 1, money: 2, comment: 3, approved: 4, master: 5, date: 6,
	},
	range: "A2:G",
});

export default RCGTransactionsSettings;