import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOMastersSheetID} from '../../../consts.js'

const sheetId = LOSpreadSheetID; // LO Geekmo Mirror

const LOMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: LOMastersSheetID, //sheet "masters"
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

export default LOMastersInfoSettings;