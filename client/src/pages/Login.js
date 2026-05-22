import React, { useState } from "react";

export default function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("username", username);
      if (data.token) sessionStorage.setItem("token", data.token);

      if (onLogin) onLogin(username);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundDecoration}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>💬</span>
            <span style={styles.logoText}>ChatApp</span>
          </div>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>👤</span>
              Username
            </label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              <span style={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(isLoading && styles.submitButtonDisabled)
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={styles.loadingSpinner}></span>
            ) : (
              "Sign In"
            )}
          </button>



          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <button
              type="button"
              onClick={onSwitchToSignup}
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                cursor: "pointer",
                fontWeight: 600,
                padding: 0,
              }}
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden"
  },
  
  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  
  circle1: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "400px",
    height: "400px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    animation: "float 20s infinite ease-in-out"
  },
  
  circle2: {
    position: "absolute",
    bottom: "-10%",
    left: "-5%",
    width: "350px",
    height: "350px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    animation: "float 15s infinite ease-in-out reverse"
  },
  
  circle3: {
    position: "absolute",
    top: "40%",
    left: "30%",
    width: "200px",
    height: "200px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    animation: "float 25s infinite ease-in-out"
  },
  
  loginCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    width: "450px",
    maxWidth: "90%",
    padding: "40px",
    position: "relative",
    zIndex: 1,
    animation: "slideUp 0.5s ease-out"
  },
  
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },
  
  logoIcon: {
    fontSize: "32px"
  },
  
  logoText: {
    fontSize: "28px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    color: "#333",
    fontWeight: "600"
  },
  
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#666"
  },
  
  form: {
    display: "flex",
    flexDirection: "column"
  },
  
  inputGroup: {
    marginBottom: "24px"
  },
  
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px"
  },
  
  labelIcon: {
    fontSize: "16px"
  },
  
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e1e5e9",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    marginBottom: "20px",
    border: "1px solid #fcc"
  },
  
  errorIcon: {
    fontSize: "16px"
  },
  
  submitButton: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "20px",
    fontFamily: "inherit",
    position: "relative"
  },
  
  submitButtonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed"
  },
  
  loadingSpinner: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  
  demoHint: {
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  },
  
  demoIcon: {
    fontSize: "14px"
  }
};

// Add animations to the document
const addAnimations = () => {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10px, -10px) rotate(5deg);
      }
      50% {
        transform: translate(-5px, 15px) rotate(-3deg);
      }
      75% {
        transform: translate(-15px, -5px) rotate(2deg);
      }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    input:hover {
      border-color: #667eea;
    }
    
    input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
      background-color: #5a67d8;
    }
    
    button:active:not(:disabled) {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(styleSheet);
};

addAnimations();