import QuerySettings from '../../../util/QuerySettings.js';
import {RGSpreadSheetID, RGDowntimeSheetID} from '../../../consts.js'

const sheetId = RGSpreadSheetID; // RG Geekmo Mirror

const RGDowntimeSettings = new QuerySettings({
	sheetId,
	gid: RGDowntimeSheetID, //sheet "downtime" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		activity: "Активность",
		time: "Время",
		comment: "Комментарий",
		approved: "Подтверждено",
		master: "Мастер",
		date: "Дата"
	},
	columns: {
		name: 0, activity: 1, time: 2, comment: 3, approved: 4, master: 5, date: 6,
	},
	range: "A2:G",
});

export default RGDowntimeSettings;