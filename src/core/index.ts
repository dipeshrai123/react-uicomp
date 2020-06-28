import { ThemeProvider } from "./hooks";
import { AuthContainer, NavigationContainer } from "./hocs";
import { ScreensContainer } from "./components";

export { useAuth, useTheme, useNavigation } from "./hooks";
export { DefaultAuthConfig, DefaultThemeConfig } from "./contexts";
export const Theme = { Provider: ThemeProvider };
export const Auth = { Provider: AuthContainer, Screens: ScreensContainer };
export const Navigation = { Provider: NavigationContainer };