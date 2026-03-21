import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'Sankalp UPSC - Civil Services Preparation',
  description: 'The premier UPSC community at Delhi University.',
};

// THIS IS THE CRITICAL ADDITION FOR MOBILE RESPONSIVENESS
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'var(--font-inter)', 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        overflowX: 'hidden' // Prevents horizontal scrolling on mobile
      }}>
        <Navbar />
        <main style={{ flexGrow: 1, width: '100%' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}