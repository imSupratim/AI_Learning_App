import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Header from './Header';

const Flashcards = ({ flashcards, onRegenerate, loading }) => {
  const [flippedCards, setFlippedCards] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'single'

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlippedCards({});
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setFlippedCards({});
    }
  };

  const hasCards = flashcards && flashcards.length > 0;

  return (
    <div>
      <Header title="Flashcards" onRegenerate={onRegenerate} loading={loading} content={hasCards} />

      {hasCards ? (
        <div className="space-y-6">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">{flashcards.length} flashcard{flashcards.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('single')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'single'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Study Mode
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {flashcards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => toggleFlip(i)}
                  className="relative h-48 cursor-pointer group perspective"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      flippedCards[i] ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute w-full h-full backface-hidden">
                      <div className="h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 flex flex-col justify-between border-2 border-indigo-400 group-hover:shadow-xl transition-shadow">
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-white text-lg font-semibold text-center leading-relaxed">
                            {card.question}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-white/80 text-sm">
                          <span>Card {i + 1}</span>
                          <span className="flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" />
                            Click to flip
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-2 border-slate-200 group-hover:shadow-xl transition-shadow">
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-slate-700 text-base text-center leading-relaxed">
                            {card.answer}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 text-sm">
                          <span>Card {i + 1}</span>
                          <span className="flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" />
                            Click to flip
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Single Card Study Mode */}
          {viewMode === 'single' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-slate-700">
                    Card {currentIndex + 1} of {flashcards.length}
                  </span>
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <div
                  onClick={() => toggleFlip(currentIndex)}
                  className="relative h-80 cursor-pointer group perspective"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      flippedCards[currentIndex] ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute w-full h-full backface-hidden">
                      <div className="h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-between border-2 border-indigo-400 group-hover:shadow-3xl transition-shadow">
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-white text-2xl font-semibold text-center leading-relaxed">
                            {flashcards[currentIndex].question}
                          </p>
                        </div>
                        <div className="flex items-center justify-center text-white/80 text-sm">
                          <span className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Click anywhere to reveal answer
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <div className="h-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between border-2 border-slate-200 group-hover:shadow-3xl transition-shadow">
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-slate-700 text-xl text-center leading-relaxed">
                            {flashcards[currentIndex].answer}
                          </p>
                        </div>
                        <div className="flex items-center justify-center text-slate-500 text-sm">
                          <span className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Click anywhere to see question
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                    currentIndex === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <button
                  onClick={nextCard}
                  disabled={currentIndex === flashcards.length - 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                    currentIndex === flashcards.length - 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="max-w-2xl mx-auto mt-6">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <p className="text-lg text-slate-600 font-medium mb-2">No flashcards yet</p>
          <p className="text-sm text-slate-500">Click regenerate to create flashcards from your content</p>
        </div>
      )}

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Flashcards;