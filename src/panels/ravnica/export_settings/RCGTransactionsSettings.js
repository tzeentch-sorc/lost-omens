import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGTransactionsSheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; // RСG Geekmo Mirror

const RCGTransactionsSettings = new QuerySettings({
	sheetId,
	gid: RCGTransactionsSheetID, //sheet "transactions" 
	headrow: 1,
	fields: {
		approved: "Подтверждено",
		rep: "Репутация",
		activity: "Описание",
		name: "Персонаж",
		money: "Изменение золота",
		new: "Новая?",
		comment: "Комментарий"
	},

	columns: {
		approved: 0,  rep: 1, activity: 2, name: 3, money: 4, new: 5, comment: 6
	},
	range: "A2:G",
});

export default RCGTransactionsSettings;