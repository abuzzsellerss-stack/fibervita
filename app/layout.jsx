import './globals.css';

export const metadata = {
  title: 'Fibrevita | The Modern Fiber Essential',
  description: 'Premium psyllium husk in convenient single-serve sachets. Close the fiber gap with Fibrevita.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
