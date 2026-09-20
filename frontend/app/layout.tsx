import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amara Pharmacy – India’s Trusted E-Pharmacy & Generic Substitute Engine',
  description:
    'Order 100% genuine medicines online with instant 2-hour delivery, compare generic substitutes with identical active salts, and upload doctor prescriptions seamlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
