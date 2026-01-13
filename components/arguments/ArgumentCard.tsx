'use client';

import { useState } from 'react';
import { Argument } from '@/lib/types';

interface ArgumentCardProps {
  argument: Argument;
}

export default function ArgumentCard({ argument }: ArgumentCardProps) {
  const [showLimitations, setShowLimitations] = useState(false);

  // Calculate quality score position for radial progress
  const circumference = 2 * Math.PI * 36; // radius = 36
  const strokeDashoffset = circumference - (argument.qualityScore / 100) * circumference;

  // Color based on quality score
  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-teal-600';
    return 'text-slate-500';
  };

  const getQualityRingColor = (score: number) => {
    if (score >= 80) return '#0D9488'; // teal-600
    if (score >= 60) return '#14B8A6'; // teal-500
    return '#64748B'; // slate-500
  };

  return (
    <div className="argument-card group">
      <div className="flex items-start justify-between mb-4">
        {/* Quality Score - Radial Progress */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <svg className="transform -rotate-90 w-20 h-20">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#E5E7EB"
                strokeWidth="6"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke={getQualityRingColor(argument.qualityScore)}
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-2xl font-bold ${getQualityColor(argument.qualityScore)}`}>
                {argument.qualityScore}
              </span>
              <span className="text-xs text-gray-500">quality</span>
            </div>
          </div>

          {/* Position badge */}
          <div className="flex flex-col">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              argument.position === 'against' 
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-teal-100 text-teal-700'
            }`}>
              {argument.position === 'against' ? '✗ Against' : '✓ For'}
            </span>
          </div>
        </div>

        {/* Source Credibility */}
        <div className="text-right">
          <div className="text-sm text-gray-600">Source</div>
          <div className={`text-lg font-bold ${getQualityColor(argument.sourceCredibility)}`}>
            {argument.sourceCredibility}/100
          </div>
        </div>
      </div>

      {/* Main Claim */}
      <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
        {argument.mainClaim}
      </h3>

      {/* Evidence */}
      <div className="mb-4">
        <p className="text-slate-700 leading-relaxed">
          {argument.evidence}
        </p>
      </div>

      {/* Supporting Points */}
      {argument.supportingPoints && argument.supportingPoints.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-700 mb-2">Key Points:</div>
          <ul className="space-y-1">
            {argument.supportingPoints.map((point, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-600">
                <span className="text-teal-600 mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source Metadata */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-center text-sm text-slate-600">
          <span className="mr-2">📚</span>
          <div>
            <div className="font-medium">
              {argument.sourceMetadata.authors?.join(', ') || 'Multiple Authors'}
            </div>
            <div className="text-gray-600">
              {argument.sourceMetadata.institution} • {argument.sourceMetadata.yearPublished}
              {argument.sourceMetadata.publicationType && ` • ${argument.sourceMetadata.publicationType}`}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Strength & Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Evidence:</span>
          <span className={`font-semibold ${getQualityColor(argument.evidenceStrength)}`}>
            {argument.evidenceStrength}/100
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {argument.tags?.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Limitations (collapsible) */}
      {argument.limitations && (
        <div className="border-t border-gray-200 pt-3">
          <button
            onClick={() => setShowLimitations(!showLimitations)}
            className="flex items-center justify-between w-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <span>⚠️ Limitations & Caveats</span>
            <span className="text-gray-400">
              {showLimitations ? '▲' : '▼'}
            </span>
          </button>
          {showLimitations && (
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 animate-in fade-in slide-in-from-top-2">
              {argument.limitations}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
