import { useState } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '0'
  },
  mainCard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  questionSection: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    padding: '30px',
    color: 'white'
  },
  questionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  questionText: {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    opacity: '0.95'
  },
  contentSection: {
    padding: '30px'
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid #e0e0e0',
    fontSize: '16px',
    fontFamily: 'inherit',
    resize: 'none',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  textareaFocused: {
    borderColor: '#4facfe',
    boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.1)'
  },
  charCounter: {
    textAlign: 'right',
    fontSize: '14px',
    color: '#666',
    marginTop: '10px'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
  },
  buttonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
    transform: 'none'
  },
  feedbackCard: {
    backgroundColor: '#f8fffe',
    border: '2px solid #e6fffa',
    borderRadius: '15px',
    marginTop: '30px',
    overflow: 'hidden'
  },
  feedbackHeader: {
    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  feedbackTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: '0'
  },
  feedbackContent: {
    padding: '25px',
    lineHeight: '1.6',
    color: '#333'
  },
  ratingBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  spinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  jobTitleInput: {
    padding: '15px',
    width: '300px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none'
  }
};

// Add CSS animation for spinner
if (typeof document !== 'undefined') {
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);
}

const QuestionCard = ({ question }) => (
  <div style={styles.questionSection}>
    <h2 style={styles.questionTitle}>
      🎙️ Interview Question
    </h2>
    <p style={styles.questionText}>"{question}"</p>
  </div>
);

