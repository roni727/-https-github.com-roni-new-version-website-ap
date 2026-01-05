// helpers/phone-helper.js

const countryCodes = {
    // Amerika & Kanada
    '1': 'US/Canada',
    
    // Eropa
    '44': 'UK',
    '33': 'France',
    '49': 'Germany',
    '39': 'Italy',
    '34': 'Spain',
    '31': 'Netherlands',
    '32': 'Belgium',
    '41': 'Switzerland',
    '43': 'Austria',
    '45': 'Denmark',
    '46': 'Sweden',
    '47': 'Norway',
    '48': 'Poland',
    '351': 'Portugal',
    '353': 'Ireland',
    '354': 'Iceland',
    '358': 'Finland',
    '420': 'Czech Republic',
    '421': 'Slovakia',
    '385': 'Croatia',
    '386': 'Slovenia',
    '387': 'Bosnia',
    '389': 'North Macedonia',
    '355': 'Albania',
    '381': 'Serbia',
    '382': 'Montenegro',
    '383': 'Kosovo',
    '40': 'Romania',
    '36': 'Hungary',
    '359': 'Bulgaria',
    '30': 'Greece',
    '90': 'Turkey',
    '7': 'Russia/Kazakhstan',
    
    // Asia
    '81': 'Japan',
    '82': 'South Korea',
    '86': 'China',
    '852': 'Hong Kong',
    '853': 'Macau',
    '886': 'Taiwan',
    '91': 'India',
    '92': 'Pakistan',
    '880': 'Bangladesh',
    '94': 'Sri Lanka',
    '95': 'Myanmar',
    '975': 'Bhutan',
    '977': 'Nepal',
    '960': 'Maldives',
    
    // Asia Tenggara
    '62': 'Indonesia',
    '60': 'Malaysia',
    '63': 'Philippines',
    '66': 'Thailand',
    '84': 'Vietnam',
    '65': 'Singapore',
    '855': 'Cambodia',
    '856': 'Laos',
    '95': 'Myanmar',
    '673': 'Brunei',
    '670': 'Timor-Leste',
    
    // Timur Tengah
    '966': 'Saudi Arabia',
    '971': 'UAE',
    '973': 'Bahrain',
    '974': 'Qatar',
    '968': 'Oman',
    '965': 'Kuwait',
    '964': 'Iraq',
    '963': 'Syria',
    '962': 'Jordan',
    '961': 'Lebanon',
    '972': 'Israel',
    '970': 'Palestine',
    '20': 'Egypt',
    '212': 'Morocco',
    '213': 'Algeria',
    '216': 'Tunisia',
    '218': 'Libya',
    
    // Afrika
    '27': 'South Africa',
    '234': 'Nigeria',
    '254': 'Kenya',
    '256': 'Uganda',
    '255': 'Tanzania',
    '233': 'Ghana',
    '237': 'Cameroon',
    '225': 'Ivory Coast',
    '221': 'Senegal',
    '229': 'Benin',
    '226': 'Burkina Faso',
    '243': 'DR Congo',
    '251': 'Ethiopia',
    '258': 'Mozambique',
    '260': 'Zambia',
    '263': 'Zimbabwe',
    
    // Oseania
    '61': 'Australia',
    '64': 'New Zealand',
    '675': 'Papua New Guinea',
    '679': 'Fiji',
    '683': 'Niue',
    '685': 'Samoa',
    '686': 'Kiribati',
    '687': 'New Caledonia',
    '689': 'French Polynesia',
    
    // Amerika Latin
    '55': 'Brazil',
    '52': 'Mexico',
    '57': 'Colombia',
    '51': 'Peru',
    '54': 'Argentina',
    '56': 'Chile',
    '58': 'Venezuela',
    '593': 'Ecuador',
    '591': 'Bolivia',
    '595': 'Paraguay',
    '598': 'Uruguay',
    '506': 'Costa Rica',
    '507': 'Panama',
    '503': 'El Salvador',
    '502': 'Guatemala',
    '504': 'Honduras',
    '505': 'Nicaragua',
    '506': 'Costa Rica',
    '509': 'Haiti',
    '1-809': 'Dominican Republic',
    '1-868': 'Trinidad and Tobago',
    '1-767': 'Dominica',
    '1-758': 'Saint Lucia',
    
    // Karibia
    '1-242': 'Bahamas',
    '1-246': 'Barbados',
    '1-284': 'British Virgin Islands',
    '1-345': 'Cayman Islands',
    '1-441': 'Bermuda',
    '1-473': 'Grenada',
    '1-649': 'Turks and Caicos',
    '1-664': 'Montserrat',
    '1-721': 'Sint Maarten',
    '1-758': 'Saint Lucia',
    '1-784': 'Saint Vincent',
    '1-809': 'Dominican Republic',
    '1-829': 'Dominican Republic',
    '1-849': 'Dominican Republic',
    
    // Pusat & Asia Tengah
    '998': 'Uzbekistan',
    '992': 'Tajikistan',
    '993': 'Turkmenistan',
    '994': 'Azerbaijan',
    '996': 'Kyrgyzstan',
    '998': 'Uzbekistan',
    
    // Lainnya
    '61': 'Christmas Island',
    '672': 'Norfolk Island',
    '246': 'Diego Garcia',
    '500': 'Falkland Islands',
    '590': 'Guadeloupe',
    '596': 'Martinique',
    '681': 'Wallis and Futuna'
};

