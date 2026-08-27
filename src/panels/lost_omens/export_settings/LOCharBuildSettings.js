import QuerySettings from '../../../util/QuerySettings';
import {LOSpreadSheetID, LOBuildsSheetID} from '../../../consts.js'

const sheetId = LOSpreadSheetID; //LO Geekmo Mirror

const LOCharBuildSettings = new QuerySettings({
	sheetId,
	gid: LOBuildsSheetID, //sheet "builds"
	headrow: 1,
	fields: {
		name: "name",
		feat_race: "feat-race",
		feat_general: "feat-general",
		feat_class: "feat-class",
		feat_skill: "feat-skill",
		feat_archetype: "feat-archetype",
		formulas: "formulas",
		languages: "languages",
		spells_0: "spells-0",
		spells_1: "spells-1",
		spells_2: "spells-2",
		spells_3: "spells-3",
		spells_4: "spells-4",
		spells_5: "spells-5",
		spells_6: "spells-6",
		spells_7: "spells-7",
		spells_8: "spells-8",
		spells_9: "spells-9",
		spells_10: "spells-10",
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