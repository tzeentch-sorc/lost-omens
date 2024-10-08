import QuerySettings from '../../../util/QuerySettings';

const sheetId = "1mMETeUIR5AZw63R8AulPkkgtkLu4bztv6tEJ_KsmlEo"; // SF Geekmo Mirror

const SFPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: 1155921541, //sheet "players"
	headrow: 1,
	fields: {
		id: "VK",
		player: "Игрок",
		prio: "Приоритет",
		char_name: "Персонаж",	
		lvl: "Уровень",
		lvl_up: "Повышение"				
	},
	query: {
		colByField: { 
			id: 0,
			player: 1,
			prio: 2,
			char_name: 3,	
			lvl: 4,
			lvl_up: 5
		 },
		fieldByCol: { 
			0: "id",
			1: "player",
			2: "prio",
			3: "char_name",	
			4: "lvl",
			5: "lvl_up"
		 },
		colIDs: [ 0, 1, 2, 3, 4, 5],
		queryAll: "select A, B, C, D, E, F",
	},
	range: { min: 0, max: 5, str: "A1:F" },
});

export default SFPlayerInfoSettings;