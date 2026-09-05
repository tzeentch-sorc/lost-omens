import QuerySettings from './QuerySettings.js';

// Лист мастеров устроен одинаково в шести кампаниях из семи: VK ID в колонке A, имя в B.
// Исключение — Серебряный Предел: там лист "gms" с тремя колонками и своим порядком,
// поэтому у него собственный файл настроек.
// idHeader — у четырёх кампаний из шести колонка называется VK_ID, у LO и SF — VK ID.
export function mastersInfoSettings(sheetId, gid, idHeader = "VK ID") {
    return new QuerySettings({
        sheetId,
        gid,
        headrow: 1,
        fields: {
            id: idHeader,
            name: "Мастер"
        },
        columns: { id: 0, name: 1 },
        range: "A1:B",
    });
}
