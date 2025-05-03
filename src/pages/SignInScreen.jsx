import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import supabase from '../config/supabaseClient';
import Button from '../components/common/Button';
import './SignInScreen.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const {data, error} = await supabase.auth.signInWithPassword({
        email, password
      });

      if (error) throw error;

      navigate('/clients');
    
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your email.");
      if (email) {
        alert(`IT support will reach out to you at ${email}`);
      } else {
        alert("No email entered. Please try again or contact IT Support.");
      }
    };

  return (
    <div className = "signin-container">
      <div className = "signin-card">
        <div className = "signin-header">
          <img src="/globaltech-logo-light.svg" alt="GlobalTech Logo"/>
          <h1>GlobalTech Solutions</h1>
          <h2>Sign In</h2>
        </div>
      

      {error && <div className = "error-message">{error}</div>}

      <form onSubmit={handleSignIn} className = "signin-form">
        <div className = "form-group">
          <label htmlFor="email">Email</label>
          <input
            id = "email"
            type = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
            />
          </div>

        <div classname ="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >{loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <div className="form-links">
          <button
            type="button"
            className="text-link"
            onClick= {handleForgotPassword}
          >Forgot Password? </button>
            
        </div>
      </form>

      </div>
    </div>
  );
};
export default SignInPage;