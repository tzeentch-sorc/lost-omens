import QuerySettings from '../../QuerySettings.js';

const sheetId = "19CwEiAnXosem6qIXmNDsU4x5xV-TZ2dQz6ay5miKciM"; // SM Geekmo Mirror

const SMPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: 1610912999, //sheet "players"
	headrow: 2,
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
	},
	range: { min: 0, max: 9, str: "A2:J" },
});

export default SMPlayerInfoSettings;