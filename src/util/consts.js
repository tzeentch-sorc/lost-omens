import config from '../config.json';

// ===== Common =====
export const FormPreEnter = "?usp=pp_url";
export const FavouriteColor = '#008cff';
export const VKToken = config.VKToken;

// ----- Navigation -----
export const LOCharacter = '/char/lost_omens';
export const LOCampaign = '/campaign/lost_omens';
export const SFCharacter = '/char/ouroboros';
export const SFCampaign = '/campaign/ouroboros';
export const SMCharacter = '/char/silver_marshes';
export const SMCampaign = '/campaign/silver_marshes';
export const BWCampaign = '/campaign/blue_waters';


// ===== Lost Omens (Pathfinder 2 edition) =====
// ----- Spreadsheet -----
export const LOSpreadSheetID = config.LostOmens.Mirror; //LO Geekmo Mirror
export const LOBuildsSheetID = config.LostOmens.Builds; //sheet "builds"
export const LOCharactersSheetID = config.LostOmens.Characters; //sheet "characters"
export const LOPlayersSheetID = config.LostOmens.Players; //sheet "players"
export const LOMastersSheetID = config.LostOmens.Masters; //sheet "masters"
export const LOInventorySheetID = config.LostOmens.Inventory; //sheet "inventory"

// ----- Additional info -----
export const LOArticleLink = 'https://vk.com/@geekmo-pathfinder-2e-campaign';
export const LOBulletinLink = "https://unidraw.io/app/board/f5649aff5774fb5628f5";

// ----- Forms -----
export const LOLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSf4rQ2XSS3zMYp8NLPlh1Oj7eqAMCWFbO7iyW6XdY-i-Aa4dA/viewform';
export const LOLvlupPlayer = "&entry.1223877896=";
export const LOLvlupChar = "&entry.1161334128=";
export const LOLvlupChoice = "&entry.2096407236=";
export const LOLvlupLevel = "&entry.1736501258=";

export const LOAddItemLink = "https://docs.google.com/forms/d/e/1FAIpQLScuY24zsG6HEHABa5rGwHhBW0B7l9lK-La99b8MJospK_P9Ew/viewform";
export const LOAddItemPlayer = "&entry.138981921=";
export const LOAddItemChar = "&entry.1777390359=";
export const LOAddItemOnParty = "&entry.236814128="; // Полученные предметы (на партии)
export const LOAddItemBought = "&entry.1500116348="; // Купленные предметы (вне партии)
export const LOAddItemSold = "&entry.1762805081="; // Проданные предметы (вне партии)
export const LOAddItemService = "&entry.1805043020="; // Купленные иные услуги
export const LOAddItemChange = "&entry.174313451="; // Изменение количества монет


// ===== Ouroboros (Starfinder 1 edition) =====
// ----- Spreadsheet -----
export const SFSpreadSheetID = config.Ouroboros.Mirror; //SF Geekmo Mirror
export const SFCharactersSheetID = config.Ouroboros.Characters; //sheet "characters"
export const SFPlayersSheetID = config.Ouroboros.Players; //sheet "players"
export const SFMastersSheetID = config.Ouroboros.Masters; //sheet "masters"

// ----- Additional info -----
export const SFArticleLink = 'https://vk.com/@geekmo-ouroboros-invitation';

// ----- Forms -----
export const SFLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSesFl9kJ-TmJT4smD3eH1C4l3r3zEPinJJsXsQyFqfZfzYTig/viewform';
export const SFCreateLink = 'https://docs.google.com/forms/d/e/1FAIpQLSckArbA9xOBAh_VBKUB9pVSryyrX0uLxGwJwGupVtUVrseaSg/viewform';


// ===== Silver Marshes (Dungeons and Dragons 5 edition) =====
// ----- Spreadsheet -----
export const SMSpreadSheetID = config.SilverMarshes.Mirror; //SM Geekmo Mirror
export const SMBuildsSheetID = config.SilverMarshes.Builds; //sheet "builds"
export const SMCharactersSheetID = config.SilverMarshes.Characters; //sheet "characters"
export const SMPlayersSheetID = config.SilverMarshes.Players; //sheet "players"
export const SMMastersSheetID = config.SilverMarshes.Masters; //sheet "gms"
export const SMInventorySheetID = config.SilverMarshes.Inventory; //sheet "inventory"

// ----- Additional info -----
export const SMArticleLink = 'https://vk.com/@geekmo-dnd-5e-campaign';
export const SMCreateLink = 'https://vk.com/@geekmo-new-character-dnd-5e';


// ===== Blue Waters (Dungeons and Dragons 2024) =====
// ----- Spreadsheet -----
export const BWSpreadSheetID = config.BlueWaters.Mirror; //BW Geekmo Mirror
export const BWMastersSheetID = config.BlueWaters.Masters; //sheet "gms"

// ----- Additional info -----
export const BWArticleLink = 'https://vk.com/@geekmo-megakampaniya-dampd-one-v-geekmo-dobro-pozhalovat-v-sinie-vo';
