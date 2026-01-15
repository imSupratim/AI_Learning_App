import React from "react";
import { BookOpen, Brain, Sparkles, Zap, Target, Award, BrainCircuit } from "lucide-react";

const AuthPageDesign = ({ tag }) => {
  const features = [
    { icon: BrainCircuit, label: "AI-Powered", color: "from-blue-500 to-cyan-500" },
    { icon: Sparkles, label: "Smart Learning", color: "from-purple-500 to-pink-500" },
    { icon: Zap, label: "Quick Results", color: "from-yellow-500 to-orange-500" },
    { icon: Target, label: "Focused Study", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Track Progress", color: "from-red-500 to-rose-500" },
    { icon: BookOpen, label: "Easy to Use", color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-12 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-40 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-lg relative z-10">
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-300">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 text-center text-slate-800">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Notely
          </span>
        </h2>
        
        <p className="text-lg text-center text-slate-700 mb-3 font-medium">
          Your AI Learning Assistant
        </p>

        <p className="text-center text-slate-600 mb-8">
          {tag}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-700 text-center">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>

        

        {/* Footer */}
        <p className="text-sm text-slate-500 font-medium text-center">
          Made with <span className="text-red-500 animate-pulse">❤️</span> by Supratim Mandal
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AuthPageDesign;