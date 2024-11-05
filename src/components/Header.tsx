import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Plan Sécurité
        </Link>
        <nav>
          <Link 
            href="/editor" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Nouveau Plan
          </Link>
        </nav>
      </div>
    </header>
  )
}