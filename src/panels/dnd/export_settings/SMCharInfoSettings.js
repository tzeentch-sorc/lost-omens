import QuerySettings from '../../QuerySettings.js';

const sheetId = "19CwEiAnXosem6qIXmNDsU4x5xV-TZ2dQz6ay5miKciM"; // LO Geekmo Mirror

const CharInfoSettings = new QuerySettings({
	sheetId,
	gid: 0, //sheet "characters" 
	headrow: 2,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Золото",
		downtime: "Даунтайм"	
	},
	query: {
		colByField: { name: 0, lvl: 1, exp: 2, gold:3, downtime: 4},
		fieldByCol: { 0: "name", 1: "lvl", 2: "exp", 3: "gold", 4: "downtime" },
		colIDs: [ 0, 1, 2, 3, 4 ],
	},
	range: { min: 0, max: 4, str: "A2:E" },
});

export default CharInfoSettings;