export default function Footer({ authenticated = false }) {
  return (
    <footer className={` ${!authenticated ? 'text-center' : 'bg-gray-50 border-t border-gray-200 mt-auto'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`flex ${authenticated ? 'justify-between items-center' : 'justify-center'}`}>
          <div className={!authenticated ? 'text-center' : ''}>
            <p className={`text-sm font-semibold ${!authenticated ? 'text-white' : 'text-gray-900'}`}>Ayzis - 2025</p>
            <p className={`text-sm ${!authenticated ? 'text-white' : 'text-gray-600'}`}>Todos os direitos reservados</p>
          </div>

          {authenticated && (
            <div className="text-right text-sm text-gray-600">
              <p></p>
              <p>Sistema de Gestão Ayzis</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
