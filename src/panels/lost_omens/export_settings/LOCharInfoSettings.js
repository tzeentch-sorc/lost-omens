import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOCharactersSheetID} from '../../../consts.js'

const sheetId = LOSpreadSheetID; // LO Geekmo Mirror

const LOCharInfoSettings = new QuerySettings({
	sheetId,
	gid: LOCharactersSheetID, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Золото",
		downtime: "Даунтайм",
		jods: "ЖОДы",
		room: "Комната"
	},
	query: {
		colByField: { name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, jods: 5, room: 6},
		fieldByCol: { 0: "name", 1: "lvl", 2: "exp", 3: "gold", 4: "downtime", 5: "jods", 6: "room" },
		colIDs: [ 0, 1, 2, 3, 4, 5, 6 ],
		queryAll: "select A, B, C, D, E, F, G",
	},
	range: { min: 0, max: 6, str: "A2:G" },
});

export default LOCharInfoSettings;