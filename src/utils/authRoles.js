export const ROLE_OPTIONS = [
  {
    id: 'mine-worker',
    label: 'Mine Worker',
    badge: 'Field Operations',
    description: 'Frontline mine operations for attendance, safety, reporting and inspections.',
    permissions: [
      'Attendance',
      'Safety observations',
      'Incident/SOS reporting',
      'Field inspections',
    ],
    accessTabs: ['overview', 'map', 'chatbot', 'incident'],
  },
  {
    id: 'mine-officer',
    label: 'Mine Officer',
    badge: 'Supervision & Control',
    description: 'Operations oversight for compliance, incident control and alert monitoring.',
    permissions: [
      'Monitor workers and mine activities',
      'Review incidents',
      'Manage compliance',
      'Assign corrective actions',
      'Monitor alerts',
    ],
    accessTabs: ['overview', 'map', 'risk', 'chatbot', 'compliance', 'logistics', 'incident', 'reports'],
  },
];

export function getRoleById(roleId) {
  return ROLE_OPTIONS.find((role) => role.id === roleId) ?? null;
}

export function isMineWorkerRole(roleId) {
  return roleId === 'mine-worker';
}

export function isMineOfficerRole(roleId) {
  return roleId === 'mine-officer';
}

export function hasAccessToTab(roleId, tabId) {
  const role = getRoleById(roleId);
  return Boolean(role && role.accessTabs.includes(tabId));
}

export function isAccountRegistered(accounts = [], employeeId, roleId) {
  if (!employeeId || !roleId) {
    return false;
  }

  return accounts.some((account) => {
    const matchesEmployeeId = (account.employeeId || '').trim().toLowerCase() === String(employeeId).trim().toLowerCase();
    const matchesRole = (account.roleId || '').trim() === String(roleId).trim();
    return matchesEmployeeId && matchesRole;
  });
}

export const DEFAULT_REGISTERED_ACCOUNTS = [
  { employeeId: 'MW-2048', roleId: 'mine-worker', fullName: 'Anil Sharma', password: 'mine123' },
  { employeeId: 'MO-1107', roleId: 'mine-officer', fullName: 'Priya Nair', password: 'officer123' },
];

export const REGISTERED_ACCOUNTS_KEY = 'coalguard-registered-accounts';

export function getStoredAccounts(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem?.(REGISTERED_ACCOUNTS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_REGISTERED_ACCOUNTS;
  } catch {
    return DEFAULT_REGISTERED_ACCOUNTS;
  }
}

export function registerAccount(accounts = [], account) {
  const normalized = {
    employeeId: String(account.employeeId || '').trim(),
    roleId: String(account.roleId || '').trim(),
    fullName: String(account.fullName || '').trim(),
    password: String(account.password || '').trim(),
  };

  if (!normalized.employeeId || !normalized.roleId || !normalized.fullName || !normalized.password) {
    return accounts;
  }

  const exists = accounts.some((item) => (
    (item.employeeId || '').trim().toLowerCase() === normalized.employeeId.toLowerCase() &&
    (item.roleId || '').trim() === normalized.roleId
  ));

  if (exists) {
    return accounts;
  }

  return [...accounts, normalized];
}
