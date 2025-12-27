'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

type Mood = 'calm' | 'bold' | 'luxury' | 'playful' | 'professional' | 'natural';

const moodPresets: Record<Mood, { hueRange: [number, number]; satRange: [number, number]; lightRange: [number, number] }> = {
  calm: { hueRange: [180, 240], satRange: [20, 50], lightRange: [60, 85] },
  bold: { hueRange: [0, 360], satRange: [70, 100], lightRange: [40, 60] },
  luxury: { hueRange: [260, 300], satRange: [30, 60], lightRange: [20, 40] },
  playful: { hueRange: [0, 360], satRange: [60, 90], lightRange: [50, 75] },
  professional: { hueRange: [200, 240], satRange: [10, 40], lightRange: [30, 70] },
  natural: { hueRange: [80, 140], satRange: [30, 70], lightRange: [40, 70] },
};

export default function GeradorPaletaCores() {
  const t = useTranslations('colorPaletteUI');
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [mood, setMood] = useState<Mood>('professional');
  const [palette, setPalette] = useState<Color[]>([]);
  const [favorites, setFavorites] = useState<Color[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('color-palette-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const generatePalette = () => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    const preset = moodPresets[mood];
    const colors: Color[] = [];

    // Add base color
    colors.push({
      hex: baseColor,
      rgb: baseRgb,
      hsl: baseHsl,
    });

    // Generate 4 complementary colors
    for (let i = 0; i < 4; i++) {
      const hueShift = (preset.hueRange[1] - preset.hueRange[0]) / 4 * i;
      const h = (baseHsl.h + hueShift) % 360;

      const s = preset.satRange[0] + Math.random() * (preset.satRange[1] - preset.satRange[0]);
      const l = preset.lightRange[0] + Math.random() * (preset.lightRange[1] - preset.lightRange[0]);

      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      colors.push({
        hex,
        rgb,
        hsl: { h: Math.round(h), s: Math.round(s), l: Math.round(l) },
      });
    }

    setPalette(colors);
  };

  const getContrastRatio = (color1: Color, color2: Color): number => {
    const getLuminance = (rgb: { r: number; g: number; b: number }) => {
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
        val /= 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const lum1 = getLuminance(color1.rgb);
    const lum2 = getLuminance(color2.rgb);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const getWCAGRating = (ratio: number): { level: string; color: string } => {
    if (ratio >= 7) return { level: 'AAA', color: 'text-green-600' };
    if (ratio >= 4.5) return { level: 'AA', color: 'text-green-500' };
    if (ratio >= 3) return { level: 'AA Large', color: 'text-yellow-600' };
    return { level: 'Fail', color: 'text-red-600' };
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    alert(t('alertColorCopied'));
  };

  const exportCSS = () => {
    const css = palette.map((color, index) =>
      `  --color-${index + 1}: ${color.hex};`
    ).join('\n');

    const fullCSS = `:root {\n${css}\n}`;
    navigator.clipboard.writeText(fullCSS);
    alert(t('alertCSSCopied'));
  };

  const exportJSON = () => {
    const json = JSON.stringify(
      palette.map((color, index) => ({
        name: `color-${index + 1}`,
        hex: color.hex,
        rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
        hsl: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
      })),
      null,
      2
    );

    navigator.clipboard.writeText(json);
    alert(t('alertJSONCopied'));
  };

  const saveFavorite = () => {
    if (palette.length === 0) return;

    const newFavorites = [...favorites, palette].slice(0, 10); // Keep last 10
    setFavorites(newFavorites);
    localStorage.setItem('color-palette-favorites', JSON.stringify(newFavorites));
    alert(t('alertPaletteSaved'));
  };

  const loadFavorite = (index: number) => {
    setPalette(favorites[index]);
  };

  const deleteFavorite = (index: number) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
    localStorage.setItem('color-palette-favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="space-y-6">
      {/* Generator Settings */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>

        <div className="space-y-4">
          {/* Base Color */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cor Base
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-20 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
              />
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('mood')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(Object.keys(moodPresets) as Mood[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`p-3 rounded-lg border-2 capitalize transition ${
                    mood === m
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-dark-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={generatePalette}
            className="w-full"
          >
            {t('generate')}
          </Button>
        </div>
      </div>

      {/* Palette Display */}
      {palette.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('generatedPalette')}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={saveFavorite}
                size="sm"
              >
                ⭐ Salvar
              </Button>
              <Button
                variant="secondary"
                onClick={exportCSS}
                size="sm"
              >
                📋 CSS
              </Button>
              <Button
                variant="secondary"
                onClick={exportJSON}
                size="sm"
              >
                📋 JSON
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-dark-700"
              >
                {/* Color Preview */}
                <div
                  style={{ backgroundColor: color.hex }}
                  className="h-32 cursor-pointer"
                  onClick={() => copyColor(color.hex)}
                  title="Click to copy"
                />

                {/* Color Info */}
                <div className="p-3 bg-white dark:bg-dark-800">
                  <button
                    onClick={() => copyColor(color.hex)}
                    className="w-full text-left"
                  >
                    <p className="font-mono text-sm font-bold mb-1">{color.hex}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contrast Checker */}
      {palette.length >= 2 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('contrastChecker')}</h2>

          <div className="space-y-3">
            {palette.slice(0, 3).map((color1, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {palette.slice(i + 1, i + 3).map((color2, j) => {
                  const ratio = getContrastRatio(color1, color2);
                  const rating = getWCAGRating(ratio);

                  return (
                    <div
                      key={j}
                      className="flex items-center justify-between bg-gray-50 dark:bg-dark-800 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: color1.hex }}
                          />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: color2.hex }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-mono">
                            {color1.hex} / {color2.hex}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Ratio: {ratio.toFixed(2)}:1
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${rating.color}`}>
                        {rating.level}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            <p>AAA: 7:1+ | AA: 4.5:1+ | AA Large: 3:1+ (textos maiores que 18pt)</p>
          </div>
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('favorites')}</h2>

          <div className="space-y-3">
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-50 dark:bg-dark-800 rounded-lg p-3"
              >
                <div className="flex gap-1">
                  {fav.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <div className="flex-1 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => loadFavorite(index)}
                    size="sm"
                  >
                    📥 Carregar
                  </Button>
                  <button
                    onClick={() => deleteFavorite(index)}
                    className="text-red-600 hover:text-red-700 px-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">💡 {t('tips')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t('tip1')}</li>
          <li>{t('tip2')}</li>
          <li>{t('tip3')}</li>
          <li>{t('tip4')}</li>
          <li>{t('tip5')}</li>
        </ul>
      </div>
    </div>
  );
}
