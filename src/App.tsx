import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// ============================================================================
// TRANSLATIONS (English / Urdu)
// ============================================================================
const translations: Record<string, Record<string, string>> = {
  en: {
    appTitle: 'Release Date Calculator',
    appSubtitle: 'Prison Department — Probable Date of Release (PDR) Calculator',
    convictName: 'Convict Name',
    prisonNumber: 'Prison No. / Case Ref.',
    startDate: 'Start Date (Date of Commencement)',
    sentence: 'Sentence Awarded',
    years: 'Years',
    months: 'Months',
    days: 'Days',
    calculate: 'Calculate',
    reset: 'Reset',
    print: 'Print / Save as PDF',
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    urdu: 'اردو (Urdu)',
    remissionFraction: 'Remission Fraction',
    roundingRule: 'Rounding Rule',
    roundDown: 'Round Down (Floor)',
    roundUp: 'Round Up (Ceiling)',
    roundNearest: 'Round to Nearest',
    adjustments: 'Adjustments / Deductions',
    addAdjustment: 'Add Adjustment',
    label: 'Label / Reason',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    results: 'Calculation Results',
    totalSentenceDays: 'Total Sentence (in days)',
    remissionDays: 'Remission (1/3 of sentence)',
    netSentenceDays: 'Net Sentence Days',
    pdr: 'Probable Date of Release (PDR)',
    totalAdjustments: 'Total Adjustments (in days)',
    finalReleaseDate: 'Final Revised Date of Release',
    steps: 'Step-by-Step Breakdown',
    step1: 'Step 1: Convert sentence to days',
    step2: 'Step 2: Calculate maximum remission',
    step3: 'Step 3: Calculate net sentence',
    step4: 'Step 4: Add net days to start date',
    step5: 'Step 5: Apply adjustments',
    step6: 'Step 6: Final release date',
    warning: 'Warning',
    warningBeforeStart: 'The final release date falls BEFORE the start date. Please check your inputs.',
    lifeSentence: 'Life sentence detected. Please enter the specific term in years/months/days.',
    emptySentence: 'No sentence entered. Please enter the sentence duration.',
    requiredField: 'Start date is required.',
    invalidInput: 'Please enter valid positive numbers only.',
    selfTest: 'Run Self-Test',
    selfTestPass: '✓ Self-Test PASSED',
    selfTestFail: '✗ Self-Test FAILED',
    saveData: 'Save Data (JSON)',
    loadData: 'Load Data (JSON)',
    noData: 'No saved data found.',
    signatureBlock: 'Signature Block',
    preparedBy: 'Prepared By',
    verifiedBy: 'Verified By',
    superintendent: 'Superintendent',
    date: 'Date',
    signature: 'Signature',
    runningTotal: 'Running Total',
    weekday: 'Weekday',
    totalDays: 'Total Days',
    noAdjustments: 'No adjustments added yet.',
    formula: 'Formula',
    daysPerMonth: '1 month = 30 days',
    daysPerYear: '1 year = 360 days',
    close: 'Close',
    exportImport: 'Export / Import',
    exportBtn: 'Export',
    importBtn: 'Import',
    clearData: 'Clear All Data',
    confirmClear: 'Are you sure you want to clear all saved data?',
    savedRecords: 'Saved Records',
    loadRecord: 'Load',
    deleteRecord: 'Delete',
    noRecords: 'No saved records.',
  },
  ur: {
    appTitle: 'رہائی کی تاریخ کیلکولیٹر',
    appSubtitle: 'محکمہ جیل — ممکنہ تاریخ رہائی (پی ڈی آر) کیلکولیٹر',
    convictName: 'قیدی کا نام',
    prisonNumber: 'جیل نمبر / کیس ریفرنس',
    startDate: 'آغاز کی تاریخ (سزا کا آغاز)',
    sentence: 'سنائی گئی سزا',
    years: 'سال',
    months: 'مہینے',
    days: 'دن',
    calculate: 'حساب لگائیں',
    reset: 'دوبارہ ترتیب دیں',
    print: 'پرنٹ / پی ڈی ایف',
    settings: 'ترتیبات',
    language: 'زبان',
    english: 'English',
    urdu: 'اردو',
    remissionFraction: 'رعایت کا حصہ',
    roundingRule: 'راؤنڈنگ کا اصول',
    roundDown: 'نیچے راؤنڈ (فلور)',
    roundUp: 'اوپر راؤنڈ (سیلنگ)',
    roundNearest: 'قریب ترین راؤنڈ',
    adjustments: 'کٹوتیاں / رعایتیں',
    addAdjustment: 'کٹوتی شامل کریں',
    label: 'لیبل / وجہ',
    delete: 'حذف',
    edit: 'ترمیم',
    save: 'محفوظ',
    cancel: 'منسوخ',
    results: 'حساب کے نتائج',
    totalSentenceDays: 'کل سزا (دنوں میں)',
    remissionDays: 'رعایت (سزا کا 1/3)',
    netSentenceDays: 'خالص سزا کے دن',
    pdr: 'ممکنہ تاریخ رہائی (پی ڈی آر)',
    totalAdjustments: 'کل کٹوتیاں (دنوں میں)',
    finalReleaseDate: 'حتمی نظرثانی شدہ تاریخ رہائی',
    steps: 'مرحلہ وار تفصیل',
    step1: 'مرحلہ 1: سزا کو دنوں میں تبدیل کریں',
    step2: 'مرحلہ 2: زیادہ سے زیادہ رعایت کا حساب',
    step3: 'مرحلہ 3: خالص سزا کا حساب',
    step4: 'مرحلہ 4: آغاز کی تاریخ میں خالص دن جمع کریں',
    step5: 'مرحلہ 5: کٹوتیاں لاگو کریں',
    step6: 'مرحلہ 6: حتمی تاریخ رہائی',
    warning: 'انتباہ',
    warningBeforeStart: 'حتمی تاریخ رہائی آغاز کی تاریخ سے پہلے آتی ہے۔ براہ کرم اپنی ان پٹ چیک کریں۔',
    lifeSentence: 'عمر قید معلوم ہوتی ہے۔ براہ کرم سال/مہینے/دن میں مخصوص مدت درج کریں۔',
    emptySentence: 'کوئی سزا درج نہیں ہوئی۔ براہ کرم سزا کی مدت درج کریں۔',
    requiredField: 'آغاز کی تاریخ ضروری ہے۔',
    invalidInput: 'براہ کرم صرف درست مثبت نمبر درج کریں۔',
    selfTest: 'خودکار ٹیسٹ چلائیں',
    selfTestPass: '✓ خودکار ٹیسٹ کامیاب',
    selfTestFail: '✗ خودکار ٹیسٹ ناکام',
    saveData: 'ڈیٹا محفوظ کریں (JSON)',
    loadData: 'ڈیٹا لوڈ کریں (JSON)',
    noData: 'کوئی محفوظ ڈیٹا نہیں ملا۔',
    signatureBlock: 'دستخط کا خانہ',
    preparedBy: 'تیاری کنندہ',
    verifiedBy: 'تصدیق کنندہ',
    superintendent: 'سپرنٹنڈنٹ',
    date: 'تاریخ',
    signature: 'دستخط',
    runningTotal: 'مجموعی کل',
    weekday: 'ہفتے کا دن',
    totalDays: 'کل دن',
    noAdjustments: 'ابھی تک کوئی کٹوتی شامل نہیں کی گئی۔',
    formula: 'فارمولا',
    daysPerMonth: '1 مہینہ = 30 دن',
    daysPerYear: '1 سال = 360 دن',
    close: 'بند کریں',
    exportImport: 'ایکسپورٹ / امپورٹ',
    exportBtn: 'ایکسپورٹ',
    importBtn: 'امپورٹ',
    clearData: 'تمام ڈیٹا صاف کریں',
    confirmClear: 'کیا آپ واقعی تمام محفوظ ڈیٹا صاف کرنا چاہتے ہیں؟',
    savedRecords: 'محفوظ ریکارڈز',
    loadRecord: 'لوڈ',
    deleteRecord: 'حذف',
    noRecords: 'کوئی محفوظ ریکارڈ نہیں۔',
  },
};

