import QuerySettings from '../../../util/QuerySettings';
import {SMSpreadSheetID, SMMastersSheetID} from '../../../consts.js'

const sheetId = SMSpreadSheetID; // SM Geekmo Mirror

const SMMastersInfoSettings = new QuerySettings({
	sheetId,
	gid: SMMastersSheetID, //sheet "gms"
	headrow: 1,
	fields: {
		name: "Имя",
		link: "VK",
		// Заголовок колонки C в листе пуст, хотя данные в ней есть.
		// Поправить может только мастер Серебряного Предела: доступа к таблице нет.
		id: ""
	},
	columns: {
		name: 0,
		link: 1,
		id: 2,
	},
	range: "A1:C",
});

export default SMMastersInfoSettings;