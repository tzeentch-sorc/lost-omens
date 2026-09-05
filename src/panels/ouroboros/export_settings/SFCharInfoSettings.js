import QuerySettings from '../../../util/QuerySettings';
import {SFSpreadSheetID, SFCharactersSheetID} from '../../../consts.js'

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
	columns: {
		name: 0, id: 1, lvl: 2, exp: 3, gold: 4, ship: 5, mech: 6, desc: 7, story: 8,
	},
	range: "A2:I",
});

export default SFCharInfoSettings;