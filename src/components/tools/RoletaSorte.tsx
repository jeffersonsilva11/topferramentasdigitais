'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface WheelItem {
  id: string;
  label: string;
  color: string;
}

const defaultColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AAB7B8'
];

export default function RoletaSorte() {
  const [items, setItems] = useState<WheelItem[]>([
    { id: '1', label: 'Option 1', color: defaultColors[0] },
    { id: '2', label: 'Option 2', color: defaultColors[1] },
    { id: '3', label: 'Option 3', color: defaultColors[2] },
    { id: '4', label: 'Option 4', color: defaultColors[3] },
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const wheelRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    if (!newLabel.trim()) {
      alert('Please enter a label');
      return;
    }

    const newItem: WheelItem = {
      id: Date.now().toString(),
      label: newLabel.trim(),
      color: defaultColors[items.length % defaultColors.length],
    };

    setItems([...items, newItem]);
    setNewLabel('');
  };

  const removeItem = (id: string) => {
    if (items.length <= 2) {
      alert('You need at least 2 items on the wheel');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const updateLabel = (id: string, label: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, label } : item
    ));
  };

  const spin = () => {
    if (isSpinning) return;
    if (items.length < 2) {
      alert('Add at least 2 items to spin');
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    // Random number of full rotations + random segment
    const randomIndex = Math.floor(Math.random() * items.length);
    const segmentAngle = 360 / items.length;
    const randomSpins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (randomSpins * 360) + (randomIndex * segmentAngle) + (segmentAngle / 2);

    setRotation(finalRotation);

    // Determine winner after spin completes
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % items.length;
      const winningItem = items[winningIndex];

      setWinner(winningItem.label);
      setHistory(prev => [winningItem.label, ...prev.slice(0, 9)]);
      setIsSpinning(false);
    }, 4000); // Match animation duration
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const drawWheel = () => {
    const radius = 200;
    const centerX = 250;
    const centerY = 250;
    const segmentAngle = 360 / items.length;

    return items.map((item, index) => {
      const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
      const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArc = segmentAngle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      // Text position (middle of segment)
      const textAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
      const textRadius = radius * 0.65;
      const textX = centerX + textRadius * Math.cos(textAngle);
      const textY = centerY + textRadius * Math.sin(textAngle);
      const textRotation = index * segmentAngle + segmentAngle / 2;

      return (
        <g key={item.id}>
          <path
            d={pathData}
            fill={item.color}
            stroke="white"
            strokeWidth="3"
          />
          <text
            x={textX}
            y={textY}
            fill="white"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textRotation} ${textX} ${textY})`}
            style={{ pointerEvents: 'none' }}
          >
            {item.label.length > 12 ? item.label.substring(0, 12) + '...' : item.label}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Wheel Display */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Wheel of Fortune</h2>

        <div className="relative flex justify-center items-center mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-600 drop-shadow-lg" />
          </div>

          {/* Wheel SVG */}
          <div
            ref={wheelRef}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
            }}
          >
            <svg width="500" height="500" viewBox="0 0 500 500">
              {/* Wheel segments */}
              {drawWheel()}

              {/* Center circle */}
              <circle
                cx="250"
                cy="250"
                r="30"
                fill="white"
                stroke="#333"
                strokeWidth="3"
              />
              <circle
                cx="250"
                cy="250"
                r="15"
                fill="#333"
              />
            </svg>
          </div>
        </div>

        {/* Spin Button */}
        <Button
          variant="primary"
          onClick={spin}
          disabled={isSpinning || items.length < 2}
          className="w-full text-lg py-4"
        >
          {isSpinning ? '🎡 Spinning...' : '🎯 Spin the Wheel!'}
        </Button>

        {/* Winner Display */}
        {winner && !isSpinning && (
          <div className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-center animate-fade-in">
            <p className="text-sm font-medium text-gray-800 mb-2">🎉 Winner:</p>
            <p className="text-3xl font-bold text-gray-900">{winner}</p>
          </div>
        )}
      </div>

      {/* Items Management */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Manage Items</h2>

        {/* Add Item */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Enter item label"
            className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Button
            variant="primary"
            onClick={addItem}
          >
            ➕ Add
          </Button>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-gray-50 dark:bg-dark-800 rounded-lg p-3"
            >
              <div
                className="w-6 h-6 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateLabel(item.id, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-700 rounded bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 px-3"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Minimum 2 items required. Click on labels to edit them.
        </p>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Spin History</h2>
            <Button
              variant="outline"
              onClick={clearHistory}
              size="sm"
            >
              🗑️ Clear
            </Button>
          </div>

          <div className="space-y-2">
            {history.map((result, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3"
              >
                <p className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">#{history.length - index}:</span>{' '}
                  <span className="font-semibold">{result}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">ℹ️ How to use:</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Add at least 2 items to the wheel</li>
          <li>Click item labels to edit them</li>
          <li>Click "Spin the Wheel" to randomly select a winner</li>
          <li>The wheel uses fair randomization - all items have equal chances</li>
          <li>View your spin history at the bottom</li>
        </ul>
      </div>
    </div>
  );
}
