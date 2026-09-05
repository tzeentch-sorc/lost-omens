import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOPlayersSheetID} from '../../../consts.js'

const sheetId = LOSpreadSheetID; // LO Geekmo Mirror

const LOPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: LOPlayersSheetID, //sheet "players"
	headrow: 1,
	fields: {
		id: "VK",
		player: "Игрок",
		prio: "Приоритет",
		adv: "Последняя партия",
		adv_date: "Дата партии",
		char_name: "Персонаж",	
		char_class: "Класс",
		race: "Раса",
		lvl: "Уровень",
		lvl_up: "Повышение",
		fullname: "Полное имя",
		room: "Комната",
		background: "Предыстория",
		appearance: "Внешность",
		picture: "Картинка",
	},
	columns: {
		id: 0,
		player: 1,
		prio: 2,
		adv: 3,
		adv_date: 4,
		char_name: 5,
		char_class: 6,
		race: 7,
		lvl: 8,
		lvl_up: 9,
		fullname: 10,
		room: 11,
		background: 12,
		appearance: 13,
		picture: 14,
	},
	range: "A1:O",
});

export default LOPlayerInfoSettings;