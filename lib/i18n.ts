/**
 * Internationalization (i18n) System
 * Multi-language support with dynamic loading
 */

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'ja' | 'zh'

export interface Translation {
  [key: string]: string | Translation
}

class I18nService {
  private currentLocale: Locale = 'en'
  private translations: Map<Locale, Translation> = new Map()
  private fallbackLocale: Locale = 'en'

  /**
   * Initialize i18n
   */
  async init(locale: Locale = 'en') {
    this.currentLocale = locale
    await this.loadTranslations(locale)
  }

  /**
   * Load translations for a locale
   */
  async loadTranslations(locale: Locale): Promise<void> {
    if (this.translations.has(locale)) return

    try {
      // In production, load from files or API
      const translations = await import(`../locales/${locale}.json`)
      this.translations.set(locale, translations.default)
    } catch {
      console.warn(`Failed to load translations for ${locale}`)
      
      // Load fallback
      if (locale !== this.fallbackLocale) {
        await this.loadTranslations(this.fallbackLocale)
      }
    }
  }

  /**
   * Get translation
   */
  t(key: string, params?: Record<string, string | number>): string {
    const translation = this.getNestedTranslation(key, this.currentLocale)
      || this.getNestedTranslation(key, this.fallbackLocale)
      || key

    if (!params) return translation

    // Replace parameters
    return Object.entries(params).reduce(
      (text, [key, value]) => text.replace(`{{${key}}}`, String(value)),
      translation
    )
  }

  /**
   * Get nested translation
   */
  private getNestedTranslation(key: string, locale: Locale): string | null {
    const translations = this.translations.get(locale)
    if (!translations) return null

    const keys = key.split('.')
    let value: Translation | string = translations

    for (const k of keys) {
      if (typeof value === 'string') return null
      value = value?.[k] as Translation | string
      if (value === undefined) return null
    }

    return typeof value === 'string' ? value : null
  }

  /**
   * Change locale
   */
  async setLocale(locale: Locale): Promise<void> {
    await this.loadTranslations(locale)
    this.currentLocale = locale
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }

  /**
   * Get current locale
   */
  getLocale(): Locale {
    return this.currentLocale
  }

  /**
   * Get available locales
   */
  getAvailableLocales(): Locale[] {
    return ['en', 'es', 'fr', 'de', 'hi', 'ja', 'zh']
  }

  /**
   * Format number
   */
  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLocale, options).format(value)
  }

  /**
   * Format currency
   */
  formatCurrency(value: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat(this.currentLocale, {
      style: 'currency',
      currency
    }).format(value)
  }

  /**
   * Format date
   */
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.currentLocale, options).format(date)
  }

  /**
   * Format relative time
   */
  formatRelativeTime(date: Date): string {
    const now = Date.now()
    const diff = date.getTime() - now
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const rtf = new Intl.RelativeTimeFormat(this.currentLocale, { numeric: 'auto' })

    if (Math.abs(days) > 0) return rtf.format(days, 'day')
    if (Math.abs(hours) > 0) return rtf.format(hours, 'hour')
    if (Math.abs(minutes) > 0) return rtf.format(minutes, 'minute')
    return rtf.format(seconds, 'second')
  }

  /**
   * Detect browser locale
   */
  detectLocale(): Locale {
    if (typeof navigator === 'undefined') return 'en'

    const browserLang = navigator.language.split('-')[0] as Locale
    const available = this.getAvailableLocales()

    return available.includes(browserLang) ? browserLang : 'en'
  }

  /**
   * Check if locale is RTL
   */
  isRTL(locale?: Locale): boolean {
    const rtlLocales: Locale[] = [] // Add RTL locales like 'ar', 'he'
    return rtlLocales.includes(locale || this.currentLocale)
  }
}

export const i18n = new I18nService()
export default i18n

/**
 * React hook for i18n
 */
export function useTranslation() {
  return {
    t: (key: string, params?: Record<string, string | number>) => i18n.t(key, params),
    locale: i18n.getLocale(),
    setLocale: (locale: Locale) => i18n.setLocale(locale),
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => 
      i18n.formatNumber(value, options),
    formatCurrency: (value: number, currency?: string) => 
      i18n.formatCurrency(value, currency),
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => 
      i18n.formatDate(date, options)
  }
}
