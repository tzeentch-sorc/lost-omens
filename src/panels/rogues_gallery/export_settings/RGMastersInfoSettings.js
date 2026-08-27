import QuerySettings from '../../../util/QuerySettings.js';
import {RGSpreadSheetID, RGMastersSheetID} from '../../../consts.js'

const sheetId = RGSpreadSheetID; // RG Geekmo Mirror

const RGMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: RGMastersSheetID, //sheet "masters"
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

export default RGMastersInfoSettings;