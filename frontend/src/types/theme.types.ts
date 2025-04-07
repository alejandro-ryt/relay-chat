export type TThemesState = {
  theme: Storage | string;
};

export type TThemesActions = {
  setTheme: (theme: Storage | string) => void;
};
