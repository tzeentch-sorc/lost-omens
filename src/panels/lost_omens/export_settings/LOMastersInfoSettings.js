import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOMastersSheetID} from '../../../util/consts.js'

const sheetId = LOSpreadSheetID; // LO Geekmo Mirror

const LOMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: LOMastersSheetID, //sheet "masters"
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

export default LOMastersInfoSettings;