/**
 * Mendapatkan nama negara berdasarkan kode negara dari nomor telepon
 * @param {string} phoneNumber - Nomor telepon (dalam format internasional tanpa +)
 * @returns {string} - Nama negara atau 'International' jika tidak ditemukan
 */
function getCountryCode(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return 'International';
    }
    
    // Hapus semua karakter non-digit
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Prioritas: cek kode panjang terlebih dahulu (3-4 digit), lalu pendek
    const sortedCodes = Object.keys(countryCodes).sort((a, b) => b.length - a.length);
    
    for (const code of sortedCodes) {
        if (cleanNumber.startsWith(code)) {
            return countryCodes[code];
        }
    }
    
    return 'International';
}

/**
 * Format nomor telepon untuk tampilan
 * @param {string} phoneNumber - Nomor telepon
 * @returns {string} - Nomor yang sudah diformat
 */
function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    
    // Hapus semua karakter non-digit
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format berdasarkan panjang
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
}

/**
 * Validasi format nomor telepon internasional
 * @param {string} phoneNumber - Nomor telepon
 * @returns {Object} - { isValid: boolean, message: string, cleanNumber: string }
 */
function validatePhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber.trim() === '') {
        return {
            isValid: false,
            message: 'Nomor telepon tidak boleh kosong',
            cleanNumber: ''
        };
    }
    
    // Hapus semua karakter non-digit
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Validasi panjang minimal
    if (cleanNumber.length < 7) {
        return {
            isValid: false,
            message: 'Nomor terlalu pendek (minimal 7 digit)',
            cleanNumber: cleanNumber
        };
    }
    
    // Validasi panjang maksimal
    if (cleanNumber.length > 15) {
        return {
            isValid: false,
            message: 'Nomor terlalu panjang (maksimal 15 digit)',
            cleanNumber: cleanNumber
        };
    }
    
    // Validasi tidak boleh diawali 0
    if (cleanNumber.startsWith('0')) {
        return {
            isValid: false,
            message: 'Gunakan format kode negara (contoh: 62, 1, 44) bukan 0',
            cleanNumber: cleanNumber
        };
    }
    
    return {
        isValid: true,
        message: 'Nomor valid',
        cleanNumber: cleanNumber,
        country: getCountryCode(cleanNumber)
    };
}

/**
 * Dapatkan semua kode negara yang tersedia
 * @returns {Array} - Array of { code: string, country: string }
 */
function getAllCountryCodes() {
    return Object.entries(countryCodes).map(([code, country]) => ({
        code,
        country
    }));
}

module.exports = {
    getCountryCode,
    formatPhoneNumber,
    validatePhoneNumber,
    getAllCountryCodes,
    countryCodes // Export juga untuk akses langsung jika perlu
};