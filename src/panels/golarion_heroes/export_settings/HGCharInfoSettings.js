import QuerySettings from '../../../util/QuerySettings';

const sheetId = "1FRkKmWu44biVjYP7cZJkG5RkxkwnjaSPVTke3tsZwp0"; // HG Geekmo Mirror

const HGCharInfoSettings = new QuerySettings({
	sheetId,
	gid: 550804557, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Золото",
		mult: "Класс"
	},
	query: {
		colByField: { name: 0, lvl: 1, exp: 2, gold:3, mult: 4},
		fieldByCol: { 0: "name", 1: "lvl", 2: "exp", 3: "gold", 4: "mult" },
		colIDs: [ 0, 1, 2, 3, 4 ],
		queryAll: "select A, B, C, D, E",
	},
	range: { min: 0, max: 4, str: "A2:E" },
});

export default HGCharInfoSettings;