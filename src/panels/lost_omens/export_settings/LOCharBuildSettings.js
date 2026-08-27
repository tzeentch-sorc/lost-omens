import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOBuildsSheetID} from '../../../consts.js'

const sheetId = LOSpreadSheetID; //LO Geekmo Mirror

const LOCharBuildSettings = new QuerySettings({
	sheetId,
	gid: LOBuildsSheetID, //sheet "builds"
	headrow: 1,
	fields: {
		name: "Персонаж",
		feat_race: "Расовые черты",
		feat_general: "Общие черты",
		feat_class: "Классовые черты",
		feat_skill: "Черты навыка",
		feat_archetype: "Черты архетипа",
		formulas: "Формулы",
		languages: "Языки",
		spells_0: "Заклинания 0",
		spells_1: "Заклинания 1",
		spells_2: "Заклинания 2",
		spells_3: "Заклинания 3",
		spells_4: "Заклинания 4",
		spells_5: "Заклинания 5",
		spells_6: "Заклинания 6",
		spells_7: "Заклинания 7",
		spells_8: "Заклинания 8",
		spells_9: "Заклинания 9",
		spells_10: "Заклинания 10",
	},
	columns: {
		name: 0,
		feat_race: 1,
		feat_general: 2,
		feat_class: 3,
		feat_skill: 4,
		feat_archetype: 5,
		formulas: 6,
		languages: 7,
		spells_0: 8,
		spells_1: 9,
		spells_2: 10,
		spells_3: 11,
		spells_4: 12,
		spells_5: 13,
		spells_6: 14,
		spells_7: 15,
		spells_8: 16,
		spells_9: 17,
		spells_10: 18,
	},
	range: "A2:S",
});

export default LOCharBuildSettings;