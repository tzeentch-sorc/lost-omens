import QuerySettings from '../../../util/QuerySettings.js';
import {RCGSpreadSheetID, RCGExperienceInfoSheetID} from '../../../consts.js'


const sheetId = RCGSpreadSheetID; // RCG Geekmo Mirror

const RCGExperienceInfoSettings = new QuerySettings({
	sheetId,
	gid: RCGExperienceInfoSheetID, //sheet "exp_table"
	headrow: 1,
	fields: {
		level: "level",
		sessions_needed: "sessions_needed",
		total_sessions: "total_sessions"
	},

	columns: {
		level: 0,
		sessions_needed: 1,
		total_sessions: 2
	},
	range: "A1:C",
});

export default RCGExperienceInfoSettings;