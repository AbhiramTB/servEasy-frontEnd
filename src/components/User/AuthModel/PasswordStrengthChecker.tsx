import React from 'react';

interface Props {
  password: string;
}

const getPasswordStrength = (password: string) => {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (length < 6 || !(hasUpper || hasLower) || (!hasNumber && !hasSymbol)) return 'weak';
  if (length >= 6 && hasNumber && (hasUpper || hasLower) && hasSymbol) return 'medium';
  if (length >= 8 && hasUpper && hasLower && hasNumber && hasSymbol) return 'strong';

  return 'weak';
};

const PasswordStrengthChecker: React.FC<Props> = ({ password }) => {
  const strength = getPasswordStrength(password);

  const getMessage = () => {
    switch (strength) {
      case 'weak':
        return 'Password is too weak';
      case 'medium':
        return 'Medium password, add more complexity for strength';
      case 'strong':
        return 'Strong password!';
      default:
        return '';
    }
  };

  return (
    <div className="mt-2">
      <div className="mb-1 text-xs text-base-content/60">Password strength</div>
      <div className="flex space-x-1">
        <div
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            strength === 'weak' || strength === 'medium' || strength === 'strong'
              ? 'bg-error'
              : 'bg-base-300'
          }`}
        />
        <div
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            strength === 'medium' || strength === 'strong'
              ? 'bg-warning'
              : 'bg-base-300'
          }`}
        />
        <div
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            strength === 'strong' ? 'bg-success' : 'bg-base-300'
          }`}
        />
      </div>
      <div className="mt-1 text-xs text-base-content/50">{getMessage()}</div>
    </div>
  );
};

export default PasswordStrengthChecker;
