import QuerySettings from '../../../util/QuerySettings';
import {SFSpreadSheetID, SFPlayersSheetID} from '../../../consts.js'

const sheetId = SFSpreadSheetID; // SF Geekmo Mirror

const SFPlayerInfoSettings = new QuerySettings({
	sheetId,
	gid: SFPlayersSheetID, //sheet "players"
	headrow: 1,
	fields: {
		id: "VK",
		player: "Игрок",
		prio: "Приоритет",
		char_name: "Персонаж",	
		lvl: "Уровень",
		lvl_up: "Повышение"				
	},
	columns: {
		id: 0,
		player: 1,
		prio: 2,
		char_name: 3,
		lvl: 4,
		lvl_up: 5,
	},
	range: "A1:F",
});

export default SFPlayerInfoSettings;