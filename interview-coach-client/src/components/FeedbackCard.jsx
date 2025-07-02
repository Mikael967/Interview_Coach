import ReactMarkdown from "react-markdown";

const FeedbackCard = ({ feedback }) => (
  <div className="bg-gray-50 p-5 rounded-xl border border-green-200 shadow-sm">
    <h3 className="text-lg font-bold text-green-700 mb-3">🧠 AI Feedback</h3>
    <div className="prose max-w-none text-sm">
      <ReactMarkdown>{feedback}</ReactMarkdown>
    </div>
  </div>
);

export default FeedbackCard;
