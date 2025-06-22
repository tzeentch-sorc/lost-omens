import QuerySettings from '../../../util/QuerySettings';

const sheetId = "1FRkKmWu44biVjYP7cZJkG5RkxkwnjaSPVTke3tsZwp0"; // HG Geekmo Mirror

const HGInventorySettings = new QuerySettings({
	sheetId,
	gid: 346052728, //sheet "inventory"
	headrow: 1,
	fields: {
		name: "Предмет",
		cost: "Цена",
		count: "Шт.",
		owner: "Владелец",
	},
	query: {
		colByField: { name: 0, cost: 1, count: 2, owner: 3 },
		fieldByCol: { 0: "name", 1: "cost", 2: "count", 3: "owner" },
		colIDs: [ 0, 1, 2, 3 ],
		queryAll: "select A, B, C, D",
	},
	range: { min: 0, max: 3, str: "A2:D" },
});

export default HGInventorySettings;