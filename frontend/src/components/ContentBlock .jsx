import { RefreshCw, FileText, Sparkles } from "lucide-react";
import Header from "./Header";

const ContentBlock = ({ title, content, onRegenerate, loading }) => {
  // Process markdown-like text from AI (Gemini) to formatted JSX
  const formatContent = (text) => {
    if (!text) return null;

    // Split into lines
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;

    lines.forEach((line, index) => {
      // Skip empty lines
      if (line.trim() === '') {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 ml-2">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        return;
      }

      // Headers (## Header or **Header**)
      if (line.startsWith('## ') || line.startsWith('### ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 ml-2">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        const headerText = line.replace(/^##+ /, '').replace(/\*\*/g, '');
        elements.push(
          <h3 key={index} className="text-lg font-bold text-slate-800 mt-6 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
            {headerText}
          </h3>
        );
        return;
      }

      // Bold text at start of line (like **Key Point:**)
      if (line.match(/^\*\*[^*]+\*\*/)) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 ml-2">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        const formatted = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p key={index} className="my-3" dangerouslySetInnerHTML={{ __html: formatted }} />
        );
        return;
      }

      // List items (*, -, or • at start)
      if (line.match(/^[\*\-•]\s+/)) {
        const itemText = line.replace(/^[\*\-•]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        listItems.push(
          <li key={`item-${index}`} className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
        inList = true;
        return;
      }

      // Regular paragraph
      if (inList) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-2 my-4 ml-2">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }

      const formatted = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={index} className="text-slate-700 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    });

    // Add any remaining list items
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc list-inside space-y-2 my-4 ml-2">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Header title="Summary" onRegenerate={onRegenerate} loading={loading} content={content} />

      {/* Content */}
      {content ? (
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl p-6 border border-slate-200">
          <div className="prose prose-slate max-w-none">
            {formatContent(content)}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <p className="text-lg text-slate-600 font-medium mb-2">No content yet</p>
          <p className="text-sm text-slate-500">Click regenerate to create a summary from your document</p>
        </div>
      )}
    </div>
  );
};

export default ContentBlock;