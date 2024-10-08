import QuerySettings from '../../../util/QuerySettings';

const sheetId = "1mMETeUIR5AZw63R8AulPkkgtkLu4bztv6tEJ_KsmlEo"; // SF Geekmo Mirror

const SFMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: 256532381, //sheet "masters"
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

export default SFMastersInfoSettings;