import QuerySettings from '../../../util/QuerySettings';
import {SFSpreadSheetID, SFMastersSheetID} from'../../../consts.js'

const sheetId = SFSpreadSheetID; // SF Geekmo Mirror

const SFMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: SFMastersSheetID, //sheet "masters"
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

export default SFMastersInfoSettings;