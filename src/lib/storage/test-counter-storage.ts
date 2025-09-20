const TEST_COUNT_KEY = 'viability_test_count';
const MAX_TESTS = 2;

export function getTestCount(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(TEST_COUNT_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export function incrementTestCount(): number {
  if (typeof window === 'undefined') return 0;
  const currentCount = getTestCount();
  const newCount = currentCount + 1;
  localStorage.setItem(TEST_COUNT_KEY, newCount.toString());
  return newCount;
}

export function resetTestCount(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TEST_COUNT_KEY, '0');
  console.log('Contador de testes resetado para 0');
}

export function isTestLimitReached(): boolean {
  return getTestCount() >= MAX_TESTS;
}

export function getMaxTests(): number {
  return MAX_TESTS;
}

export function resetSystem(): void {
  if (typeof window === 'undefined') return;
  localStorage.clear();
  console.log('Sistema resetado completamente');
}

if (typeof window !== 'undefined') {
  (window as Window & typeof globalThis & {
    getTestCount: typeof getTestCount;
    incrementTestCount: typeof incrementTestCount;
    resetTestCount: typeof resetTestCount;
    isTestLimitReached: typeof isTestLimitReached;
    resetSystem: typeof resetSystem;
  }).getTestCount = getTestCount;
  (window as Window & typeof globalThis & {
    getTestCount: typeof getTestCount;
    incrementTestCount: typeof incrementTestCount;
    resetTestCount: typeof resetTestCount;
    isTestLimitReached: typeof isTestLimitReached;
    resetSystem: typeof resetSystem;
  }).incrementTestCount = incrementTestCount;
  (window as Window & typeof globalThis & {
    getTestCount: typeof getTestCount;
    incrementTestCount: typeof incrementTestCount;
    resetTestCount: typeof resetTestCount;
    isTestLimitReached: typeof isTestLimitReached;
    resetSystem: typeof resetSystem;
  }).resetTestCount = resetTestCount;
  (window as Window & typeof globalThis & {
    getTestCount: typeof getTestCount;
    incrementTestCount: typeof incrementTestCount;
    resetTestCount: typeof resetTestCount;
    isTestLimitReached: typeof isTestLimitReached;
    resetSystem: typeof resetSystem;
  }).isTestLimitReached = isTestLimitReached;
  (window as Window & typeof globalThis & {
    getTestCount: typeof getTestCount;
    incrementTestCount: typeof incrementTestCount;
    resetTestCount: typeof resetTestCount;
    isTestLimitReached: typeof isTestLimitReached;
    resetSystem: typeof resetSystem;
  }).resetSystem = resetSystem;
}
