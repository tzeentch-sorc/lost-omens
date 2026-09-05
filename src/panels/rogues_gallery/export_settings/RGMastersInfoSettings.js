import { mastersInfoSettings } from '../../../util/MastersInfoSettings.js';
import { RGSpreadSheetID, RGMastersSheetID } from '../../../consts.js';

const RGMastersInfoSettings = mastersInfoSettings(RGSpreadSheetID, RGMastersSheetID, "VK_ID");

export default RGMastersInfoSettings;
