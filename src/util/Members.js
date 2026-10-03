import QuerySettings from './QuerySettings.js';
import { getVkUserUrl } from './VKUserURL.js';
import * as logger from './Logger.js';
import { MembersSpreadSheetID, MembersSheetID } from '../consts.js';

// Общий лист участников всех мег: строка — «VK, Мега, Роль». Роль (игрок или
// мастер) приложению пока не нужна: участник — любой, кто есть в листе.
// В VK у игроков лежит ссылка из листа player, у мастеров — screen_name или
// id<N> без домена из листа masters; getVkUserUrl понимает оба вида.
const membersInfoSettings = new QuerySettings({
    sheetId: MembersSpreadSheetID,
    gid: MembersSheetID, //sheet "members"
    headrow: 1,
    fields: {
        id: "VK",
        mega: "Мега",
    },
    columns: { id: 0, mega: 1 },
    range: "A1:B",
});

async function loadMembers() {
    if (!MembersSpreadSheetID) {
        logger.log("Members spreadsheet is not configured");
        return [];
    }
    try {
        return await membersInfoSettings.getQueryAll() ?? [];
    } catch (e) {
        console.error("Members sheet is unavailable", e);
        return [];
    }
}

// Ключи мег из megas, в которых участвует пользователь.
// Если лист не настроен или не загрузился, меги остаются скрытыми: маршрут
// к ним открыт, и участника всегда можно позвать прямой ссылкой.
// Мега без единой строки проверяется по пустой строке — так DEBUG_MODE
// в дев-сборке работает и без листа: «all» покажет мегу, остальные режимы — нет.
export async function getMemberships(megas, fetchedUser) {
    const rows = await loadMembers();
    logger.log("members: ", rows);
    return new Set(megas.filter(mega => {
        const megaRows = rows.filter(elem => elem.mega === mega);
        return (megaRows.length > 0 ? megaRows : [{}])
            .some(elem => getVkUserUrl(elem, mega, fetchedUser));
    }));
}
