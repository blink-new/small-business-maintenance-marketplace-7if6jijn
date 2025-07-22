import { useState } from 'react'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { QuotesManagement } from '@/components/dashboard/QuotesManagement'
import { BookingsManagement } from '@/components/dashboard/BookingsManagement'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  Star, 
  Settings,
  Plus,
  FileText
} from 'lucide-react'

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Negocios</h1>
            <p className="text-muted-foreground">
              Gestiona tus servicios de mantenimiento y rastrea el progreso
            </p>
          </div>
          <Button className="mt-4 md:mt-0 gap-2">
            <Plus className="w-4 h-4" />
            Reservar Nuevo Servicio
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Cotizaciones</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Reservas</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Pagos</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Reseñas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            <QuotesManagement />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <BookingsManagement />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Historial de Pagos</h3>
              <p className="text-muted-foreground mb-4">
                Rastrea tus pagos y facturas
              </p>
              <Button>Ver Historial de Pagos</Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reseñas y Calificaciones</h3>
              <p className="text-muted-foreground mb-4">
                Gestiona tus reseñas y calificaciones de proveedores
              </p>
              <Button>Ver Todas las Reseñas</Button>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Configuración de Cuenta</h3>
              <p className="text-muted-foreground mb-4">
                Gestiona las preferencias de tu cuenta y notificaciones
              </p>
              <Button>Abrir Configuración</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}