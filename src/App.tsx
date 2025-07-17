import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { MarketplacePage } from '@/pages/MarketplacePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { Toaster } from '@/components/ui/toaster'
import { blink } from '@/blink/client'

function App() {
  const [currentView, setCurrentView] = useState<'marketplace' | 'dashboard'>('marketplace')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <p className="text-muted-foreground">Cargando Serva...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Bienvenido a Serva</h1>
          <p className="text-muted-foreground mb-6">
            Tu mercado de confianza para servicios de mantenimiento empresarial
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Iniciar Sesión para Continuar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
      />
      
      <main>
        {currentView === 'marketplace' ? (
          <MarketplacePage />
        ) : (
          <DashboardPage />
        )}
      </main>
      
      <Toaster />
    </div>
  )
}

export default App