import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  Star,
  PlayCircle,
  PauseCircle
} from 'lucide-react'
import type { Booking, Service, ServiceProvider } from '@/types'

// Mock data for bookings
const mockBookings: (Booking & { service: Service; provider: ServiceProvider })[] = [
  {
    id: 'booking_1',
    service_id: 's1',
    user_id: 'user_1',
    provider_id: 'p1',
    status: 'confirmed',
    scheduled_date: '2024-01-25',
    scheduled_time: '09:00',
    duration_hours: 3,
    total_amount: 180,
    address: 'Av. Principal 123, Centro',
    contact_phone: '+1 (555) 123-4567',
    special_instructions: 'Usar productos ecológicos, acceso por entrada principal',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    service: {
      id: 's1',
      title: 'Limpieza de Oficinas Comerciales',
      description: 'Servicio completo de limpieza para oficinas',
      category: 'cleaning',
      price: 45,
      rating: 4.9,
      reviews: 89,
      images: ['/api/placeholder/300/200'],
      availability: ['Lunes a Viernes'],
      location: 'Centro',
      created_at: '',
      updated_at: '',
      provider: {
        id: 'p1',
        name: 'Carlos Rodríguez',
        avatar: '/api/placeholder/80/80',
        rating: 4.9,
        reviews: 234,
        verified: true,
        description: 'Especialista en limpieza comercial',
        services_count: 15,
        location: 'Centro',
        joined_date: '2022-01-15'
      }
    },
    provider: {
      id: 'p1',
      name: 'Carlos Rodríguez',
      avatar: '/api/placeholder/80/80',
      rating: 4.9,
      reviews: 234,
      verified: true,
      description: 'Especialista en limpieza comercial',
      services_count: 15,
      location: 'Centro',
      joined_date: '2022-01-15'
    }
  },
  {
    id: 'booking_2',
    service_id: 's3',
    user_id: 'user_1',
    provider_id: 'p2',
    status: 'in_progress',
    scheduled_date: '2024-01-24',
    scheduled_time: '14:00',
    duration_hours: 4,
    total_amount: 480,
    address: 'Calle Comercial 456, Zona Norte',
    contact_phone: '+1 (555) 234-5678',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    service: {
      id: 's3',
      title: 'Mantenimiento Preventivo Integral',
      description: 'Programa de mantenimiento preventivo',
      category: 'maintenance',
      price: 120,
      rating: 4.7,
      reviews: 45,
      images: ['/api/placeholder/300/200'],
      availability: ['Lunes a Sábado'],
      location: 'Zona Norte',
      created_at: '',
      updated_at: '',
      provider: {
        id: 'p2',
        name: 'Ana García',
        avatar: '/api/placeholder/80/80',
        rating: 4.7,
        reviews: 156,
        verified: true,
        description: 'Servicios de mantenimiento integral',
        services_count: 12,
        location: 'Zona Norte',
        joined_date: '2021-08-20'
      }
    },
    provider: {
      id: 'p2',
      name: 'Ana García',
      avatar: '/api/placeholder/80/80',
      rating: 4.7,
      reviews: 156,
      verified: true,
      description: 'Servicios de mantenimiento integral',
      services_count: 12,
      location: 'Zona Norte',
      joined_date: '2021-08-20'
    }
  },
  {
    id: 'booking_3',
    service_id: 's5',
    user_id: 'user_1',
    provider_id: 'p3',
    status: 'completed',
    scheduled_date: '2024-01-20',
    scheduled_time: '20:00',
    duration_hours: 8,
    total_amount: 200,
    address: 'Plaza Central 789, Centro',
    contact_phone: '+1 (555) 345-6789',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    service: {
      id: 's5',
      title: 'Vigilancia Nocturna',
      description: 'Servicio de vigilancia nocturna',
      category: 'security',
      price: 25,
      rating: 4.8,
      reviews: 34,
      images: ['/api/placeholder/300/200'],
      availability: ['Todos los días'],
      location: 'Centro',
      created_at: '',
      updated_at: '',
      provider: {
        id: 'p3',
        name: 'Miguel Torres',
        avatar: '/api/placeholder/80/80',
        rating: 4.8,
        reviews: 89,
        verified: true,
        description: 'Servicios de seguridad privada',
        services_count: 8,
        location: 'Centro',
        joined_date: '2020-03-10'
      }
    },
    provider: {
      id: 'p3',
      name: 'Miguel Torres',
      avatar: '/api/placeholder/80/80',
      rating: 4.8,
      reviews: 89,
      verified: true,
      description: 'Servicios de seguridad privada',
      services_count: 8,
      location: 'Centro',
      joined_date: '2020-03-10'
    }
  }
]

