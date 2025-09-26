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
		master: "Мастер"
	},
	query: {
		colByField: { name: 0, activity: 1, time: 2, comment: 3, approved: 4, master: 5 },
		fieldByCol: { 0: "name", 1: "activity", 2: "time", 3: "comment", 4: "approved", 5: "master" },
		colIDs: [ 0, 1, 2, 3, 4, 5 ],
		queryAll: "select A, B, C, D, E, F",
	},
	range: { min: 0, max: 5, str: "A2:F" },
});

export default RGDowntimeSettings;