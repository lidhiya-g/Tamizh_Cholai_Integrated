import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchKurals } from '../services/kuralData';

function TamilcholaiChatbot() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakResponses, setSpeakResponses] = useState(true);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        'Hello! 👋 I am the Tamilcholai Assistant. I can help you use Tamilcholai, including Thirukkural, Tamil learning, articles, proverbs, community, and profile features.'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const speak = (text) => {
    if (!speakResponses || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      const browserMessage =
        'Voice input is not supported by this browser. Please try Chrome or another supported browser.';

      addBotMessage(browserMessage);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    setMessage('');
    recognitionRef.current.start();
  };

  const addBotMessage = (text) => {
    setMessages((previous) => [
      ...previous,
      {
        sender: 'bot',
        text
      }
    ]);

    speak(text);
  };

  const addUserMessage = (text) => {
    setMessages((previous) => [
      ...previous,
      {
        sender: 'user',
        text
      }
    ]);
  };

  const navigateWithMessage = (reply, path) => {
    addBotMessage(reply);

    setTimeout(() => {
      navigate(path);
    }, 700);
  };

  const findKuralNumber = (text) => {
    const patterns = [
      /kural\s*(?:number\s*)?(\d+)/i,
      /thirukkural\s*(?:number\s*)?(\d+)/i,
      /couplet\s*(?:number\s*)?(\d+)/i,
      /number\s*(\d+)/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);

      if (match) {
        const number = Number(match[1]);

        if (number >= 1 && number <= 1330) {
          return number;
        }
      }
    }

    return null;
  };

  const handleKuralRequest = (number) => {
    const results = searchKurals(String(number));

    const kural = results.find(
      (item) => Number(item.number) === Number(number)
    );

    if (!kural) {
      addBotMessage(
        `I could not find Kural ${number} in the Tamilcholai Kural collection.`
      );
      return;
    }

    const reply =
      `Kural ${kural.number}\n\n` +
      `${kural.line1}\n` +
      `${kural.line2}\n\n` +
      `Chapter: ${kural.athikaram || 'Not available'}\n\n` +
      `English translation: ${kural.englishCouplet || 'Not available'}`;

    addBotMessage(reply);

    setTimeout(() => {
      navigate('/kural');
    }, 1200);
  };

  const getFeatureResponse = (text) => {
    const lower = text.toLowerCase();

    const number = findKuralNumber(text);

    if (number) {
      handleKuralRequest(number);
      return true;
    }

    // Thirukkural
    if (
      lower.includes('thirukkural') ||
      lower.includes('thirukural') ||
      lower.includes('kural') ||
      lower.includes('couplet') ||
      lower.includes('couplets') ||
      text.includes('திருக்குறள்') ||
      text.includes('குறள்')
    ) {
      navigateWithMessage(
        'Sure! I will open the Thirukkural section. Tamilcholai contains all 1,330 Thirukkural couplets.',
        '/kural'
      );

      return true;
    }

    // Learn Tamil
    if (
      lower.includes('learn tamil') ||
      lower.includes('learning tamil') ||
      lower.includes('study tamil') ||
      lower.includes('learn the tamil language') ||
      text.includes('தமிழ் கற்க') ||
      text.includes('தமிழ் கற்றல்')
    ) {
      navigateWithMessage(
        'Sure! I will open the Learn Tamil section.',
        '/learn'
      );

      return true;
    }

    // Articles
    if (
      lower.includes('article') ||
      lower.includes('articles') ||
      lower.includes('read articles') ||
      lower.includes('write an article') ||
      text.includes('கட்டுரை') ||
      text.includes('கட்டுரைகள்')
    ) {
      navigateWithMessage(
        'Sure! I will open the Tamilcholai Articles section.',
        '/articles'
      );

      return true;
    }

    // Proverbs
    if (
      lower.includes('proverb') ||
      lower.includes('proverbs') ||
      lower.includes('tamil proverb') ||
      lower.includes('tamil proverbs') ||
      text.includes('பழமொழி') ||
      text.includes('பழமொழிகள்')
    ) {
      navigateWithMessage(
        'Sure! I will open the Tamil Proverbs section.',
        '/proverbs'
      );

      return true;
    }

    // Community
    if (
      lower.includes('community') ||
      lower.includes('forum') ||
      lower.includes('discussion') ||
      lower.includes('discussions') ||
      lower.includes('community forum')
    ) {
      navigateWithMessage(
        'Sure! I will open the Tamilcholai Community Forum.',
        '/forum'
      );

      return true;
    }

    // Profile
    if (
      lower.includes('profile') ||
      lower.includes('my profile') ||
      lower.includes('account')
    ) {
      navigateWithMessage(
        'Sure! I will open your Tamilcholai profile.',
        '/profile'
      );

      return true;
    }

    // Create article
    if (
      lower.includes('create article') ||
      lower.includes('create an article') ||
      lower.includes('write article') ||
      lower.includes('publish article')
    ) {
      navigateWithMessage(
        'Sure! I will open the Create Article page.',
        '/create-article'
      );

      return true;
    }

    // Home
    if (
      lower === 'home' ||
      lower.includes('go home') ||
      lower.includes('homepage') ||
      lower.includes('home page')
    ) {
      navigateWithMessage(
        'Sure! I will take you back to the Tamilcholai home page.',
        '/'
      );

      return true;
    }

    // About Tamilcholai
    if (
      lower.includes('what is tamilcholai') ||
      lower.includes('about tamilcholai') ||
      lower.includes('tell me about tamilcholai')
    ) {
      addBotMessage(
        'Tamilcholai is a Tamil-focused platform that provides access to Thirukkural, Tamil learning resources, articles, Tamil proverbs, community discussions, and user profile features.'
      );

      return true;
    }

    // Number of Kurals
    if (
      lower.includes('how many kural') ||
      lower.includes('how many kurals') ||
      lower.includes('number of kurals') ||
      lower.includes('total kurals')
    ) {
      addBotMessage(
        'Tamilcholai contains all 1,330 Thirukkural couplets.'
      );

      return true;
    }

    // Capabilities
    if (
      lower.includes('what can you do') ||
      lower.includes('what can you help') ||
      lower.includes('help me') ||
      lower === 'help'
    ) {
      addBotMessage(
        'I can help you use Tamilcholai. You can ask me to open Thirukkural, find a specific Kural, learn Tamil, read articles, explore Tamil proverbs, open the community forum, open your profile, create an article, or return to the home page.'
      );

      return true;
    }

    return false;
  };

  const handleSend = () => {
    const text = message.trim();

    if (!text) {
      return;
    }

    addUserMessage(text);
    setMessage('');

    const handled = getFeatureResponse(text);

    if (!handled) {
      setTimeout(() => {
        addBotMessage(
          'I can help with Tamilcholai features such as Thirukkural, specific Kural numbers, Tamil learning, articles, Tamil proverbs, community discussions, profiles, and creating articles. Please ask me about one of these features.'
        );
      }, 300);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.chatButton}
        aria-label="Open Tamilcholai Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <strong>Tamilcholai Assistant</strong>
              <div style={styles.status}>● Online • English</div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(item.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage)
                }}
              >
                {item.text.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < item.text.split('\n').length - 1 && (
                      <br />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice status */}
          {isListening && (
            <div style={styles.listening}>
              🎤 Listening...
            </div>
          )}

          {/* Input */}
          <div style={styles.inputArea}>
            <button
              onClick={startVoiceInput}
              style={{
                ...styles.voiceButton,
                ...(isListening ? styles.voiceButtonActive : {})
              }}
              title="Voice input"
            >
              {isListening ? '⏹️' : '🎤'}
            </button>

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Tamilcholai..."
              style={styles.input}
            />

            <button
              onClick={handleSend}
              style={styles.sendButton}
              title="Send"
            >
              ➤
            </button>
          </div>

          {/* Voice response toggle */}
          <div style={styles.footer}>
            <label style={styles.voiceToggle}>
              <input
                type="checkbox"
                checked={speakResponses}
                onChange={(event) =>
                  setSpeakResponses(event.target.checked)
                }
              />
              🔊 Read answers aloud
            </label>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatButton: {
    position: 'fixed',
    right: '24px',
    bottom: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    background: '#7c3aed',
    color: '#ffffff',
    fontSize: '28px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
    zIndex: 9999
  },

  chatWindow: {
    position: 'fixed',
    right: '24px',
    bottom: '95px',
    width: '370px',
    height: '560px',
    maxWidth: 'calc(100vw - 30px)',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999
  },

  header: {
    background: '#7c3aed',
    color: '#ffffff',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  status: {
    fontSize: '12px',
    marginTop: '4px',
    opacity: 0.9
  },

  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer'
  },

  messages: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    background: '#f8f7ff'
  },

  message: {
    padding: '10px 12px',
    borderRadius: '12px',
    marginBottom: '10px',
    maxWidth: '88%',
    lineHeight: '1.5',
    fontSize: '14px',
    whiteSpace: 'normal'
  },

  botMessage: {
    background: '#ffffff',
    color: '#222222',
    marginRight: 'auto',
    border: '1px solid #eeeeee'
  },

  userMessage: {
    background: '#7c3aed',
    color: '#ffffff',
    marginLeft: 'auto'
  },

  listening: {
    padding: '8px 12px',
    background: '#f1eafe',
    color: '#7c3aed',
    fontSize: '13px',
    textAlign: 'center',
    fontWeight: '600'
  },

  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #dddddd',
    background: '#ffffff',
    gap: '6px'
  },

  voiceButton: {
    width: '42px',
    minWidth: '42px',
    border: 'none',
    borderRadius: '10px',
    background: '#eeeeee',
    fontSize: '18px',
    cursor: 'pointer'
  },

  voiceButtonActive: {
    background: '#fee2e2'
  },

  input: {
    flex: 1,
    minWidth: 0,
    padding: '11px',
    border: '1px solid #cccccc',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '14px'
  },

  sendButton: {
    width: '45px',
    minWidth: '45px',
    border: 'none',
    borderRadius: '10px',
    background: '#7c3aed',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer'
  },

  footer: {
    padding: '8px 12px',
    borderTop: '1px solid #eeeeee',
    background: '#ffffff'
  },

  voiceToggle: {
    fontSize: '12px',
    color: '#555555',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }
};

export default TamilcholaiChatbot;