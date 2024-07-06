import axios from 'axios';

function idOf(i) {
    let res = (i >= 26 ? idOf(Math.floor(i / 26) - 1) : "") + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i % 26]
    //console.log("idof", i, res)
    return res;
}
function parseSimpleCsv(csv) {
    //console.log(csv);
    return csv.split("\n").map(line => line.slice(1, line.length - 1).split("\",\""));
}

async function requestCsv (sheetId, request) {
	let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${request.gid}&range=${request.range}&tqx=out:csv`;
	if ("query" in request) {
		url += `&tq=${encodeURIComponent(request.query)}`;
	}
	const f = await axios.get(url);
    //console.log(url)
    return f.data;
}

class QuerySettings {
    constructor(options) {
        this.sheetId = options.sheetId;
        this.gid = options.gid;
        this.headrow = options.headrow;
        this.fields = options.fields;
        this.query = options.query;
        this.range = options.range;
    }

    async updateSetting() {
        let headers = parseSimpleCsv(await requestCsv(this.sheetId, {
            gid: this.gid,
            range: `${this.headrow}:${this.headrow}`,
        }))[0];
        let min = Infinity; let max = -1;
        let colByField = {}; let fieldByCol = {};
        let colIDs = [];
        for (let [k, v] of Object.entries(this.fields)) {
            let ix = headers.indexOf(v);
            colByField[k] = ix;
            fieldByCol[ix] = k;
            colIDs.push(ix);
            min = Math.min(ix, min);
            max = Math.max(ix, max);
        }
        colIDs = colIDs.sort((a, b) => a - b);
        this.query = {
            colIDs,
            colByField,
            fieldByCol,
            queryAll: `select ${colIDs.map(idOf).join(", ")}`,
        };
        this.range = {
            min,
            max,
            str: `${idOf(min)}${this.headrow}:${idOf(max)}`,
        };
    }

    async getFilteredQuery(field, value) {
        let fieldId = this.query.colByField[field];
        let colIDs = this.query.colIDs.filter(i => i !== fieldId);
        let selected = colIDs.map(idOf).join(", ");
        let queryString = `select ${selected} where ${idOf(fieldId)} = "${value}"`;
        //console.log ("query string",queryString);
        let data = parseSimpleCsv(await requestCsv(this.sheetId, {
            gid: this.gid,
            range: this.range.str,
            query: queryString,
        }));
        //console.log(data);
        return data.map(row => this.createObject(colIDs, row));
    }

    async getQueryAll() {
        let colIDs = this.query.colIDs;
        let data = parseSimpleCsv(await requestCsv(this.sheetId, {
            gid: this.gid,
            range: this.range.str,
            query: this.query.queryAll,
        }));

        if (!this.validateHeaders(colIDs, data[0])) {
            // eslint-disable-next-line no-console
            console.error(`Bad headers q:'${queryString}'`, headers, this.fields);
            return null;
        }

        return data.splice(1).map(row => this.createObject(colIDs, row));
    }

    validateHeaders(colIDs, headers) {
        let success = true;
        for (let x = 0; x < headers.length; x++) {
            let i = colIDs[x];
            let field = this.query.fieldByCol[i];
            if (this.fields[field] !== headers[x]) {
                let find = Object.entries(this.fields)
                    .filter(([_, v]) => v === headers[x]);
                if (find.length === 0) {
                    success = false;
                    continue;
                }
                // find.length > 1 is impossible
                let actualField = find[0][0];
                let swapped = this.query.colByField[find];

                // field: what was expected at [i];
                // actualField: what should be at [i];
                // so: swap column indicies of field and actualField
                this.query.fieldByCol[i] = actualField;
                this.query.fieldByCol[swapped] = field;
                this.query.colByField[field] = swapped;
                this.query.colByField[actualField] = i;
            }
        }
        return true;
    }

    createObject(colIDs, values) {
        let object = {};
        for (let x = 0; x < values.length; x++) {
            let i = colIDs[x];
            object[this.query.fieldByCol[i]] = values[x];
        }
        return object;
    }

    exportAsJson() {
        return JSON.stringify({
            query: this.query,
            range: this.range,
        });
    }
}
export default QuerySettings;