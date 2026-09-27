import { useState, useEffect } from 'react';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, HardHat, ShieldCheck } from 'lucide-react';
import { ROLE_OPTIONS, getStoredAccounts, registerAccount, REGISTERED_ACCOUNTS_KEY } from '../utils/authRoles';

export default function LoginModule({ selectedRole, setSelectedRole, onLogin }) {
  const [authMode, setAuthMode] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [registeredAccounts, setRegisteredAccounts] = useState(() => getStoredAccounts());

  useEffect(() => {
    try {
      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(registeredAccounts));
    } catch {
      // localStorage may not be available
    }
  }, [registeredAccounts]);

  const activeRole = ROLE_OPTIONS.find((role) => role.id === selectedRole) ?? ROLE_OPTIONS[0];
  const isSignUp = authMode === 'signup';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp) {
      setAuthError('');

      if (!fullName.trim() || !employeeId.trim() || !password.trim() || !confirmPassword.trim()) {
        setAuthError('Please complete all fields to sign up.');
        return;
      }

      if (password !== confirmPassword) {
        setAuthError('Passwords do not match. Please re-enter them.');
        return;
      }

      const nextAccounts = registerAccount(registeredAccounts, {
        fullName: fullName.trim(),
        employeeId: employeeId.trim(),
        roleId: activeRole.id,
        password,
      });

      const alreadyExists = nextAccounts.length === registeredAccounts.length;

      if (alreadyExists) {
        setAuthError('This employee record already exists. Please sign in instead.');
        setAuthMode('signin');
        return;
      }

      setRegisteredAccounts(nextAccounts);
      setAuthError('');
      onLogin({
        roleId: activeRole.id,
        fullName: fullName.trim(),
        employeeId: employeeId.trim(),
        password,
        authMode,
      });
      return;
    }

    if (!employeeId.trim() || !password.trim()) {
      setAuthError('Please enter your employee ID and password.');
      return;
    }

    const candidate = registeredAccounts.find((account) => {
      return (
        account.employeeId.trim().toLowerCase() === employeeId.trim().toLowerCase() &&
        account.roleId === activeRole.id
      );
    });

    if (!candidate) {
      setAuthError('This employee record is not registered. Please sign up first.');
      setAuthMode('signup');
      return;
    }

    if (candidate.password !== password) {
      setAuthError('Incorrect password for this employee record.');
      return;
    }

    setAuthError('');
    onLogin({
      roleId: activeRole.id,
      employeeId: employeeId.trim(),
      password,
      authMode,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl shadow-slate-950/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-amber-300 font-bold font-mono">CoalGuard AI</p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Mine Access Portal</h1>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold font-mono">Sign Up Module</p>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
              Secure access
            </span>
          </div>

          <div className="mb-6 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <BadgeCheck className="w-3.5 h-3.5" />
              Secure mine operations login
            </div>
            <p className="text-sm text-slate-300 max-w-xl">
              Choose the operational role you are assigned to access workforce tracking, safety observations, incident response, and supervisory controls.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ROLE_OPTIONS.map((role) => {
              const isSelected = role.id === activeRole.id;

              return (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-slate-700 bg-slate-900/80 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-amber-300">
                      {role.id === 'mine-worker' ? <HardHat className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </span>
                    {isSelected && (
                      <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{role.badge}</p>
                  <h2 className="mt-2 text-xl font-bold text-white">{role.label}</h2>
                  <p className="mt-2 text-sm text-slate-300">{role.description}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    {role.permissions.slice(0, 3).map((permission) => (
                      <li key={permission} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-3xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5 text-amber-300">
            <BriefcaseBusiness className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">{activeRole.label}</span>
          </div>

          <div className="mb-4 flex rounded-xl border border-slate-700 bg-slate-900/80 p-1">
            {['signin', 'signup'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAuthMode(mode)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                  authMode === mode
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <div className="mb-3 flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold font-mono">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </p>
          </div>
          <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Create account' : 'Welcome back'}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {isSignUp
              ? 'Register your mine credentials to access the operations dashboard.'
              : 'Use your mine credentials to continue to the operations dashboard.'}
          </p>

          {!isSignUp && (
            <div className="mt-4 text-sm text-slate-300">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="font-semibold text-amber-300 underline-offset-4 hover:underline"
              >
                Sign up
              </button>
            </div>
          )}

          {isSignUp && (
            <div className="mt-4 text-sm text-slate-300">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className="font-semibold text-amber-300 underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </div>
          )}

          {authError && (
            <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="e.g. Anil Sharma"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label htmlFor="employeeId" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Employee ID
              </label>
              <input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                placeholder={activeRole.id === 'mine-worker' ? 'MW-2048' : 'MO-1107'}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSignUp ? 'Create a secure password' : activeRole.id === 'mine-worker' ? 'Enter worker password' : 'Enter officer password'}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            )}

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-xs text-slate-300">
              <p className="font-semibold text-slate-200">Role access</p>
              <ul className="mt-2 space-y-2">
                {activeRole.permissions.map((permission) => (
                  <li key={permission} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {permission}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.01]"
            >
              {isSignUp ? `Create ${activeRole.label} account` : `Sign in to ${activeRole.label}`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
