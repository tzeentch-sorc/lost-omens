import QuerySettings from '../QuerySettings.js';

const sheetId = "1-CYeR6NCErpwoB2DjjhpKh2SHeSCdcVUclP1wuItXq8";

const InventorySettings = new QuerySettings({
	sheetId,
	gid: 1046921888,
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
	},
	range: { min: 0, max: 3, str: "A1:D" },
});

export default InventorySettings;