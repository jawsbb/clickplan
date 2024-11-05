import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="h-16 fixed top-0 left-0 right-0 bg-white shadow-sm z-50 flex items-center px-6">
          <h1 className="text-xl font-bold">Plan Sécurité</h1>
        </header>
        <main className="pt-16 h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}