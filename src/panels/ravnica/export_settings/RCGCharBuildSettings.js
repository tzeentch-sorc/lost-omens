import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGBuildsSheetID} from '../../../consts.js'

const sheetId = RCGSpreadSheetID; //RCG Geekmo Mirror

const RCGCharBuildSettings = new QuerySettings({
	sheetId,
	gid: RCGBuildsSheetID, //sheet "builds"
	headrow: 1,
	fields: {
		name: "Персонаж",
		skills: "Навыки",
		feat_class: "Классовые выборы",
		feat_general: "Черты",
		languages: "Языки",
		instruments: "Владения",
		trainings: "Владения оружием",
		cantrips: "Заговоры",
		spells: "Заклинания",
		attr_str: "Сила",
		attr_dex: "Ловкость",
		attr_con: "Телосложение",
		attr_int: "Интеллект",
		attr_wis: "Мудрость",
		attr_chs: "Харизма"
	},

	columns: {
		name: 0,
		skills: 1,
		feat_class: 2,
		feat_general: 3,
		languages: 4,
		instruments: 5,
		trainings: 6,
		cantrips: 7,
		spells: 8,
		attr_str: 9,
		attr_dex: 10,
		attr_con: 11,
		attr_int: 12,
		attr_wis: 13,
		attr_chs: 14
	},
	range: "A2:O",
});

export default RCGCharBuildSettings;