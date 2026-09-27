import test from 'node:test';
import assert from 'node:assert/strict';

import { ROLE_OPTIONS, getRoleById, isMineWorkerRole, isMineOfficerRole, isAccountRegistered, DEFAULT_REGISTERED_ACCOUNTS, getStoredAccounts, registerAccount } from './authRoles.js';

test('mine worker role exposes field operations capabilities', () => {
  const role = getRoleById('mine-worker');

  assert.ok(role);
  assert.equal(role.label, 'Mine Worker');
  assert.ok(role.permissions.includes('Attendance'));
  assert.ok(role.permissions.includes('Safety observations'));
  assert.ok(role.permissions.includes('Incident/SOS reporting'));
  assert.ok(role.permissions.includes('Field inspections'));
  assert.equal(isMineWorkerRole(role.id), true);
});

test('mine officer role exposes supervision and compliance duties', () => {
  const role = getRoleById('mine-officer');

  assert.ok(role);
  assert.equal(role.label, 'Mine Officer');
  assert.ok(role.permissions.includes('Monitor workers and mine activities'));
  assert.ok(role.permissions.includes('Review incidents'));
  assert.ok(role.permissions.includes('Manage compliance'));
  assert.ok(role.permissions.includes('Assign corrective actions'));
  assert.ok(role.permissions.includes('Monitor alerts'));
  assert.equal(isMineOfficerRole(role.id), true);
});

test('role catalog exposes both login roles', () => {
  assert.deepEqual(ROLE_OPTIONS.map((role) => role.id).sort(), ['mine-officer', 'mine-worker']);
});

test('sign in rejects unregistered employee credentials and prompts signup first', () => {
  const registeredAccounts = [
    { employeeId: 'MW-2048', roleId: 'mine-worker', fullName: 'Anil Sharma' },
    { employeeId: 'MO-1107', roleId: 'mine-officer', fullName: 'Priya Nair' },
  ];

  assert.equal(isAccountRegistered(registeredAccounts, 'MW-2048', 'mine-worker'), true);
  assert.equal(isAccountRegistered(registeredAccounts, 'MW-2048', 'mine-officer'), false);
  assert.equal(isAccountRegistered(registeredAccounts, 'ZZ-9999', 'mine-worker'), false);
});

test('registered accounts persist across sign-up flows', () => {
  const accounts = [
    { employeeId: 'MW-2048', roleId: 'mine-worker', fullName: 'Anil Sharma', password: 'mine123' },
  ];

  const next = registerAccount(accounts, {
    employeeId: 'MW-3001',
    roleId: 'mine-worker',
    fullName: 'Ravi Kumar',
    password: 'worker456',
  });

  assert.equal(isAccountRegistered(next, 'MW-3001', 'mine-worker'), true);
  assert.equal(isAccountRegistered(next, 'MW-3001', 'mine-officer'), false);
});
