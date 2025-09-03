import QuerySettings from '../../../../util/QuerySettings';
import {SFSpreadSheetID, SFCharactersSheetID} from '../../../../consts.js'

const sheetId = SFSpreadSheetID; // SF Geekmo Mirror

const SFCharInfoSettings = new QuerySettings({
	sheetId,
	gid: SFCharactersSheetID, //sheet "characters" 
	headrow: 1,
	fields: {
		name: "Персонаж",
		id: "ID",
		lvl: "Уровень",
		exp: "Опыт",
		gold: "Кредиты",
		ship: "Корабль",
		mech: "Мех",
		desc: "Описание",
		story: "История"	
	},
	query: {
		colByField: { name: 0, id: 1, lvl: 2, exp: 3, gold: 4, ship: 5, mech: 6, desc: 7, story: 8 },
		fieldByCol: { 0: "name", 1: "id", 2: "lvl", 3: "exp", 4: "gold", 5: "ship", 6: "mech", 7: "desc", 8: "story"},
		colIDs: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
		queryAll: "select A, B, C, D, E, F, G, H, I",
	},
	range: { min: 0, max: 8, str: "A2:I" },
});

export default SFCharInfoSettings;