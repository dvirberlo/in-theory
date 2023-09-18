export type AppSettings = {
  waitForCorrectTwice: boolean;
  skipPastQuestions: boolean;
  // licenseLevel: LicenseLevel;
  // categories: Category[];
  // darkMode: DarkMode;
};

// export type DarkMode = undefined | boolean;

export const defaultAppSettings: AppSettings = {
  skipPastQuestions: true,
  waitForCorrectTwice: false,
  // licenseLevel: 'C1',
  // categories: [...CategoriesArr],
  // darkMode: undefined,
};
