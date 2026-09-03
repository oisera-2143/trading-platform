import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { validateEmail, validatePassword } from '../../utils/formatting';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-primary text-lg">TP</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral mb-2">Trading Platform</h1>
          <p className="text-neutral-dark">Demo Paper Trading Terminal</p>
        </div>

        {/* Card */}
        <div className="bg-secondary border border-tertiary rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-neutral mb-6">Login</h2>

          {(error || authError) && (
            <Alert type="danger" message={error || authError} className="mb-6" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="demo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-tertiary bg-tertiary cursor-pointer accent-accent"
                />
                <span className="text-sm text-neutral">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-accent hover:text-opacity-80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-tertiary text-center">
            <p className="text-neutral-dark text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent font-semibold hover:text-opacity-80 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 bg-tertiary bg-opacity-50 border border-tertiary rounded-lg p-4 text-center text-sm text-neutral-dark">
          <p>💡 <strong>Demo Account:</strong> Use any email and password to test</p>
          <p className="mt-2">📌 This is a paper trading simulator for educational purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
