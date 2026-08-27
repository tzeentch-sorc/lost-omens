import QuerySettings from './QuerySettings.js';

// Лист мастеров устроен одинаково в шести кампаниях из семи: VK ID в колонке A, имя в B.
// Исключение — Серебряный Предел: там лист "gms" с тремя колонками и своим порядком,
// поэтому у него собственный файл настроек.
export function mastersInfoSettings(sheetId, gid) {
    return new QuerySettings({
        sheetId,
        gid,
        headrow: 1,
        fields: {
            id: "VK ID",
            name: "Мастер"
        },
        columns: { id: 0, name: 1 },
        range: "A1:B",
    });
}
