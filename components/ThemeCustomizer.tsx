'use client'

import { useState, useEffect } from 'react'
import { FaPalette, FaFont, FaAdjust, FaSave, FaUndo } from 'react-icons/fa'

interface ThemeConfig {
  primaryColor: string
  accentColor: string
  fontSize: 'small' | 'medium' | 'large'
  density: 'compact' | 'comfortable' | 'spacious'
  borderRadius: 'none' | 'small' | 'medium' | 'large'
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#2563eb',
  accentColor: '#7c3aed',
  fontSize: 'medium',
  density: 'comfortable',
  borderRadius: 'medium'
}

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('themeConfig')
    if (saved) {
      setTheme(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const applyTheme = (config: ThemeConfig) => {
    const root = document.documentElement

    // Colors
    root.style.setProperty('--color-primary', config.primaryColor)
    root.style.setProperty('--color-accent', config.accentColor)

    // Font size
    const fontSizes = { small: '14px', medium: '16px', large: '18px' }
    root.style.setProperty('--font-size-base', fontSizes[config.fontSize])

    // Density (spacing)
    const densities = { compact: '0.75', comfortable: '1', spacious: '1.25' }
    root.style.setProperty('--spacing-scale', densities[config.density])

    // Border radius
    const radii = { none: '0', small: '0.25rem', medium: '0.5rem', large: '1rem' }
    root.style.setProperty('--border-radius', radii[config.borderRadius])
  }

  const saveTheme = () => {
    localStorage.setItem('themeConfig', JSON.stringify(theme))
    alert('Theme saved successfully!')
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
    localStorage.removeItem('themeConfig')
  }

  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = 'theme-config.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-50"
        aria-label="Theme Customizer"
      >
        <FaPalette className="text-2xl" />
      </button>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed right-6 bottom-24 w-80 bg-white rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Theme Customizer</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Primary Color */}
            <div>
              <label className="block mb-2 font-medium">
                <FaPalette className="inline mr-2" />
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="flex-1 p-2 border rounded"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block mb-2 font-medium">
                Accent Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="flex-1 p-2 border rounded"
                />
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block mb-2 font-medium">
                <FaFont className="inline mr-2" />
                Font Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTheme({ ...theme, fontSize: size })}
                    className={`p-2 rounded border-2 ${
                      theme.fontSize === size
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Density */}
            <div>
              <label className="block mb-2 font-medium">
                <FaAdjust className="inline mr-2" />
                Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'comfortable', 'spacious'] as const).map((density) => (
                  <button
                    key={density}
                    onClick={() => setTheme({ ...theme, density })}
                    className={`p-2 rounded border-2 text-sm ${
                      theme.density === density
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    {density.charAt(0).toUpperCase() + density.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block mb-2 font-medium">
                Border Radius
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'small', 'medium', 'large'] as const).map((radius) => (
                  <button
                    key={radius}
                    onClick={() => setTheme({ ...theme, borderRadius: radius })}
                    className={`p-2 rounded border-2 text-sm ${
                      theme.borderRadius === radius
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    {radius.charAt(0).toUpperCase() + radius.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={saveTheme}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <FaSave />
                Save
              </button>
              <button
                onClick={resetTheme}
                className="flex-1 py-2 border rounded hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <FaUndo />
                Reset
              </button>
            </div>

            <button
              onClick={exportTheme}
              className="w-full py-2 border rounded hover:bg-gray-50"
            >
              Export Theme
            </button>
          </div>
        </div>
      )}
    </>
  )
}
