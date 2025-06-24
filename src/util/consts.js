import config from '../../config.json';

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
const LOSpreadSheetID = "1fwY9Ea8oQwEs5d7hIThsLf0FFOEX_g9EM7RWJLOS2fQ"; //LO Geekmo Mirror
const LOBuildsSheetID = 1439947023; //sheet "builds"
const LOCharactersSheetID = 550804557; //sheet "characters" 
const LOPlayersSheetID = 1846907861; //sheet "players" 
const LOMastersSheetID = 111508886; //sheet "masters"
const LOInventorySheetID = 346052728; //sheet "inventory"

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
const SFSpreadSheetID = "1mMETeUIR5AZw63R8AulPkkgtkLu4bztv6tEJ_KsmlEo"; //SF Geekmo Mirror
const SFCharactersSheetID = 1102629437; //sheet "characters" 
const SFPlayersSheetID = 1155921541; //sheet "players" 
const SFMastersSheetID = 256532381; //sheet "masters"

// ----- Additional info -----
const SFArticleLink = 'https://vk.com/@geekmo-ouroboros-invitation';

// ----- Forms -----
const SFLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSesFl9kJ-TmJT4smD3eH1C4l3r3zEPinJJsXsQyFqfZfzYTig/viewform';
const SFCreateLink = 'https://docs.google.com/forms/d/e/1FAIpQLSckArbA9xOBAh_VBKUB9pVSryyrX0uLxGwJwGupVtUVrseaSg/viewform';


// ===== Silver Marshes (Dungeons and Dragons 5 edition) =====
// ----- Spreadsheet -----
const SMSpreadSheetID = "19CwEiAnXosem6qIXmNDsU4x5xV-TZ2dQz6ay5miKciM"; //SM Geekmo Mirror
const SMBuildsSheetID = 2064380271; //sheet "builds"
const SMCharactersSheetID = 0; //sheet "characters" 
const SMPlayersSheetID = 1610912999; //sheet "players" 
const SMMastersSheetID = 779160079; //sheet "gms"
const SMInventorySheetID = 1037912553; //sheet "inventory"

// ----- Additional info -----
const SMArticleLink = 'https://vk.com/@geekmo-dnd-5e-campaign';
const SMCreateLink = 'https://vk.com/@geekmo-new-character-dnd-5e';