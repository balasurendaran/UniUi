export const ONLY_LETTERS = "^[A-Za-z]+$";
export const ONLY_NUMBERS = "^[0-9]+$";
export const ONLY_ALPHANUMERIC = "^[A-Za-z0-9]+$";
export const ONLY_EMAIL = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$";
export const ONLY_PHONE = "^[0-9]{10}$"; // Example for 10-digit phone numbers
export const ONLY_URL = "^(https?|ftp)://[^s/$.?#].[^s]*$"; // Basic URL validation
export const ONLY_DATE =
  "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d\\d$"; // DD/MM/YYYY format
export const ONLY_TIME = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"; // HH:MM format
export const ONLY_POSTAL_CODE = "^[0-9]{5}(?:-[0-9]{4})?$"; // US ZIP code format
export const ONLY_CURRENCY = "^[0-9]+(\\.[0-9]{1,2})?$"; // Basic currency format (e.g., 123.45)
export const ONLY_IP_ADDRESS =
  "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"; // IPv4 format
export const ONLY_UUID =
  "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"; // UUID format
export const ONLY_HEX_COLOR = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"; // Hex color format
export const ONLY_BASE64 =
  "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"; // Base64 format
export const ONLY_LATITUDE =
  "^(\\+|-)?(?:90(?:\\.0{1,6})?|[1-8]?\\d(?:\\.\\d{1,6})?)$"; // Latitude format
export const ONLY_LONGITUDE =
  "^(\\+|-)?(?:180(?:\\.0{1,6})?|(?:1[0-7]\\d|\\d{1,2})(?:\\.\\d{1,6})?)$"; // Longitude format
export const ONLY_JSON = "^(\\{.*\\}|\\[.*\\])$"; // Basic JSON format
export const ONLY_IPV6 = "^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$"; // IPv6 format
export const ONLY_CREDIT_CARD =
  "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"; // Credit card format
export const ONLY_SSN =
  "^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$"; // Social Security Number format
export const ONLY_PASSWORD =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"; // At least 8 characters, one uppercase, one lowercase, one number, and one special character
export const ONLY_USERNAME = "^[a-zA-Z0-9._-]{3,20}$"; // Username must be 3-20 characters long, can include letters, numbers, dots, underscores,  and hyphens
export const ONLY_SLUG = "^[a-z0-9]+(?:-[a-z0-9]+)*$"; // Slug format (lowercase letters, numbers, and hyphens)
export const ONLY_IPv4_OR_IPv6 =
  "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$"; // Matches either IPv4 or IPv6 format
export const ONLY_MAC_ADDRESS = "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"; // MAC address format (e.g., "00:1A:2B:3C:4D:5E" or "00-1A-2B-3C-4D-5E")

export const INVALID_USERNAMES = [
  // Offensive/Profane
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "nigger",
  "retard",
  "slut",

  // Hate Speech/Discrimination
  "hitler",
  "kkk",
  "nazi",
  "whitepower",
  "killall[group]",

  // Impersonation/Reserved
  "admin",
  "root",
  "moderator",
  "support",
  "official",
  "system",
  "twitterstaff",

  // Trademarked Brands
  "google",
  "microsoft",
  "playstation",
  "starbucks",
  "mcDonalds",
  "nike",

  // Illegal/Harmful
  "hacker",
  "cracked",
  "piratebay",
  "drugdealer",
  "childporn",
  "scam",

  // Spam/Phishing
  "freeiphonetoday",
  "winprize",
  "clickhere",
  "bitcoinminer",
  "virusdownload",

  // Explicit/Sexual
  "porn",
  "onlyfans",
  "sexmaster",
  "fetish",
  "dickpic",

  // Sensitive Personal Info
  "johnsmith_ssn123",
  "creditcardnumber",
  "password123",
  "myaddress",

  // Generic/Placeholder
  "user123",
  "anonymous",
  "unknown",
  "default",
  "testaccount",

  // Misleading/Dangerous
  "officialpolice",
  "fbi_agent",
  "emergency_responder",
  "fakehospital",

  // Platform-Specific Bans (e.g., gaming)
  "aimbot",
  "cheater",
  "wallhack",
  "stealskins",
];
