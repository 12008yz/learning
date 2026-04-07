import localFont from "next/font/local";
import "./globals.css";

/**
 * Involve — статические TTF из app/fonts (Regular / Medium / SemiBold / Bold + Oblique).
 * Веса: Regular 400, Medium 500, SemiBold 600, Bold 700.
 */
const involve = localFont({
  src: [
    { path: "./fonts/Involve-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Involve-Oblique.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Involve-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Involve-MediumOblique.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Involve-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Involve-SemiBoldOblique.ttf", weight: "600", style: "italic" },
    { path: "./fonts/Involve-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Involve-BoldOblique.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-involve",
  display: "swap",
});

export const metadata = {
  title: "МНОЖИТЕЛ",
  description: "Подготовка к экзаменам",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${involve.variable} subpixel-antialiased`}
        style={{
          fontFamily: "var(--font-involve), system-ui, sans-serif",
          fontSynthesis: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