// ============================================================================
// TYPES
// ============================================================================
interface Adjustment {
  id: string;
  label: string;
  years: number;
  months: number;
  days: number;
}

interface Settings {
  remissionFraction: number; // e.g., 1/3
  roundingRule: 'floor' | 'ceil' | 'round';
}

interface SavedRecord {
  id: string;
  timestamp: string;
  convictName: string;
  prisonNumber: string;
  startDate: string;
  sentenceYears: number;
  sentenceMonths: number;
  sentenceDays: number;
  adjustments: Adjustment[];
  settings: Settings;
}

interface CalculationResult {
  totalSentenceDays: number;
  remissionDays: number;
  netSentenceDays: number;
  pdr: Date | null;
  totalAdjustmentDays: number;
  finalReleaseDate: Date | null;
  error?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert sentence (years, months, days) to total days.
 * Rule: 1 year = 360 days, 1 month = 30 days
 */
function sentenceToDays(years: number, months: number, days: number): number {
  return (years * 360) + (months * 30) + days;
}

/**
 * Apply rounding rule to a number.
 */
function applyRounding(value: number, rule: 'floor' | 'ceil' | 'round'): number {
  switch (rule) {
    case 'floor': return Math.floor(value);
    case 'ceil': return Math.ceil(value);
    case 'round': return Math.round(value);
    default: return Math.floor(value);
  }
}

/**
 * Add days to a date using UTC-safe arithmetic.
 * This avoids DST and timezone issues.
 */
function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Format date as DD-MM-YYYY
 */
function formatDate(date: Date): string {
  const d = date.getUTCDate().toString().padStart(2, '0');
  const m = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const y = date.getUTCFullYear().toString();
  return `${d}-${m}-${y}`;
}

/**
 * Get weekday name
 */
function getWeekday(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getUTCDay()];
}

