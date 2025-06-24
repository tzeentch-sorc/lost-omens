import QuerySettings from '../../../util/QuerySettings';
import '../../../util/consts.js'

const sheetId = SMSpreadSheetID; // SM Geekmo Mirror

const SMMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: SMMastersSheetID, //sheet "gms"
	headrow: 1,
	fields: {
		name: "Мастер",
		link: "VK",
		id: "VK ID"
	},
	query: {
		colByField: { 
			name: 0,
			link: 1,
			id: 2
		 },
		fieldByCol: { 
			0: "name",
			1: "link",
			2: "id"
		 },
		colIDs: [ 0, 1, 2 ],
		queryAll: "select A, B, C",
	},
	range: { min: 0, max: 2, str: "A1:C" },
});

export default SMMastersInfoSettings;