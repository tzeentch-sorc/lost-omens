import QuerySettings from '../../../util/QuerySettings.js';
import {VUSpreadSheetID, VUMastersSheetID} from '../../../consts.js'

const sheetId = VUSpreadSheetID; // VU Geekmo Mirror

const VUMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: VUMastersSheetID, //sheet "masters"
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

export default VUMastersInfoSettings;