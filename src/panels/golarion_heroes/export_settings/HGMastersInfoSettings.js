import QuerySettings from '../../../util/QuerySettings';
import {HGSpreadSheetID, HGMastersSheetID} from '../../../consts.js'

const sheetId = HGSpreadSheetID; // HG	 Geekmo Mirror

const HGMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: 111508886, //sheet "masters"
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

export default HGMastersInfoSettings;