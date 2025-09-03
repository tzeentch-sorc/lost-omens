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
	query: {
		colIDs: [ 0, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14],
		colByField: {
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
		fieldByCol: {
			0: "name",
			2: "feat_class",
			3: "feat_general",
			4: "languages",
			7: "spells_0",
			8: "spells_1",
			9: "spells_2",
			10: "spells_3",
			11: "spells_4",
			12: "spells_5",
			13: "spells_6",
			14: "spells_7",
		},
		queryAll: "select A, C, D, E, H, I, J, K, L, M, N, O",
	},
	range: {
		min: 0,
		max: 14,
		str: "A2:S",
	},
});

export default SMCharBuildSettings;