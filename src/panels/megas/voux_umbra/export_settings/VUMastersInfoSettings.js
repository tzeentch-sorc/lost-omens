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
	query: {
		colByField: { 
			id: 0,
			name: 1
		 },
		fieldByCol: { 
			0: "id",
			1: "name"
		 },
		colIDs: [ 0, 1 ],
		queryAll: "select A, B",
	},
	range: { min: 0, max: 1, str: "A1:B" },
});

export default VUMastersInfoSettings;