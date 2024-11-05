import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-6 text-4xl font-bold">
        Éditeur de Plans de Sécurité
      </h1>
      <Link 
        href="/editor" 
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Créer un plan
      </Link>
    </div>
  )
}