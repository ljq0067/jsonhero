import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "remix";
import clsx from "clsx";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "~/components/ThemeProvider";
import styles from "./tailwind.css";
import { getThemeSession } from "./theme.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme?: Theme;
  starCount?: number;
  themeOverride?: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const themeOverride = getThemeFromRequest(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    themeOverride,
  };

  return data;
};

function getThemeFromRequest(request: Request): Theme | undefined {
  const url = new URL(request.url);
  const theme = url.searchParams.get("theme");
  if (theme) {
    return theme as Theme;
  }
  return undefined;
}

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <body className="overscroll-none">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { theme, starCount, themeOverride } = useLoaderData<LoaderData>();

  const location = useLocation();

  // Force dark mode on the homepage
  const forceDarkMode = location.pathname === "/";

  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeOverride={forceDarkMode ? "dark" : themeOverride}
    >
      <App />
    </ThemeProvider>
  );
}
