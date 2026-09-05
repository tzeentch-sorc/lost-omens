import { mastersInfoSettings } from '../../../util/MastersInfoSettings.js';
import { HGSpreadSheetID, HGMastersSheetID } from '../../../consts.js';

const HGMastersInfoSettings = mastersInfoSettings(HGSpreadSheetID, HGMastersSheetID, "VK_ID");

export default HGMastersInfoSettings;
