import QuerySettings from '../../QuerySettings.js';

const sheetId = "1-CYeR6NCErpwoB2DjjhpKh2SHeSCdcVUclP1wuItXq8";

const CharInfoSettings = new QuerySettings({
	sheetId,
	gid: 726487847, //sheet "Персонажи" gold exp lvl dt
	headrow: 4,
	fields: {
		name: "Персонаж",
		lvl: "Уровень",
		exp: "Опыт",
		downtime: "Даунтайм",
		gold: "Золото"		
	},
	query: {
		colByField: { name: 4, lvl: 7, exp: 8, downtime: 16, gold:21},
		fieldByCol: { 4: "name", 7: "lvl", 8: "exp", 16: "downtime", 21: "gold" },
		colIDs: [ 4, 7, 8, 16, 21 ],
	},
	range: { min: 4, max: 21, str: "E4:V" },
});

export default CharInfoSettings;