import QuerySettings from '../../QuerySettings.js';

const sheetId = "19CwEiAnXosem6qIXmNDsU4x5xV-TZ2dQz6ay5miKciM"; //SM Geekmo Mirror

const CharBuildSettings = new QuerySettings({
	sheetId,
	gid: 2064380271, //sheet "builds"
	headrow: 2,
	fields: {
		name: "name",
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
		colIDs: [ 0, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		colByField: {
			name: 0,
			languages: 6,
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
			6: "languages",
			7: "spells_0",
			8: "spells_1",
			9: "spells_2",
			10: "spells_3",
			11: "spells_4",
			12: "spells_5",
			13: "spells_6",
			14: "spells_7",
		},
		queryAll: "select A, G, H, I, J, K, L, M, N, O",
	},
	range: {
		min: 0,
		max: 14,
		str: "A2:O",
	},
});

export default CharBuildSettings;