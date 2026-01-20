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
	query: {
		colByField: { name: 0, activity: 1, time: 2, comment: 3, approved: 4, master: 5, date: 6 },
		fieldByCol: { 0: "name", 1: "activity", 2: "time", 3: "comment", 4: "approved", 5: "master", 6: "date" },
		colIDs: [ 0, 1, 2, 3, 4, 5, 6 ],
		queryAll: "select A, B, C, D, E, F,	G",
	},
	range: { min: 0, max: 6, str: "A2:G" },
});

export default RGDowntimeSettings;