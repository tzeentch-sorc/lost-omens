import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMPlayersSheetID} from '../../../consts.js'


const sheetId = SMSpreadSheetID; // SM Geekmo Mirror

const SMPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: SMPlayersSheetID, //sheet "players"
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
		lvl_up: "Повышение"				
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
	},
	range: "A1:J",
});

export default SMPlayerInfoSettings;