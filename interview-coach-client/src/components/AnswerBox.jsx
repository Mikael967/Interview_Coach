const AnswerBox = ({ answer, setAnswer, onSubmit, loading }) => (
  <div className="mb-6">
    <textarea
      className="w-full h-36 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type your answer here..."
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />
    <button
      onClick={onSubmit}
      disabled={loading}
      className="mt-3 w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Analyzing..." : "Get Feedback"}
    </button>
  </div>
);

export default AnswerBox;
