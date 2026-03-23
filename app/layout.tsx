import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'Sankalp UPSC - Civil Services Preparation',
  description: 'The premier UPSC community at Delhi University.',
};

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
        width: '100%',
        maxWidth: '100vw',    // Added to lock width
        overflowX: 'hidden',  // Added to hide rogue horizontal space
        position: 'relative', // Helps with absolute positioned elements
        boxSizing: 'border-box'
      }}>
        <Navbar />
        <main style={{ 
          flexGrow: 1, 
          width: '100%', 
          maxWidth: '100vw',  // Added to main container
          overflowX: 'hidden' // Double layer of protection
        }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}