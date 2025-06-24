import config from '../config.json';

// ===== Common =====
const FormPreEnter = "?usp=pp_url";
const FavouriteColor = '#008cff';
const VKToken = config.VKToken;

// ----- Navigation -----
const LOCharacter = '/char/lost_omens';
const LOCampaign = '/campaign/lost_omens';
const SFCharacter = '/char/ouroboros';
const SFCampaign = '/campaign/ouroboros';
const SMCharacter = '/char/silver_marshes';


// ===== Lost Omens (Pathfinder 2 edition) =====
// ----- Spreadsheet -----
const LOSpreadSheetID = config.LostOmens.Mirror; //LO Geekmo Mirror
const LOBuildsSheetID = config.LostOmens.Builds; //sheet "builds"
const LOCharactersSheetID = config.LostOmens.Characters; //sheet "characters"
const LOPlayersSheetID = config.LostOmens.Players; //sheet "players"
const LOMastersSheetID = config.LostOmens.Masters; //sheet "masters"
const LOInventorySheetID = config.LostOmens.Inventory; //sheet "inventory"

// ----- Additional info -----
const LOArticleLink = 'https://vk.com/@geekmo-pathfinder-2e-campaign';
const LOBulletinLink = "https://unidraw.io/app/board/f5649aff5774fb5628f5";

// ----- Forms -----
const LOLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSf4rQ2XSS3zMYp8NLPlh1Oj7eqAMCWFbO7iyW6XdY-i-Aa4dA/viewform';
const LOLvlupPlayer = "&entry.1223877896=";
const LOLvlupChar = "&entry.1161334128=";
const LOLvlupChoice = "&entry.2096407236=";
const LOLvlupLevel = "&entry.1736501258=";

const LOAddItemLink = "https://docs.google.com/forms/d/e/1FAIpQLScuY24zsG6HEHABa5rGwHhBW0B7l9lK-La99b8MJospK_P9Ew/viewform";
const LOAddItemPlayer = "&entry.138981921=";
const LOAddItemChar = "&entry.1777390359=";
const LOAddItemOnParty = "&entry.236814128="; // Полученные предметы (на партии)
const LOAddItemBought = "&entry.1500116348="; // Купленные предметы (вне партии)
const LOAddItemSold = "&entry.1762805081="; // Проданные предметы (вне партии)
const LOAddItemService = "&entry.1805043020="; // Купленные иные услуги
const LOAddItemChange = "&entry.174313451="; // Изменение количества монет


// ===== Ouroboros (Starfinder 1 edition) =====
// ----- Spreadsheet -----
const SFSpreadSheetID = config.Ouroboros.Mirror; //SF Geekmo Mirror
const SFCharactersSheetID = config.Ouroboros.Characters; //sheet "characters"
const SFPlayersSheetID = config.Ouroboros.Players; //sheet "players"
const SFMastersSheetID = config.Ouroboros.Masters; //sheet "masters"

// ----- Additional info -----
const SFArticleLink = 'https://vk.com/@geekmo-ouroboros-invitation';

// ----- Forms -----
const SFLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSesFl9kJ-TmJT4smD3eH1C4l3r3zEPinJJsXsQyFqfZfzYTig/viewform';
const SFCreateLink = 'https://docs.google.com/forms/d/e/1FAIpQLSckArbA9xOBAh_VBKUB9pVSryyrX0uLxGwJwGupVtUVrseaSg/viewform';


// ===== Silver Marshes (Dungeons and Dragons 5 edition) =====
// ----- Spreadsheet -----
const SMSpreadSheetID = config.SilverMarshes.Mirror; //SM Geekmo Mirror
const SMBuildsSheetID = config.SilverMarshes.Builds; //sheet "builds"
const SMCharactersSheetID = config.SilverMarshes.Characters; //sheet "characters"
const SMPlayersSheetID = config.SilverMarshes.Players; //sheet "players"
const SMMastersSheetID = config.SilverMarshes.Masters; //sheet "gms"
const SMInventorySheetID = config.SilverMarshes.Inventory; //sheet "inventory"

// ----- Additional info -----
const SMArticleLink = 'https://vk.com/@geekmo-dnd-5e-campaign';
const SMCreateLink = 'https://vk.com/@geekmo-new-character-dnd-5e';