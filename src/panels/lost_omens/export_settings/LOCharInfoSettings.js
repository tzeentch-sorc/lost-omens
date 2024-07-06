import QuerySettings from '../../QuerySettings.js';

const sheetId = "1fwY9Ea8oQwEs5d7hIThsLf0FFOEX_g9EM7RWJLOS2fQ"; // LO Geekmo Mirror

const CharInfoSettings = new QuerySettings({
	sheetId,
	gid: 550804557, //sheet "characters" 
	headrow: 2,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		downtime: "Даунтайм",
		gold: "Золото"		
	},
	query: {
		colByField: { name: 1, lvl: 3, exp: 6, downtime: 8, gold:7},
		fieldByCol: { 1: "name", 3: "lvl", 6: "exp", 8: "downtime", 7: "gold" },
		colIDs: [ 1, 3, 6, 7, 8 ],
	},
	range: { min: 1, max: 8, str: "B2:I" },
});

export default CharInfoSettings;