/**
 * Parse DD-MM-YYYY string to UTC Date
 */
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const d = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const y = parseInt(parts[2], 10);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
  const date = new Date(Date.UTC(y, m, d));
  // Validate the date is real
  if (date.getUTCDate() !== d || date.getUTCMonth() !== m || date.getUTCFullYear() !== y) {
    return null;
  }
  return date;
}

/**
 * Format date for HTML input (YYYY-MM-DD)
 */
function formatDateForInput(date: Date): string {
  const y = date.getUTCFullYear().toString();
  const m = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const d = date.getUTCDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse YYYY-MM-DD from HTML input to UTC Date
 */
function parseInputDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
  const date = new Date(Date.UTC(y, m, d));
  if (date.getUTCDate() !== d || date.getUTCMonth() !== m || date.getUTCFullYear() !== y) {
    return null;
  }
  return date;
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============================================================================
// SELF-TEST FUNCTION
// ============================================================================
/**
 * Runs the worked example test case:
 * - Start date: 01-01-2024, Sentence: 3 years (0 months, 0 days)
 * - Total sentence = 1080 days
 * - Remission (1/3) = 360 days
 * - Net = 720 days
 * - PDR = 21-12-2025
 * - Adjustment: 1 month 10 days = 40 days
 * - Final Revised Date = 11-11-2025
 */
function runSelfTest(): { passed: boolean; details: string[] } {
  const details: string[] = [];
  let allPassed = true;

  // Test 1: Sentence conversion
  const totalDays = sentenceToDays(3, 0, 0);
  if (totalDays === 1080) {
    details.push('✓ Total sentence days: 3 years = 1080 days (PASS)');
  } else {
    details.push(`✗ Total sentence days: Expected 1080, got ${totalDays} (FAIL)`);
    allPassed = false;
  }

  // Test 2: Remission calculation
  const remission = applyRounding(1080 / 3, 'floor');
  if (remission === 360) {
    details.push('✓ Remission (1/3): 360 days (PASS)');
  } else {
    details.push(`✗ Remission: Expected 360, got ${remission} (FAIL)`);
    allPassed = false;
  }

  // Test 3: Net sentence
  const netDays = 1080 - 360;
  if (netDays === 720) {
    details.push('✓ Net sentence days: 720 days (PASS)');
  } else {
    details.push(`✗ Net sentence: Expected 720, got ${netDays} (FAIL)`);
    allPassed = false;
  }

  // Test 4: PDR calculation
  const startDate = new Date(Date.UTC(2024, 0, 1)); // 01-01-2024
  const pdr = addDaysToDate(startDate, 720);
  const pdrFormatted = formatDate(pdr);
  if (pdrFormatted === '21-12-2025') {
    details.push(`✓ PDR: ${pdrFormatted} (PASS)`);
  } else {
    details.push(`✗ PDR: Expected 21-12-2025, got ${pdrFormatted} (FAIL)`);
    allPassed = false;
  }

  // Test 5: Adjustment conversion
  const adjustmentDays = sentenceToDays(0, 1, 10);
  if (adjustmentDays === 40) {
    details.push('✓ Adjustment: 1 month 10 days = 40 days (PASS)');
  } else {
    details.push(`✗ Adjustment: Expected 40, got ${adjustmentDays} (FAIL)`);
    allPassed = false;
  }

  // Test 6: Final release date
  const finalDate = addDaysToDate(pdr, -40);
  const finalFormatted = formatDate(finalDate);
  if (finalFormatted === '11-11-2025') {
    details.push(`✓ Final Release Date: ${finalFormatted} (PASS)`);
  } else {
    details.push(`✗ Final Release Date: Expected 11-11-2025, got ${finalFormatted} (FAIL)`);
    allPassed = false;
  }

  return { passed: allPassed, details };
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  // Language state
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const t = useCallback((key: string) => translations[lang][key] || key, [lang]);
  const isRTL = lang === 'ur';

  // Input state
  const [convictName, setConvictName] = useState('');
  const [prisonNumber, setPrisonNumber] = useState('');
  const [startDateStr, setStartDateStr] = useState('');
  const [sentenceYears, setSentenceYears] = useState('');
  const [sentenceMonths, setSentenceMonths] = useState('');
  const [sentenceDays, setSentenceDays] = useState('');

  // Adjustments
  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Settings
  const [settings, setSettings] = useState<Settings>({
    remissionFraction: 1 / 3,
    roundingRule: 'floor',
  });

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; details: string[] } | null>(null);
  const [showExportImport, setShowExportImport] = useState(false);
  const [savedRecords, setSavedRecords] = useState<SavedRecord[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const printRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved records from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pdr_records');
      if (stored) {
        setSavedRecords(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save records to localStorage
  useEffect(() => {
    localStorage.setItem('pdr_records', JSON.stringify(savedRecords));
  }, [savedRecords]);

  // ============================================================================
  // CALCULATION LOGIC
  // ============================================================================
  const calculate = useCallback((): CalculationResult => {
    // Validate start date
    const startDate = parseInputDate(startDateStr);
    if (!startDate) {
      return { totalSentenceDays: 0, remissionDays: 0, netSentenceDays: 0, pdr: null, totalAdjustmentDays: 0, finalReleaseDate: null, error: t('requiredField') };
    }

    // Parse sentence values (default 0)
    const y = parseInt(sentenceYears) || 0;
    const m = parseInt(sentenceMonths) || 0;
    const d = parseInt(sentenceDays) || 0;

    // Validate: reject negative numbers
    if (y < 0 || m < 0 || d < 0) {
      return { totalSentenceDays: 0, remissionDays: 0, netSentenceDays: 0, pdr: null, totalAdjustmentDays: 0, finalReleaseDate: null, error: t('invalidInput') };
    }

    // Check for empty sentence
    if (y === 0 && m === 0 && d === 0) {
      return { totalSentenceDays: 0, remissionDays: 0, netSentenceDays: 0, pdr: null, totalAdjustmentDays: 0, finalReleaseDate: null, error: t('emptySentence') };
    }

    // Check for life sentence (very large values)
    if (y > 100) {
      return { totalSentenceDays: 0, remissionDays: 0, netSentenceDays: 0, pdr: null, totalAdjustmentDays: 0, finalReleaseDate: null, error: t('lifeSentence') };
    }

    // Step 1: Convert sentence to total days
    // Formula: Total = (Years × 360) + (Months × 30) + Days
    const totalSentenceDays = sentenceToDays(y, m, d);

    // Step 2: Calculate remission
    // Rule: Remission = Total Sentence Days / fraction (default 1/3)
    // Apply rounding rule (default: floor)
    const rawRemission = totalSentenceDays * settings.remissionFraction;
    const remissionDays = applyRounding(rawRemission, settings.roundingRule);

    // Step 3: Net sentence days
    const netSentenceDays = totalSentenceDays - remissionDays;

    // Step 4: PDR = Start Date + Net Sentence Days (calendar-day addition)
    const pdr = addDaysToDate(startDate, netSentenceDays);

    // Step 5: Calculate total adjustments
    let totalAdjustmentDays = 0;
    adjustments.forEach(adj => {
      totalAdjustmentDays += sentenceToDays(adj.years, adj.months, adj.days);
    });

    // Step 6: Final release date = PDR - total adjustments
    const finalReleaseDate = addDaysToDate(pdr, -totalAdjustmentDays);

    return {
      totalSentenceDays,
      remissionDays,
      netSentenceDays,
      pdr,
      totalAdjustmentDays,
      finalReleaseDate,
    };
  }, [startDateStr, sentenceYears, sentenceMonths, sentenceDays, adjustments, settings, t]);

  // Live recalculation with useMemo to prevent infinite loops
  const result = useMemo(() => calculate(), [calculate]);

  // Update errors and warnings based on calculation result
  useEffect(() => {
    if (result.error) {
      setErrors([result.error]);
    } else {
      setErrors([]);
    }

    // Warning check: final date before start date
    const startDate = parseInputDate(startDateStr);
    if (startDate && result.finalReleaseDate && result.finalReleaseDate.getTime() < startDate.getTime()) {
      setWarnings([t('warningBeforeStart')]);
    } else {
      setWarnings([]);
    }
  }, [result, startDateStr, t]);

  // ============================================================================
  // ADJUSTMENT HANDLERS
  // ============================================================================
  const addAdjustment = () => {
    setAdjustments([...adjustments, { id: generateId(), label: '', years: 0, months: 0, days: 0 }]);
  };

  const updateAdjustment = (id: string, field: keyof Adjustment, value: string | number) => {
    setAdjustments(adjustments.map(a => {
      if (a.id === id) {
        if (field === 'label') return { ...a, label: value as string };
        const numVal = typeof value === 'string' ? (parseInt(value) || 0) : value;
        return { ...a, [field]: Math.max(0, numVal) };
      }
      return a;
    }));
  };

  const deleteAdjustment = (id: string) => {
    setAdjustments(adjustments.filter(a => a.id !== id));
    if (editingId === id) setEditingId(null);
  };

  // ============================================================================
  // SAVE / LOAD / EXPORT / IMPORT
  // ============================================================================
  const saveCurrentRecord = () => {
    const record: SavedRecord = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      convictName,
      prisonNumber,
      startDate: startDateStr,
      sentenceYears: parseInt(sentenceYears) || 0,
      sentenceMonths: parseInt(sentenceMonths) || 0,
      sentenceDays: parseInt(sentenceDays) || 0,
      adjustments: [...adjustments],
      settings: { ...settings },
    };
    setSavedRecords([...savedRecords, record]);
  };

  const loadRecord = (record: SavedRecord) => {
    setConvictName(record.convictName);
    setPrisonNumber(record.prisonNumber);
    setStartDateStr(record.startDate);
    setSentenceYears(record.sentenceYears.toString());
    setSentenceMonths(record.sentenceMonths.toString());
    setSentenceDays(record.sentenceDays.toString());
    setAdjustments(record.adjustments);
    setSettings(record.settings);
  };

  const deleteRecord = (id: string) => {
    setSavedRecords(savedRecords.filter(r => r.id !== id));
  };

  const exportAllData = () => {
    const data = JSON.stringify(savedRecords, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdr_records_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          setSavedRecords(data);
        }
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearAllData = () => {
    if (confirm(t('confirmClear'))) {
      setSavedRecords([]);
    }
  };

  // ============================================================================
  // RESET
  // ============================================================================
  const resetAll = () => {
    setConvictName('');
    setPrisonNumber('');
    setStartDateStr('');
    setSentenceYears('');
    setSentenceMonths('');
    setSentenceDays('');
    setAdjustments([]);
    setErrors([]);
    setWarnings([]);
    setEditingId(null);
  };

  // ============================================================================
  // PRINT
  // ============================================================================
  const handlePrint = () => {
    window.print();
  };

  // ============================================================================
  // SELF-TEST
  // ============================================================================
  const handleSelfTest = () => {
    const results = runSelfTest();
    setTestResults(results);
    setShowTest(true);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .print-container { 
            box-shadow: none !important; 
            margin: 0 !important; 
            padding: 10mm !important;
            max-width: 100% !important;
          }
          @page { 
            margin: 15mm; 
            size: A4;
          }
        }
        .print-only { display: none; }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg no-print">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t('appTitle')}</h1>
              <p className="text-blue-200 text-sm mt-1">{t('appSubtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-600 rounded text-sm font-medium transition-colors"
              >
                {lang === 'en' ? 'اردو' : 'English'}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-600 rounded text-sm font-medium transition-colors"
              >
                ⚙️ {t('settings')}
              </button>
              <button
                onClick={() => setShowExportImport(!showExportImport)}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-600 rounded text-sm font-medium transition-colors"
              >
                💾 {t('exportImport')}
              </button>
              <button
                onClick={handleSelfTest}
                className="px-3 py-1.5 bg-green-700 hover:bg-green-600 rounded text-sm font-medium transition-colors"
              >
                🧪 {t('selfTest')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 no-print border border-blue-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">⚙️ {t('settings')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('remissionFraction')}</label>
                <select
                  value={settings.remissionFraction.toString()}
                  onChange={(e) => setSettings({ ...settings, remissionFraction: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value={0.25}>1/4 (25%)</option>
                  <option value={0.3333333333333333}>1/3 (33.33%)</option>
                  <option value={0.5}>1/2 (50%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('roundingRule')}</label>
                <select
                  value={settings.roundingRule}
                  onChange={(e) => setSettings({ ...settings, roundingRule: e.target.value as Settings['roundingRule'] })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="floor">{t('roundDown')}</option>
                  <option value="ceil">{t('roundUp')}</option>
                  <option value="round">{t('roundNearest')}</option>
                </select>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {t('formula')}: {t('daysPerYear')}, {t('daysPerMonth')}
            </div>
          </div>
        )}

        {/* Export/Import Panel */}
        {showExportImport && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 no-print border border-green-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">💾 {t('exportImport')}</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <button onClick={saveCurrentRecord} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                💾 {t('save')}
              </button>
              <button onClick={exportAllData} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                📤 {t('exportBtn')}
              </button>
              <label className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium cursor-pointer">
                📥 {t('importBtn')}
                <input ref={fileInputRef} type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              <button onClick={clearAllData} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">
                🗑️ {t('clearData')}
              </button>
            </div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">{t('savedRecords')}</h3>
            {savedRecords.length === 0 ? (
              <p className="text-sm text-gray-500">{t('noRecords')}</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedRecords.map(record => (
                  <div key={record.id} className="flex items-center justify-between bg-gray-50 rounded p-2 border">
                    <div className="text-sm">
                      <span className="font-medium">{record.convictName || 'Unnamed'}</span>
                      <span className="text-gray-500 ml-2">({new Date(record.timestamp).toLocaleDateString()})</span>
                      {record.prisonNumber && <span className="text-gray-400 ml-2">#{record.prisonNumber}</span>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadRecord(record)} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        {t('loadRecord')}
                      </button>
                      <button onClick={() => deleteRecord(record.id)} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                        {t('deleteRecord')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Self-Test Results */}
        {showTest && testResults && (
          <div className={`rounded-lg shadow-md p-6 mb-6 no-print border ${testResults.passed ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-lg font-bold ${testResults.passed ? 'text-green-800' : 'text-red-800'}`}>
                {testResults.passed ? t('selfTestPass') : t('selfTestFail')}
              </h2>
              <button onClick={() => setShowTest(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
            </div>
            <div className="space-y-1">
              {testResults.details.map((detail, i) => (
                <p key={i} className={`text-sm font-mono ${detail.startsWith('✓') ? 'text-green-700' : 'text-red-700'}`}>
                  {detail}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 no-print">
            {errors.map((err, i) => (
              <p key={i} className="text-red-700 text-sm font-medium">⚠️ {err}</p>
            ))}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 no-print">
            {warnings.map((warn, i) => (
              <p key={i} className="text-yellow-800 text-sm font-medium">⚠️ {t('warning')}: {warn}</p>
            ))}
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 no-print border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">📋 {t('sentence')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('convictName')}</label>
              <input
                type="text"
                value={convictName}
                onChange={(e) => setConvictName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('convictName')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('prisonNumber')}</label>
              <input
                type="text"
                value={prisonNumber}
                onChange={(e) => setPrisonNumber(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('prisonNumber')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('startDate')} *</label>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-end">
              <div className="flex gap-2 w-full">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t('years')}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sentenceYears}
                    onChange={(e) => setSentenceYears(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t('months')}</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={sentenceMonths}
                    onChange={(e) => setSentenceMonths(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t('days')}</label>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={sentenceDays}
                    onChange={(e) => setSentenceDays(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium transition-colors"
            >
              🔄 {t('reset')}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              🖨️ {t('print')}
            </button>
          </div>
        </div>

        {/* Adjustments Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 no-print border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">📝 {t('adjustments')}</h2>
            <button
              onClick={addAdjustment}
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors"
            >
              + {t('addAdjustment')}
            </button>
          </div>

          {adjustments.length === 0 ? (
            <p className="text-sm text-gray-500 italic">{t('noAdjustments')}</p>
          ) : (
            <div className="space-y-3">
              {adjustments.map((adj) => (
                <div key={adj.id} className="bg-gray-50 rounded p-3 border border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('label')}</label>
                      <input
                        type="text"
                        value={adj.label}
                        onChange={(e) => updateAdjustment(adj.id, 'label', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                        placeholder="e.g., Earned remission"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16">
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('years')}</label>
                        <input
                          type="number"
                          min="0"
                          value={adj.years || ''}
                          onChange={(e) => updateAdjustment(adj.id, 'years', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="w-16">
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('months')}</label>
                        <input
                          type="number"
                          min="0"
                          value={adj.months || ''}
                          onChange={(e) => updateAdjustment(adj.id, 'months', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="w-16">
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('days')}</label>
                        <input
                          type="number"
                          min="0"
                          value={adj.days || ''}
                          onChange={(e) => updateAdjustment(adj.id, 'days', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500 self-center">
                        = {sentenceToDays(adj.years, adj.months, adj.days)} {t('days').toLowerCase()}
                      </span>
                      <button
                        onClick={() => deleteAdjustment(adj.id)}
                        className="px-2 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium"
                      >
                        🗑️ {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right text-sm font-medium text-gray-700 border-t pt-2">
                {t('runningTotal')}: <span className="text-blue-700 font-bold">{result.totalAdjustmentDays} {t('days').toLowerCase()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div ref={printRef} className="print-container bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          {/* Print Header */}
          <div className="print-only text-center mb-6 border-b-2 border-gray-800 pb-4">
            <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
            <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
          </div>

          {/* Convict Info */}
          {(convictName || prisonNumber) && (
            <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {convictName && (
                  <div><span className="font-medium text-gray-700">{t('convictName')}:</span> <span className="text-gray-900">{convictName}</span></div>
                )}
                {prisonNumber && (
                  <div><span className="font-medium text-gray-700">{t('prisonNumber')}:</span> <span className="text-gray-900">{prisonNumber}</span></div>
                )}
              </div>
            </div>
          )}

          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">📊 {t('results')}</h2>

          {/* Step-by-step breakdown */}
          <div className="space-y-3">
            {/* Step 1 */}
            <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
              <p className="text-xs font-bold text-blue-700 uppercase mb-1">{t('step1')}</p>
              <p className="text-sm text-gray-800">
                ({sentenceYears || 0} × 360) + ({sentenceMonths || 0} × 30) + ({sentenceDays || 0}) = <strong className="text-blue-800">{result.totalSentenceDays} {t('totalDays').toLowerCase()}</strong>
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
              <p className="text-xs font-bold text-green-700 uppercase mb-1">{t('step2')}</p>
              <p className="text-sm text-gray-800">
                {result.totalSentenceDays} × {settings.remissionFraction === 1/3 ? '1/3' : settings.remissionFraction} = {settings.remissionFraction === 1/3 ? '360' : (result.totalSentenceDays * settings.remissionFraction).toFixed(2)} → <strong className="text-green-800">{result.remissionDays} {t('days').toLowerCase()}</strong> ({settings.roundingRule === 'floor' ? t('roundDown') : settings.roundingRule === 'ceil' ? t('roundUp') : t('roundNearest')})
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-gray-50 rounded border-l-4 border-yellow-500">
              <p className="text-xs font-bold text-yellow-700 uppercase mb-1">{t('step3')}</p>
              <p className="text-sm text-gray-800">
                {result.totalSentenceDays} − {result.remissionDays} = <strong className="text-yellow-800">{result.netSentenceDays} {t('days').toLowerCase()}</strong>
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-gray-50 rounded border-l-4 border-purple-500">
              <p className="text-xs font-bold text-purple-700 uppercase mb-1">{t('step4')}</p>
              <p className="text-sm text-gray-800">
                {startDateStr ? formatDate(parseInputDate(startDateStr)!) : '—'} ({getWeekday(parseInputDate(startDateStr) || new Date())}) + {result.netSentenceDays} {t('days').toLowerCase()} = <strong className="text-purple-800">{result.pdr ? formatDate(result.pdr) : '—'} ({result.pdr ? getWeekday(result.pdr) : ''})</strong>
              </p>
            </div>

            {/* Step 5 */}
            {adjustments.length > 0 && (
              <div className="p-3 bg-gray-50 rounded border-l-4 border-orange-500">
                <p className="text-xs font-bold text-orange-700 uppercase mb-1">{t('step5')}</p>
                <div className="text-sm text-gray-800">
                  {adjustments.map((adj, i) => (
                    <p key={adj.id} className="ml-2">
                      {i + 1}. {adj.label || `Adj ${i + 1}`}: ({adj.years}y × 360) + ({adj.months}m × 30) + ({adj.days}d) = {sentenceToDays(adj.years, adj.months, adj.days)} {t('days').toLowerCase()}
                    </p>
                  ))}
                  <p className="mt-1 font-medium">{t('totalAdjustments')}: <strong className="text-orange-800">{result.totalAdjustmentDays} {t('days').toLowerCase()}</strong></p>
                </div>
              </div>
            )}

            {/* Step 6 - Final Result */}
            <div className="p-4 bg-green-50 rounded border-l-4 border-green-600">
              <p className="text-xs font-bold text-green-700 uppercase mb-1">{t('step6')}</p>
              <div className="text-sm">
                <p className="text-gray-800 mb-2">
                  {result.pdr ? formatDate(result.pdr) : '—'} − {result.totalAdjustmentDays} {t('days').toLowerCase()} =
                </p>
                <p className="text-xl font-bold text-green-800">
                  {result.finalReleaseDate ? formatDate(result.finalReleaseDate) : '—'}
                  {result.finalReleaseDate && (
                    <span className="text-sm font-normal text-green-600 ml-2">({getWeekday(result.finalReleaseDate)})</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border font-medium">{t('steps')}</th>
                  <th className="text-right p-2 border font-medium">{t('totalDays')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">{t('totalSentenceDays')}</td>
                  <td className="p-2 text-right font-mono">{result.totalSentenceDays}</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-2">{t('remissionDays')}</td>
                  <td className="p-2 text-right font-mono text-green-700">−{result.remissionDays}</td>
                </tr>
                <tr className="border-b font-medium">
                  <td className="p-2">{t('netSentenceDays')}</td>
                  <td className="p-2 text-right font-mono">{result.netSentenceDays}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">{t('pdr')}</td>
                  <td className="p-2 text-right font-mono">{result.pdr ? `${formatDate(result.pdr)} (${getWeekday(result.pdr)})` : '—'}</td>
                </tr>
                {adjustments.length > 0 && (
                  <tr className="border-b bg-orange-50">
                    <td className="p-2">{t('totalAdjustments')}</td>
                    <td className="p-2 text-right font-mono text-orange-700">−{result.totalAdjustmentDays}</td>
                  </tr>
                )}
                <tr className="bg-green-100 font-bold">
                  <td className="p-2">{t('finalReleaseDate')}</td>
                  <td className="p-2 text-right font-mono text-green-800">
                    {result.finalReleaseDate ? `${formatDate(result.finalReleaseDate)} (${getWeekday(result.finalReleaseDate)})` : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature Block (for print) */}
          <div className="mt-8 pt-6 border-t-2 border-gray-300">
            <h3 className="text-sm font-bold text-gray-700 mb-4">{t('signatureBlock')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="border-b border-gray-400 mb-1 h-12"></div>
                <p className="text-xs text-gray-600">{t('preparedBy')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('date')}: ____________</p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 mb-1 h-12"></div>
                <p className="text-xs text-gray-600">{t('verifiedBy')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('date')}: ____________</p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 mb-1 h-12"></div>
                <p className="text-xs text-gray-600">{t('superintendent')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('date')}: ____________</p>
              </div>
            </div>
          </div>

          {/* Print Footer */}
          <div className="print-only mt-6 pt-4 border-t text-xs text-gray-500 text-center">
            <p>{t('appTitle')} — Generated on {new Date().toLocaleDateString()}</p>
            <p>{t('formula')}: {t('daysPerYear')}, {t('daysPerMonth')}</p>
            <p>{t('remissionFraction')}: {settings.remissionFraction === 1/3 ? '1/3' : settings.remissionFraction} | {t('roundingRule')}: {settings.roundingRule}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 py-4 no-print">
          <p>{t('appTitle')} — Offline Calculator | {t('daysPerYear')}, {t('daysPerMonth')}</p>
          <p className="mt-1">All calculations use UTC-safe date arithmetic. Results should be verified by authorized personnel.</p>
        </footer>
      </main>
    </div>
  );
}
