import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Checkbox } from '../../components/common/Checkbox';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { validateEmail, validatePassword } from '../../utils/formatting';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
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
      await register(email, password, fullName);
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
          <h2 className="text-2xl font-bold text-neutral mb-6">Create Account</h2>

          {(error || authError) && (
            <Alert type="danger" message={error || authError} className="mb-6" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />

            <div>
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              {errors.terms && <p className="text-danger text-sm mt-1">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-tertiary text-center">
            <p className="text-neutral-dark text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-semibold hover:text-opacity-80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 bg-tertiary bg-opacity-50 border border-tertiary rounded-lg p-4 text-center text-sm text-neutral-dark">
          <p>💡 Create a free demo account instantly</p>
          <p className="mt-2">📌 No credit card required • No real money • For learning only</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
