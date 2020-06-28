import { ThemeProvider } from "./hooks";
import { AuthContainer, NavigationContainer } from "./hocs";
import { ScreensContainer } from "./components";

export { useAuth, useTheme, useNavigation } from "./hooks";
export { DefaultAuthConfig, DefaultThemeConfig } from "./contexts";

export const Theme = () => ({ Provider: ThemeProvider });
