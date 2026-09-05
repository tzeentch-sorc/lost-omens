import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMBuildsSheetID} from '../../../consts.js'

const sheetId = SMSpreadSheetID; //SM Geekmo Mirror

const SMCharBuildSettings = new QuerySettings({
	sheetId,
	gid: SMBuildsSheetID, //sheet "builds"
	headrow: 1,
	fields: {
		name: "Персонаж",
		feat_class: "Классовые выборы",
		feat_general: "Черты",
		languages: "Языки",
		spells_0: "Заговоры",
		spells_1: "Заклинания 1",
		spells_2: "Заклинания 2",
		spells_3: "Заклинания 3",
		spells_4: "Заклинания 4",
		spells_5: "Заклинания 5",
		spells_6: "Заклинания 6",
		spells_7: "Заклинания 7",
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