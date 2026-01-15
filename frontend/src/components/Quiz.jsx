import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, Sparkles, Trophy, Target } from 'lucide-react';
import Header from './Header';

const Quiz = ({ quiz, onRegenerate, loading }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasQuiz = quiz && quiz.length > 0;

  const handleSelectAnswer = (questionIndex, option) => {
    if (submitted) return; // Prevent changes after submission
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const isAnswered = (questionIndex) => {
    return selectedAnswers[questionIndex] !== undefined;
  };

  const isCorrect = (questionIndex) => {
    return selectedAnswers[questionIndex] === quiz[questionIndex].correctAnswer;
  };

  const allAnswered = hasQuiz && Object.keys(selectedAnswers).length === quiz.length;
  const score = submitted ? calculateScore() : 0;
  const percentage = submitted ? Math.round((score / quiz.length) * 100) : 0;

  return (
    <div>
      <Header title="Quiz" onRegenerate={onRegenerate} loading={loading} content={hasQuiz} />

      {hasQuiz ? (
        <div className="space-y-6">
          {/* Quiz Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-2">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {quiz.length} Question{quiz.length !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-slate-600">
                  {submitted ? 'Quiz Completed' : allAnswered ? 'Ready to submit' : 'Select your answers'}
                </p>
              </div>
            </div>
            
            {submitted && (
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            )}
          </div>

          {/* Score Card - Only show after submission */}
          {showResults && (
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Your Score</p>
                    <p className="text-4xl font-bold">
                      {score} / {quiz.length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold mb-1">{percentage}%</div>
                  <p className="text-white/90 text-sm">
                    {percentage >= 80 ? 'Excellent! 🎉' : percentage >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-6">
            {quiz.map((q, i) => {
              const answered = isAnswered(i);
              const correct = isCorrect(i);
              const showCorrectAnswer = submitted && !correct;

              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl shadow-md border-2 p-6 transition-all ${
                    submitted
                      ? correct
                        ? 'border-green-300 bg-green-50/30'
                        : 'border-red-300 bg-red-50/30'
                      : 'border-slate-200 hover:shadow-lg'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      submitted
                        ? correct
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-800 leading-relaxed">
                        {q.question}
                      </p>
                      {submitted && (
                        <div className="flex items-center gap-2 mt-2">
                          {correct ? (
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <CheckCircle2 className="w-4 h-4" />
                              Correct!
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                              <XCircle className="w-4 h-4" />
                              Incorrect
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 ml-11">
                    {q.options.map((opt, idx) => {
                      const isSelected = selectedAnswers[i] === opt;
                      const isCorrectOption = opt === q.correctAnswer;
                      const showAsCorrect = submitted && isCorrectOption;
                      const showAsWrong = submitted && isSelected && !isCorrectOption;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(i, opt)}
                          disabled={submitted}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            showAsCorrect
                              ? 'bg-green-50 border-green-400 text-green-900'
                              : showAsWrong
                              ? 'bg-red-50 border-red-400 text-red-900'
                              : isSelected
                              ? 'bg-indigo-50 border-indigo-400 text-indigo-900'
                              : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                          } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              showAsCorrect
                                ? 'border-green-600 bg-green-600'
                                : showAsWrong
                                ? 'border-red-600 bg-red-600'
                                : isSelected
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-slate-300'
                            }`}>
                              {(isSelected || showAsCorrect) && (
                                showAsCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                ) : showAsWrong ? (
                                  <XCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )
                              )}
                            </div>
                            <span className="font-medium">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Show correct answer if wrong */}
                  {showCorrectAnswer && (
                    <div className="mt-4 ml-11 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <span className="font-semibold">Correct answer:</span> {q.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!submitted && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                  allAnswered
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-5 h-5" />
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <p className="text-lg text-slate-600 font-medium mb-2">No quiz available yet</p>
          <p className="text-sm text-slate-500">Click regenerate to create a quiz from your content</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;