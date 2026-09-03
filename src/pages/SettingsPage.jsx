import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useTrading } from '../../context/TradingContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Checkbox } from '../../components/common/Checkbox';
import { Toast } from '../../utils/toast';
import { User, Bell, Shield, Trash2 } from 'lucide-react';

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { resetAccount, clearAccount } = useTrading();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    positions: true,
  });
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      updateProfile({ fullName });
      Toast.success('Profile updated successfully');
    } catch (error) {
      Toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all trading data? This cannot be undone.')) {
      setClearing(true);
      try {
        clearAccount();
        Toast.success('All trading data has been cleared');
      } catch (error) {
        Toast.error(error.message);
      } finally {
        setClearing(false);
      }
    }
  };

  const handleResetAccount = () => {
    if (window.confirm('Are you sure you want to reset your account? Balance will be reset to $10,000.')) {
      setClearing(true);
      try {
        resetAccount();
        Toast.success('Account has been reset');
      } catch (error) {
        Toast.error(error.message);
      } finally {
        setClearing(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral mb-2">Settings</h1>
          <p className="text-neutral-dark">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral">Account Profile</h3>
              <p className="text-sm text-neutral-dark">{email}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b border-tertiary">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              disabled
              placeholder="Email cannot be changed"
            />
          </div>

          <Button
            variant="primary"
            isLoading={saving}
            onClick={handleSaveProfile}
          >
            Save Changes
          </Button>
        </Card>

        {/* Notifications Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-neutral">Notifications</h3>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications({ ...notifications, email: e.target.checked })
              }
            />
            <Checkbox
              label="Order Notifications"
              checked={notifications.orders}
              onChange={(e) =>
                setNotifications({ ...notifications, orders: e.target.checked })
              }
            />
            <Checkbox
              label="Position Update Notifications"
              checked={notifications.positions}
              onChange={(e) =>
                setNotifications({ ...notifications, positions: e.target.checked })
              }
            />
          </div>
        </Card>

        {/* Security Section */}
        <Card className="border-warning border-opacity-30 bg-warning bg-opacity-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-neutral">Security & Privacy</h3>
          </div>

          <Alert
            type="info"
            message="This is a demo platform. Your data is stored locally in your browser's localStorage. Clear your browser data to remove all records."
          />
        </Card>

        {/* Data Management Section */}
        <Card className="border-danger border-opacity-30 bg-danger bg-opacity-5">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-danger" />
            <h3 className="text-lg font-semibold text-danger">Data Management</h3>
          </div>

          <div className="space-y-4">
            <div className="pb-4 border-b border-tertiary">
              <p className="text-neutral font-medium mb-2">Reset Account</p>
              <p className="text-sm text-neutral-dark mb-4">
                Reset your account balance to $10,000 while keeping your trade history.
              </p>
              <Button
                variant="secondary"
                isLoading={clearing}
                onClick={handleResetAccount}
              >
                Reset Account
              </Button>
            </div>

            <div>
              <p className="text-neutral font-medium mb-2">Clear All Data</p>
              <p className="text-sm text-neutral-dark mb-4">
                Permanently delete all trading data including positions, trades, and account history. This action cannot be undone.
              </p>
              <Button
                variant="danger"
                isLoading={clearing}
                onClick={handleClearData}
              >
                Clear All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral mb-4">About This Platform</h3>
          <div className="space-y-2 text-sm text-neutral-dark">
            <p><strong>Version:</strong> 1.0.0 (Demo)</p>
            <p><strong>Type:</strong> Paper Trading Simulator</p>
            <p><strong>Storage:</strong> Browser localStorage (local only)</p>
            <p><strong>Data Sync:</strong> None (completely offline)</p>
            <div className="mt-4 p-3 bg-tertiary rounded text-sm text-neutral">
              💡 <strong>Tip:</strong> All your trading data is stored locally on this device. If you clear your browser data or switch devices, you'll lose your history.
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
