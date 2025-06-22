import QuerySettings from '../../../util/QuerySettings';

const sheetId = "1FRkKmWu44biVjYP7cZJkG5RkxkwnjaSPVTke3tsZwp0"; //HG Geekmo Mirror

const HGCharBuildSettings = new QuerySettings({
	sheetId,
	gid: 1439947023, //sheet "builds"
	headrow: 1,
	fields: {
		name: "name",
		feat_general: "feat-general",
		feat_class: "feat-class",
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
		spells_9: "spells-9"
	},
	query: {
		colIDs: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		colByField: {
			name: 0,
			feat_general: 1,
			feat_class: 2,
			formulas: 3,
			languages: 4,
			spells_0: 5,
			spells_1: 6,
			spells_2: 7,
			spells_3: 8,
			spells_4: 9,
			spells_5: 10,
			spells_6: 11,
			spells_7: 12,
			spells_8: 13,
			spells_9: 14
		},
		fieldByCol: {
			0: "name",
			1: "feat_general",
			2: "feat_class",
			3: "formulas",
			4: "languages",
			5: "spells_0",
			6: "spells_1",
			7: "spells_2",
			8: "spells_3",
			9: "spells_4",
			10: "spells_5",
			11: "spells_6",
			12: "spells_7",
			13: "spells_8",
			14: "spells_9"
		},
		queryAll: "select A, B, C, D, E, F, G, H, I, J, K, L, M, N, O",
	},
	range: {
		min: 0,
		max: 14,
		str: "A2:O",
	},
});

export default HGCharBuildSettings;