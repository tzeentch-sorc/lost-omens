import QuerySettings from '../../../util/QuerySettings';
import {BWSpreadSheetID, BWMastersSheetID} from '../../../consts.js'

const sheetId = BWSpreadSheetID; // BW Geekmo Mirror

const BWMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: BWMastersSheetID, //sheet "masters"
	headrow: 1,
	fields: {
		id: "VK ID",
		name: "Мастер"	
	},
	columns: {
		id: 0,
		name: 1,
	},
	range: "A1:B",
});

export default BWMastersInfoSettings;