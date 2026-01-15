import {  FileText, RefreshCw } from 'lucide-react'
import React from 'react'

const Header = ({ title, onRegenerate, loading, content }) => {
  return (
     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b-2 border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-2">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {title}
          </h2>
        </div>

        <button
          onClick={onRegenerate}
          disabled={loading}
          className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm
                     ${loading 
                       ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                       : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-md'
                     }`}
        >
          <RefreshCw
            className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
          />
          {loading ? "Generating..." : content?"Regenerate":"Generate"}
        </button>
      </div>
  )
}

export default Header
