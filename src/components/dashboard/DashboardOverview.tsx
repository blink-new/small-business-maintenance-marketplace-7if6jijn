import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'

const recentBookings = [
  {
    id: '1',
    service: 'Limpieza de Oficinas',
    provider: 'Limpieza Pro',
    date: '2024-01-20',
    status: 'confirmed',
    amount: 250
  },
  {
    id: '2',
    service: 'Reparación de Plomería',
    provider: 'Plomería Rápida',
    date: '2024-01-18',
    status: 'in_progress',
    amount: 180
  },
  {
    id: '3',
    service: 'Pulido de Pisos',
    provider: 'Pisos Brillantes',
    date: '2024-01-15',
    status: 'completed',
    amount: 120
  }
]

const upcomingServices = [
  {
    id: '1',
    service: 'Servicio de Fumigación',
    provider: 'Control de Plagas Pro',
    date: '2024-01-25',
    time: '10:00 AM'
  },
  {
    id: '2',
    service: 'Servicio de Mudanza',
    provider: 'Mudanzas Seguras',
    date: '2024-01-28',
    time: '2:00 PM'
  }
]

export function DashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-600'
      case 'in_progress':
        return 'bg-yellow-500/10 text-yellow-600'
      case 'completed':
        return 'bg-green-500/10 text-green-600'
      default:
        return 'bg-gray-500/10 text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Calendar className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">
              +12% del mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 programados esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Socios de confianza
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              De 24 reseñas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{booking.service}</p>
                      <p className="text-xs text-muted-foreground">{booking.provider}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${booking.amount}</p>
                    <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status === 'confirmed' ? 'confirmado' : 
                       booking.status === 'in_progress' ? 'en progreso' : 
                       booking.status === 'completed' ? 'completado' : booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todas las Reservas
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{service.service}</p>
                      <p className="text-xs text-muted-foreground">{service.provider}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.date} a las {service.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Reprogramar
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Calendario
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Service Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Servicios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Programa de Limpieza General</span>
                <span>75% Completo</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Próximo servicio: 15 de febrero, 2024
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Programa de Pulido de Pisos</span>
                <span>50% Completo</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Próximo servicio: 1 de marzo, 2024
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Programa de Fumigación</span>
                <span>100% Activo</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Monitoreo 24/7 activo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}