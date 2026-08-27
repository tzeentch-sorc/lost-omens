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
		notes: "Внешность",
		photo: "Картинка",
		quenta: "Квента",
	},
	columns: {
		name: 0, lvl: 1, exp: 2, gold:3, downtime: 4, jods: 5, room: 6, fullname: 7, backstory: 8, race: 9, notes: 10, photo: 11, quenta: 12,
	},
	range: "A2:M",
});

export default LOCharInfoSettings;
