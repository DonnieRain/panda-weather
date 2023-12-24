import en from '@/i18n/en.json'
import uk from '@/i18n/uk.json'

export const defaultLocale = 'en'
export const languages = { en, uk }
export const datetimeFormats = {
    'en': {
        short: {
            month: 'short', day: 'numeric'
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
        }
    },
    'uk': {
        short: {
            month: 'short', day: 'numeric'
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
        }
    }
}