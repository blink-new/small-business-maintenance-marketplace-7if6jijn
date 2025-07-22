import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  Eye
} from 'lucide-react'
import type { Quote, Service, ServiceProvider } from '@/types'

// Mock data for quotes
const mockQuotes: (Quote & { service: Service; provider: ServiceProvider })[] = [
  {
    id: 'quote_1',
    service_id: 's1',
    user_id: 'user_1',
    provider_id: 'p1',
    status: 'sent',
    description: 'Necesito limpieza semanal para oficina de 200m²',
    estimated_price: 180,
    estimated_duration: '3 horas',
    valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Incluye productos ecológicos y limpieza de ventanas',
    preferred_date: '2024-01-25',
    address: 'Av. Principal 123, Centro',
    contact_phone: '+1 (555) 123-4567',
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
    id: 'quote_2',
    service_id: 's3',
    user_id: 'user_1',
    provider_id: 'p2',
    status: 'pending',
    description: 'Mantenimiento preventivo para equipos de oficina',
    preferred_date: '2024-01-28',
    address: 'Calle Comercial 456, Zona Norte',
    contact_phone: '+1 (555) 234-5678',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
  }
]

const statusConfig = {
  pending: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  sent: {
    label: 'Recibida',
    color: 'bg-blue-100 text-blue-800',
    icon: AlertCircle
  },
  accepted: {
    label: 'Aceptada',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  rejected: {
    label: 'Rechazada',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  },
  expired: {
    label: 'Expirada',
    color: 'bg-gray-100 text-gray-800',
    icon: XCircle
  }
}

export function QuotesManagement() {
  const [quotes] = useState(mockQuotes)
  const [activeTab, setActiveTab] = useState('all')

  const filterQuotes = (status?: string) => {
    if (!status || status === 'all') return quotes
    return quotes.filter(quote => quote.status === status)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const isExpiringSoon = (validUntil?: string) => {
    if (!validUntil) return false
    const expiryDate = new Date(validUntil)
    const now = new Date()
    const diffInDays = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diffInDays <= 2 && diffInDays > 0
  }

  const handleAcceptQuote = (quoteId: string) => {
    console.log('Accepting quote:', quoteId)
    // Here you would implement the accept logic
    alert('Cotización aceptada. Serás redirigido para completar la reserva.')
  }

  const handleRejectQuote = (quoteId: string) => {
    console.log('Rejecting quote:', quoteId)
    // Here you would implement the reject logic
    alert('Cotización rechazada.')
  }

  const handleContactProvider = (providerId: string) => {
    console.log('Contacting provider:', providerId)
    // Here you would open the chat dialog
    alert('Abriendo chat con el proveedor...')
  }

  const QuoteCard = ({ quote }: { quote: typeof mockQuotes[0] }) => {
    const statusInfo = statusConfig[quote.status]
    const StatusIcon = statusInfo.icon

    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={quote.provider.avatar} alt={quote.provider.name} />
                <AvatarFallback>
                  {quote.provider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{quote.service.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {quote.provider.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                  {isExpiringSoon(quote.valid_until) && (
                    <Badge variant="destructive">
                      <Clock className="w-3 h-3 mr-1" />
                      Expira pronto
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              {quote.estimated_price && (
                <div className="text-2xl font-bold text-primary">
                  ${quote.estimated_price}
                </div>
              )}
              {quote.estimated_duration && (
                <p className="text-sm text-muted-foreground">
                  {quote.estimated_duration}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">Descripción del Proyecto</h4>
            <p className="text-sm text-muted-foreground">{quote.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {quote.preferred_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Fecha preferida: {formatDate(quote.preferred_date)}</span>
              </div>
            )}
            {quote.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{quote.address}</span>
              </div>
            )}
            {quote.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{quote.contact_phone}</span>
              </div>
            )}
            {quote.valid_until && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Válida hasta: {formatDate(quote.valid_until)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {quote.notes && (
            <div>
              <h4 className="font-medium mb-2">Notas del Proveedor</h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {quote.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {quote.status === 'sent' && (
              <>
                <Button 
                  onClick={() => handleAcceptQuote(quote.id)}
                  className="gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aceptar Cotización
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRejectQuote(quote.id)}
                  className="gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rechazar
                </Button>
              </>
            )}
            <Button 
              variant="outline" 
              onClick={() => handleContactProvider(quote.provider_id)}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Ver Detalles
            </Button>
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
          <h2 className="text-2xl font-bold mb-2">Gestión de Cotizaciones</h2>
          <p className="text-muted-foreground">
            Revisa y gestiona las cotizaciones de tus proveedores
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Badge variant="outline" className="gap-1">
            <DollarSign className="w-3 h-3" />
            {quotes.length} cotizaciones
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas ({quotes.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Pendientes ({filterQuotes('pending').length})
          </TabsTrigger>
          <TabsTrigger value="sent">
            Recibidas ({filterQuotes('sent').length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Aceptadas ({filterQuotes('accepted').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filterQuotes(activeTab === 'all' ? undefined : activeTab).length > 0 ? (
              filterQuotes(activeTab === 'all' ? undefined : activeTab).map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay cotizaciones</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all' 
                    ? 'Aún no has solicitado ninguna cotización'
                    : `No tienes cotizaciones ${statusConfig[activeTab as keyof typeof statusConfig]?.label.toLowerCase()}`
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