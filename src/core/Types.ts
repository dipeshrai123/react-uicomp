// Auth
export interface DefaultAuthConfigParams {
  isLoggedIn: boolean;
  userRole: null | string;
}

export type stateType = { [key: string]: () => void } | { [key: string]: any };

export interface AuthProviderParams {
  children: React.ReactNode;
  config: DefaultAuthConfigParams;
  state?: stateType;
}

// Navigation
export interface PublicPathParams {
  key?: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
  restricted: boolean;
  subRoutes: PublicPathParams[];
  props?: any;
}

export interface PrivatePathParams {
  key?: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
  props?: any;
}

export type UserRoleParams = { [role: string]: { access: string[] } };

export interface NavigationConfigParams {
  publicPaths: PublicPathParams[];
  privatePaths: PrivatePathParams[];
  userRoles: UserRoleParams;
  routerType?: "browser" | "hash";
}

export interface NavigationProviderParams extends NavigationConfigParams {
  children: React.ReactNode;
}

export type publicReturnType = {
  [key: string]: { name: string; path: string; props: any; active: boolean };
};

// Theme
type colorsType = {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  highlightColor: string;
  textColor: string;
  borderColor: string;
  cardColor: string;
};

export interface DefaultThemeConfigParams {
  dark: boolean;
  colors: colorsType;
}

export interface ThemeProviderParams {
  children: React.ReactNode;
  theme: DefaultThemeConfigParams;
  toggleTheme?: () => void;
}
