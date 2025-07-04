import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMPlayersSheetID} from '../../../util/consts.js'


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
	query: {
		colByField: { 
			id: 0,
			player: 1,
			prio: 2,
			adv: 3,
			adv_date: 4,
			char_name: 5,	
			char_class: 6,
			race: 7,
			lvl: 8,
			lvl_up: 9
		 },
		fieldByCol: { 
			0: "id",
			1: "player",
			2: "prio",
			3: "adv",
			4: "adv_date",
			5: "char_name",	
			6: "char_class",
			7: "race",
			8: "lvl",
			9: "lvl_up"
		 },
		colIDs: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		queryAll: "select A, B, C, D, E, F, G, H, I, J",
	},
	range: { min: 0, max: 9, str: "A1:J" },
});

export default SMPlayerInfoSettings;