const AnswerBox = ({ answer, setAnswer, onSubmit, loading }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div>
      <textarea
        style={{
          ...styles.textarea,
          ...(isFocused ? styles.textareaFocused : {})
        }}
        placeholder="Share your thoughts and experiences here... Be specific about your skills, achievements, and what makes you unique!"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div style={styles.charCounter}>
        {answer.length} characters
      </div>
      
      <div style={styles.buttonContainer}>
        <button
          onClick={onSubmit}
          disabled={loading || !answer.trim()}
          style={{
            ...styles.button,
            ...(loading || !answer.trim() ? styles.buttonDisabled : {})
          }}
          onMouseEnter={(e) => {
            if (!loading && answer.trim()) {
              Object.assign(e.target.style, styles.buttonHover);
            }
          }}
          onMouseLeave={(e) => {
            Object.assign(e.target.style, styles.button);
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              <span style={{ marginLeft: '10px' }}>Analyzing Your Response...</span>
            </>
          ) : (
            <>
              🧠 Get AI Feedback
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const FeedbackCard = ({ feedback }) => {
  // Parse feedback to extract rating if it exists
  const ratingMatch = feedback.match(/Rating:\s*(\d+)\/(\d+)/);
  const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;
  const maxRating = ratingMatch ? parseInt(ratingMatch[2]) : 10;
  
  const getRatingStyle = (rating, max) => {
    const percentage = (rating / max) * 100;
    if (percentage >= 80) return { backgroundColor: '#d4edda', color: '#155724' };
    if (percentage >= 60) return { backgroundColor: '#fff3cd', color: '#856404' };
    return { backgroundColor: '#f8d7da', color: '#721c24' };
  };

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle bold text (***text*** or **text**)
      let parsedLine = line
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong style="font-weight: bold; font-style: italic;">$1</strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');

      // Handle bullet points
      if (parsedLine.startsWith('• ')) {
        return (
          <div key={index} style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span style={{ color: '#667eea', fontWeight: 'bold', marginRight: '8px' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: parsedLine.substring(2) }} />
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(parsedLine)) {
        return (
          <div key={index} style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span dangerouslySetInnerHTML={{ __html: parsedLine }} />
          </div>
        );
      }
      
      // Handle section headers (lines that end with :)
      if (parsedLine.trim().endsWith(':') && parsedLine.trim().length > 1) {
        return (
          <div key={index} style={{ 
            fontWeight: 'bold', 
            fontSize: '16px',
            color: '#4a5568',
            marginTop: index > 0 ? '20px' : '0',
            marginBottom: '10px'
          }}>
            <span dangerouslySetInnerHTML={{ __html: parsedLine }} />
          </div>
        );
      }
      
      // Regular paragraphs
      if (parsedLine.trim()) {
        return (
          <div key={index} style={{ marginBottom: '12px' }}>
            <span dangerouslySetInnerHTML={{ __html: parsedLine }} />
          </div>
        );
      }
      
      // Empty lines
      return <br key={index} />;
    });
  };

  return (
    <div style={styles.feedbackCard}>
      <div style={styles.feedbackHeader}>
        <span>🧠</span>
        <h3 style={styles.feedbackTitle}>AI Feedback</h3>
        <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
          ✨ Powered by AI
        </div>
      </div>
      
      <div style={styles.feedbackContent}>
        {rating && (
          <div style={{
            ...styles.ratingBadge,
            ...getRatingStyle(rating, maxRating)
          }}>
            Rating: {rating}/{maxRating}
        </div>
        )}
        
        <div>
          {parseMarkdown(feedback)}
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <span style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '5px 12px',
            borderRadius: '15px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✅ Constructive
          </span>
          <span style={{
            backgroundColor: '#cce5ff',
            color: '#004085',
            padding: '5px 12px',
            borderRadius: '15px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            💡 Actionable
          </span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // All state declarations at the top
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  const question = questions[currentIndex] || "";

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('https://interview-coach-3.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          answer: answer
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setFeedback(data.feedback || 'Unable to generate feedback at this time.');
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      setFeedback(`Sorry, I couldn't analyze your response right now. Error: ${error.message}`);
    }
    setLoading(false);
  };

  const generateQuestions = async () => {
    if (!jobTitle.trim()) return;
    
    setGeneratingQuestions(true);
    try {
      const response = await fetch('https://interview-coach-3.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: jobTitle
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const generatedQuestions = data.questions || [];

      if (generatedQuestions.length === 0) {
        throw new Error('No questions generated');
      }

      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setFeedback("");
      setAnswer("");
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to default questions if AI fails
      const fallbackQuestions = [
        "Tell me about yourself and your background.",
        "What are your greatest strengths and how do they relate to this role?",
        "Describe a challenging situation you faced and how you overcame it.",
        "Where do you see yourself in five years?",
        "Why are you interested in this position and our company?"
      ];
      setQuestions(fallbackQuestions);
      setCurrentIndex(0);
      setFeedback("");
      setAnswer("");
      
      // Optional: Show error message to user
      console.warn('Using fallback questions due to API error:', error.message);
    }
    setGeneratingQuestions(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎙️ AI Interview Coach</h1>
        <p style={styles.subtitle}>
          Practice your interview skills and get AI-powered feedback instantly. 
          Transform your responses into compelling stories that land you the job.
        </p>
      </div>

      <div style={styles.mainCard}>
        {questions.length === 0 ? (
          <div style={styles.contentSection}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <input
                type="text"
                placeholder="Enter job title (e.g., Software Engineer)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={styles.jobTitleInput}
              />
              <button
                style={{ 
                  ...styles.button, 
                  marginLeft: '15px',
                  ...(generatingQuestions || !jobTitle.trim() ? styles.buttonDisabled : {})
                }}
                onClick={generateQuestions}
                disabled={generatingQuestions || !jobTitle.trim()}
              >
                {generatingQuestions ? (
                  <>
                    <span style={styles.spinner}></span>
                    <span style={{ marginLeft: '10px' }}>Generating Questions...</span>
                  </>
                ) : (
                  '🎯 Generate Questions'
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <QuestionCard question={question} />
            <div style={styles.contentSection}>
              <AnswerBox 
                answer={answer} 
                setAnswer={setAnswer} 
                onSubmit={handleSubmit} 
                loading={loading} 
              />
              {feedback && <FeedbackCard feedback={feedback} />}
            </div>
          </>
        )}
      </div>
      
      {feedback && currentIndex < questions.length - 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              setAnswer("");
              setFeedback("");
            }}
            style={styles.button}
          >
            ➡️ Next Question
          </button>
        </div>
      )}
    </div>
  );
}