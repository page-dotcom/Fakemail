// app/layout.js

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';
import { CONFIG } from './config';

// --- KONFIGURASI SEO TINGKAT TINGGI ---
export const metadata = {
  metadataBase: new URL(CONFIG.domainUrl),
  title: {
    default: CONFIG.siteName + ' - Instant Disposable Email Address',
    template: `%s | ${CONFIG.siteName}`
  },
  description: CONFIG.description,
  keywords: CONFIG.keywords,
  authors: [{ name: CONFIG.siteName }],
  creator: CONFIG.siteName,
  publisher: CONFIG.siteName,
  openGraph: {
    title: CONFIG.siteName,
    description: CONFIG.description,
    url: CONFIG.domainUrl,
    siteName: CONFIG.siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${CONFIG.siteName} Preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.siteName,
    description: CONFIG.description,
    images: [CONFIG.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: CONFIG.domainUrl,
  },
};

// --- DATA SCHEMA JSON-LD ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": CONFIG.siteName,
  "operatingSystem": "WEB",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": CONFIG.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Oswald:wght@500;700&display=swap" rel="stylesheet" />
        
        {/* --- PENAMBAHAN SCHEMA JSON-LD --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        
        {/* --- GOOGLE ANALYTICS --- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7JJJMLRN3V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7JJJMLRN3V');
          `}
        </Script>

        <Header />
        
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        {/* --- COOKIE CONSENT BANNER (TANPA onClick) --- */}
        <div id="cookie-banner" className="alert alert-dark" style={{
          position: 'fixed', 
          bottom: 0, 
          width: '100%', 
          marginBottom: 0, 
          borderRadius: 0, 
          zIndex: 9999, 
          display: 'none',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          padding: '15px'
        }}>
          <div className="container text-center">
            <span>This website uses cookies to ensure you get the best experience. </span>
            {/* ID ditambahkan di sini untuk diakses oleh script di bawah */}
            <button id="accept-cookie-btn" className="btn btn-primary btn-sm" style={{marginLeft: '10px'}}>Got it!</button>
          </div>
        </div>

        {/* Script untuk kontrol tampilan banner dan event klik */}
        <Script id="cookie-logic" strategy="afterInteractive">
          {`
            // Cek apakah user sudah setuju sebelumnya
            if (!localStorage.getItem('cookieAccepted')) {
              document.getElementById('cookie-banner').style.display = 'block';
            }

            // Tambahkan event listener ke tombol (menggantikan onClick)
            var btn = document.getElementById('accept-cookie-btn');
            if(btn) {
              btn.addEventListener('click', function() {
                localStorage.setItem('cookieAccepted', 'yes');
                document.getElementById('cookie-banner').style.display = 'none';
              });
            }
          `}
        </Script>

        <Footer />
      </body>
    </html>
  )
}
