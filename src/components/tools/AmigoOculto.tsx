'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface Participant {
  id: string;
  name: string;
  email?: string;
}

interface Assignment {
  giver: string;
  receiver: string;
}

export default function AmigoOculto() {
  const t = useTranslations('secretSantaUI');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [revealedAssignments, setRevealedAssignments] = useState<Set<string>>(new Set());
  const [isDrawn, setIsDrawn] = useState(false);

  const addParticipant = () => {
    if (!newName.trim()) {
      alert(t('alertEnterName'));
      return;
    }

    if (participants.some(p => p.name.toLowerCase() === newName.toLowerCase())) {
      alert(t('alertNameExists'));
      return;
    }

    const participant: Participant = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim() || undefined,
    };

    setParticipants([...participants, participant]);
    setNewName('');
    setNewEmail('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const drawNames = () => {
    if (participants.length < 3) {
      alert(t('alertMinParticipants'));
      return;
    }

    // Create a derangement (no one gets themselves)
    let receivers = shuffleArray(participants);
    let attempts = 0;
    const maxAttempts = 100;

    // Ensure no one gets themselves
    while (attempts < maxAttempts) {
      let valid = true;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === receivers[i].id) {
          valid = false;
          break;
        }
      }

      if (valid) break;

      receivers = shuffleArray(participants);
      attempts++;
    }

    const newAssignments: Assignment[] = participants.map((giver, index) => ({
      giver: giver.name,
      receiver: receivers[index].name,
    }));

    setAssignments(newAssignments);
    setRevealedAssignments(new Set());
    setIsDrawn(true);
  };

  const revealAssignment = (giverName: string) => {
    setRevealedAssignments(prev => new Set([...prev, giverName]));
  };

  const resetDraw = () => {
    setAssignments([]);
    setRevealedAssignments(new Set());
    setIsDrawn(false);
  };

  const exportResults = () => {
    const text = assignments
      .map(a => `${a.giver} → ${a.receiver}`)
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secret-santa-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const text = assignments
      .map(a => `${a.giver} → ${a.receiver}`)
      .join('\n');

    navigator.clipboard.writeText(text);
    alert(t('resultsCopied'));
  };

  return (
    <div className="space-y-6">
      {/* Add Participants */}
      {!isDrawn && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('addParticipant')}</h2>

          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                placeholder={t('namePlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <Button
              variant="primary"
              onClick={addParticipant}
              className="w-full"
            >
              {t('add')}
            </Button>
          </div>

          {/* Participants List */}
          {participants.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">
                {t('participants')} ({participants.length}):
              </p>
              <div className="space-y-2">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-dark-800 rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      {p.email && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {p.email}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeParticipant(p.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Draw Button */}
      {!isDrawn && participants.length >= 3 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <Button
            variant="primary"
            onClick={drawNames}
            className="w-full text-lg py-4"
          >
            {t('draw')}
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
            {t('minParticipants')}
          </p>
        </div>
      )}

      {/* Results - Individual Reveal */}
      {isDrawn && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('results')}</h2>

          <div className="space-y-3 mb-4">
            {assignments.map((assignment, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-red-50 dark:from-green-900/20 dark:to-red-900/20 rounded-lg p-4 border-2 border-gray-200 dark:border-dark-700"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">{assignment.giver}</p>
                  {!revealedAssignments.has(assignment.giver) ? (
                    <Button
                      variant="primary"
                      onClick={() => revealAssignment(assignment.giver)}
                      size="sm"
                    >
                      {t('reveal')}
                    </Button>
                  ) : (
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('youDraw')}:
                      </p>
                      <p className="text-xl font-bold text-primary-600">
                        {assignment.receiver}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={copyResults}
              className="flex-1"
            >
              {t('copyAll')}
            </Button>
            <Button
              variant="secondary"
              onClick={exportResults}
              className="flex-1"
            >
              {t('export')}
            </Button>
            <Button
              variant="outline"
              onClick={resetDraw}
              className="flex-1"
            >
              {t('newDraw')}
            </Button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">{t('instructions')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t('instruction1')}</li>
          <li>{t('instruction2')}</li>
          <li>{t('instruction3')}</li>
          <li>{t('instruction4')}</li>
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
        <p className="font-semibold mb-2">🔒 {t('privacyNotice')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('privacyNoticeText')}
        </p>
      </div>
    </div>
  );
}
