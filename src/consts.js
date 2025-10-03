import config from './config.json';

// ===== Common =====
export const FormPreEnter = "?usp=pp_url";
export const FavouriteColor = '#008cff';
export const GoodColor = '#00B86B';
export const BadColor = '#E84C5B';
export const VKToken = config.VKToken;
export const DEBUG_MODE = config.DEBUG_MODE ||
    {
        "LO": "all",
        "SF": "all",
        "SM": "all",
        "RG": "all",
        "HG": "all",
        "BW": "all",
        "VU": "all"
    };
export const DEBUG_VK_IDS = config.DEBUG_VK_IDS ||
    {
        "LO": "",
        "SF": "",
        "SM": "",
        "RG": "",
        "HG": "",
        "BW": "",
        "VU": ""
    };
export const CommonNoCharsBody = 'Для создания стоит написать одному из мастеров';
export const MastersText = 'Этим людям можно написать, если появились вопросы';
export const MastersNoCharsText = 'Этим людям можно написать, если остались вопросы';

// ----- Navigation -----
export const LOCharacter = '/char/lost_omens';
export const LOCampaign = '/campaign/lost_omens';
export const HGCharacter = '/char/golarion_heroes';
export const HGCampaign = '/campaign/golarion_heroes';
export const SFCharacter = '/char/ouroboros';
export const SFCampaign = '/campaign/ouroboros';
export const SMCharacter = '/char/silver_marshes';
export const SMCampaign = '/campaign/silver_marshes';
export const BWCampaign = '/campaign/blue_waters';
export const VUCampaign = '/campaign/voux_umbra';
export const RGCampaign = '/campaign/rogues_gallery';
export const RGCharacter = '/char/rogues_gallery';
export const RGRequests = '/requests/rogues_gallery';


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
export const LOArticleImage = '/images/lo_banner_article.jpg';
export const LONoCharsCaption = 'Добро пожаловать в «Утраченные Пророчества»!';
export const LONoCharsDescription = 'Введение в мир Голариона 2й редакции';

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
export const SFArticleImage = '/images/sf_bannerjpg.jpg';
export const SFNoCharsCaption = 'Добро пожаловать на станцию «Уроборос»!';
export const SFNoCharsDescription = 'Введение в систему и мегакампанию';
export const SFNoCharsBody = 'Кажется, у тебя еще нет персонажа на станции «Уроборос»!';

// ----- Forms -----
export const SFLvlupLink = 'https://docs.google.com/forms/d/e/1FAIpQLSesFl9kJ-TmJT4smD3eH1C4l3r3zEPinJJsXsQyFqfZfzYTig/viewform';
export const SFLvlupChar = "&entry.1593373665=";
export const SFLvlupAgree = "&entry.26974706=";
export const SFCreateLink = 'https://docs.google.com/forms/d/e/1FAIpQLSckArbA9xOBAh_VBKUB9pVSryyrX0uLxGwJwGupVtUVrseaSg/viewform';
export const SFCreatePlayer = "&entry.1374386289=";
export const SFCreateVK = "&entry.1232131845=";


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
export const SMArticleImage = '/images/sm_bannerjpg.jpg';
export const SMNoCharsCaption = 'Добро пожаловать в «Серебряный Предел»!';
export const SMNoCharsDescription = 'Знакомство с мегакампанией';
export const SMSite = 'http://silvermarches.tilda.ws/';

// ===== Blue Waters (Dungeons and Dragons 2024) =====
// ----- Spreadsheet -----
export const BWSpreadSheetID = config.BlueWaters.Mirror; //BW Geekmo Mirror
export const BWMastersSheetID = config.BlueWaters.Masters; //sheet "gms"

// ----- Additional info -----
export const BWArticleLink = 'https://vk.com/@geekmo-megakampaniya-dampd-one-v-geekmo-dobro-pozhalovat-v-sinie-vo';
export const BWArticleImage = '/images/bw_banner.png';
export const BWNoCharsCaption = 'Добро пожаловать в «Синие воды»!';
export const BWNoCharsDescription = 'Знакомство с мегакампанией';


// ===== Voux Umbra (Shadowrun 5 edition) =====
// ----- Spreadsheet -----
export const VUSpreadSheetID = config.VouxUmbra.Mirror; //VU Geekmo Mirror
export const VUMastersSheetID = config.VouxUmbra.Masters; //sheet "gms"

// ----- Additional info -----
export const VUArticleLink = 'https://vk.com/@geekmo-shadowrun-campaign';
export const VUArticleImage = '/images/vu_banner.jpg';
export const VUNoCharsCaption = 'Добро пожаловать в «Глас Теней»!';
export const VUNoCharsDescription = 'Знакомство с мегакампанией';


// ===== Rogues Gallery (Shadowrun 5 edition) =====
// ----- Spreadsheet -----
export const RGSpreadSheetID = config.RoguesGallery.Mirror; //RG Geekmo Mirror
export const RGMastersSheetID = config.RoguesGallery.Masters; //sheet "gms"
export const RGPlayersSheetID = config.RoguesGallery.Players; //sheet "players"
export const RGCharactersSheetID = config.RoguesGallery.Characters; //sheet "characters"
export const RGTransactionsSheetID = config.RoguesGallery.Transactions; //sheet "transactions"
export const RGDowntimeSheetID = config.RoguesGallery.Downtime; // sheet "downtime"

// ----- Additional info -----
export const RGArticleLink = 'https://vk.com/@geekmo-megakampaniya-cyberpunk-2020-v-geekmo-rogues-gallery';
export const RGArticleImage = '/images/rg_banner.jpg';
export const RGNoCharsCaption = 'Добро пожаловать в «Rogues Gallery»!';
export const RGNoCharsDescription = 'Знакомство с мегакампанией';
export const RGDrinkLowPlaceholder = "Ты ещё не заслужил. Наберись опыта, докажи, что ты не гонк, тогда поговорим.";
export const RGDrinkHighPlaceholder = "Добро пожаловать в высшую лигу. Зайди к Харми перед следующим заказом, она запишет твой рецепт.";

// ----- Forms -----
export const RGTransactions = "https://docs.google.com/forms/d/e/1FAIpQLSfng6xGVuvdWjSyb_CuAHQU5YCgxhggbiMysWOmSu8guXGYhg/viewform";
export const RGTransactionsChar = "&entry.1071171589=";

// ===== Golarion Heroes (Pathfinder 1 edition) =====
// ----- Spreadsheet -----
export const HGSpreadSheetID = config.GolarionHeroes.Mirror; //HG Geekmo Mirror
export const HGMastersSheetID = config.GolarionHeroes.Masters; //sheet "gms"

// ----- Additional info -----
export const HGArticleLink = 'https://vk.com/@geekmo-pathfinder-campaign';
export const HGArticleImage = '/images/hg_banner_article.png';
export const HGNoCharsCaption = 'Добро пожаловать к «Героям Голариона»!';
export const HGNoCharsDescription = 'Введение в мир Голариона 1й редакции';
