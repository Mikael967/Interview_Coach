const QuestionCard = ({ question }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold text-gray-700">Interview Question</h2>
    <p className="mt-1 italic text-blue-700">{question}</p>
  </div>
);

export default QuestionCard;
