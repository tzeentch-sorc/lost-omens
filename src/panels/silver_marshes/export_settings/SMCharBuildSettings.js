import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMBuildsSheetID} from '../../../consts.js'

const sheetId = SMSpreadSheetID; //SM Geekmo Mirror

const SMCharBuildSettings = new QuerySettings({
	sheetId,
	gid: SMBuildsSheetID, //sheet "builds"
	headrow: 1,
	fields: {
		name: "name",
		feat_class: "feat-class",
		feat_general: "feat-general",
		languages: "languages",
		spells_0: "spells-0",
		spells_1: "spells-1",
		spells_2: "spells-2",
		spells_3: "spells-3",
		spells_4: "spells-4",
		spells_5: "spells-5",
		spells_6: "spells-6",
		spells_7: "spells-7",
	},
	columns: {
		name: 0,
		feat_class: 2,
		feat_general: 3,
		languages: 4,
		spells_0: 7,
		spells_1: 8,
		spells_2: 9,
		spells_3: 10,
		spells_4: 11,
		spells_5: 12,
		spells_6: 13,
		spells_7: 14,
	},
	range: "A2:S",
});

export default SMCharBuildSettings;