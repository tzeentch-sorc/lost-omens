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

export default HGMastersInfoSettings;