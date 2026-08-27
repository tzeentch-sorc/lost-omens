import { mastersInfoSettings } from '../../../util/MastersInfoSettings.js';
import { BWSpreadSheetID, BWMastersSheetID } from '../../../consts.js';

const BWMastersInfoSettings = mastersInfoSettings(BWSpreadSheetID, BWMastersSheetID, "VK_ID");

export default BWMastersInfoSettings;
