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
		room: "Комната",
		fullname: "Полное имя",
		backstory: "Предыстория",
		race: "Раса",
		notes: "Описание",
		photo: "Картинка ВК"
	},
	query: {
		colByField: { name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, jods: 5, room: 6, fullname: 7, backstory: 8, race: 9, notes: 10, photo: 11 },
		fieldByCol: { 0: "name", 1: "lvl", 2: "exp", 3: "gold", 4: "downtime", 5: "jods", 6: "room", 7: "fullname", 8: "backstory", 9: "race", 10: "notes", 11: "photo" },
		colIDs: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		queryAll: "select A, B, C, D, E, F, G, H, I, J, K, L",
	},
	range: { min: 0, max: 11, str: "A2:L" },
});

export default LOCharInfoSettings;