const statusConfig = {
  pending: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    progress: 25
  },
  confirmed: {
    label: 'Confirmada',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
    progress: 50
  },
  in_progress: {
    label: 'En Progreso',
    color: 'bg-green-100 text-green-800',
    icon: PlayCircle,
    progress: 75
  },
  completed: {
    label: 'Completada',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    progress: 100
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    progress: 0
  }
}

export function BookingsManagement() {
  const [bookings] = useState(mockBookings)
  const [activeTab, setActiveTab] = useState('all')

  const filterBookings = (status?: string) => {
    if (!status || status === 'all') return bookings
    return bookings.filter(booking => booking.status === status)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}:00`)
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isUpcoming = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date}T${time}:00`)
    return bookingDateTime > new Date()
  }

  const handleCancelBooking = (bookingId: string) => {
    console.log('Cancelling booking:', bookingId)
    alert('Reserva cancelada. Se aplicarán las políticas de cancelación.')
  }

  const handleContactProvider = (providerId: string) => {
    console.log('Contacting provider:', providerId)
    alert('Abriendo chat con el proveedor...')
  }

  const handleRateService = (bookingId: string) => {
    console.log('Rating service:', bookingId)
    alert('Abriendo formulario de calificación...')
  }

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const statusInfo = statusConfig[booking.status]
    const StatusIcon = statusInfo.icon
    const upcoming = isUpcoming(booking.scheduled_date, booking.scheduled_time)

    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={booking.provider.avatar} alt={booking.provider.name} />
                <AvatarFallback>
                  {booking.provider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{booking.service.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {booking.provider.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                  {upcoming && booking.status === 'confirmed' && (
                    <Badge variant="outline">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Próxima
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${booking.total_amount}
              </div>
              <p className="text-sm text-muted-foreground">
                {booking.duration_hours}h de servicio
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso del servicio</span>
              <span>{statusInfo.progress}%</span>
            </div>
            <Progress value={statusInfo.progress} className="h-2" />
          </div>

          {/* Schedule Info */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {formatDateTime(booking.scheduled_date, booking.scheduled_time)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{booking.address}</span>
            </div>
          </div>

          {/* Contact Info */}
          {booking.contact_phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{booking.contact_phone}</span>
            </div>
          )}

          {/* Special Instructions */}
          {booking.special_instructions && (
            <div>
              <h4 className="font-medium mb-2">Instrucciones Especiales</h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {booking.special_instructions}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {booking.status === 'confirmed' && upcoming && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleCancelBooking(booking.id)}
                className="gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancelar
              </Button>
            )}
            
            {booking.status === 'completed' && (
              <Button 
                onClick={() => handleRateService(booking.id)}
                className="gap-2"
                size="sm"
              >
                <Star className="w-4 h-4" />
                Calificar Servicio
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleContactProvider(booking.provider_id)}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </Button>
            
            {booking.status === 'in_progress' && (
              <Button variant="outline" size="sm" className="gap-2">
                <PauseCircle className="w-4 h-4" />
                Ver Progreso
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Gestión de Reservas</h2>
          <p className="text-muted-foreground">
            Rastrea y gestiona todas tus reservas de servicios
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Badge variant="outline" className="gap-1">
            <Calendar className="w-3 h-3" />
            {bookings.length} reservas
          </Badge>
          <Badge variant="outline" className="gap-1">
            <DollarSign className="w-3 h-3" />
            ${bookings.reduce((sum, b) => sum + b.total_amount, 0)} total
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas ({bookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmadas ({filterBookings('confirmed').length})
          </TabsTrigger>
          <TabsTrigger value="in_progress">
            En Progreso ({filterBookings('in_progress').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completadas ({filterBookings('completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filterBookings(activeTab === 'all' ? undefined : activeTab).length > 0 ? (
              filterBookings(activeTab === 'all' ? undefined : activeTab).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay reservas</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all' 
                    ? 'Aún no has realizado ninguna reserva'
                    : `No tienes reservas ${statusConfig[activeTab as keyof typeof statusConfig]?.label.toLowerCase()}`
                  }
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}