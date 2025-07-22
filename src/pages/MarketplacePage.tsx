import { useState } from 'react'
import { HeroSection } from '@/components/marketplace/HeroSection'
import { ServiceCategories } from '@/components/marketplace/ServiceCategories'
import { ServiceCard } from '@/components/marketplace/ServiceCard'
import { QuoteRequestDialog } from '@/components/marketplace/QuoteRequestDialog'
import { BookingDialog } from '@/components/marketplace/BookingDialog'
import { ProviderProfileDialog } from '@/components/marketplace/ProviderProfileDialog'
import { ChatDialog } from '@/components/messaging/ChatDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { blink } from '@/blink/client'
import type { Service, Quote, Booking, DetailedServiceProvider } from '@/types'

// Mock data for featured services
const featuredServices: Service[] = [
  {
    id: '1',
    title: 'Limpieza Comercial de Oficinas',
    description: 'Servicio completo de limpieza para oficinas comerciales. Incluye pisos, ventanas, baños y áreas comunes con productos ecológicos.',
    category: 'Limpieza General',
    price: 299,
    rating: 4.9,
    reviews: 127,
    provider: {
      id: 'p1',
      name: 'Limpieza Pro',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      reviews: 234,
      verified: true,
      description: 'Servicios profesionales de limpieza',
      services_count: 15,
      location: 'Centro',
      joined_date: '2022-01-15'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles'],
    location: 'Área Centro',
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  },
  {
    id: '2',
    title: 'Servicio de Plomería de Emergencia',
    description: 'Reparaciones de plomería rápidas y confiables para empresas. Disponible 24/7 para situaciones de emergencia. Profesionales licenciados y asegurados.',
    category: 'Plomería',
    price: 150,
    rating: 4.8,
    reviews: 89,
    provider: {
      id: 'p2',
      name: 'Plomería Rápida',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      reviews: 156,
      verified: true,
      description: 'Servicios de plomería de emergencia',
      services_count: 8,
      location: 'Toda la ciudad',
      joined_date: '2021-08-20'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    location: 'Servicio en toda la ciudad',
    created_at: '2024-01-14',
    updated_at: '2024-01-14'
  },
  {
    id: '3',
    title: 'Pulido y Encerado de Pisos',
    description: 'Servicio profesional de pulido y encerado de pisos para oficinas comerciales. Incluye limpieza profunda y acabado brillante.',
    category: 'Pulido de Piso',
    price: 120,
    rating: 4.7,
    reviews: 203,
    provider: {
      id: 'p3',
      name: 'Pisos Brillantes',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      reviews: 298,
      verified: true,
      description: 'Especialistas en pulido de pisos',
      services_count: 12,
      location: 'Distrito Comercial',
      joined_date: '2020-03-10'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    location: 'Distrito Comercial',
    created_at: '2024-01-13',
    updated_at: '2024-01-13'
  },
  {
    id: '4',
    title: 'Servicio de Fumigación Comercial',
    description: 'Control integral de plagas para propiedades comerciales. Incluye inspección, tratamiento y seguimiento. Productos seguros y efectivos.',
    category: 'Fumigación',
    price: 200,
    rating: 4.9,
    reviews: 156,
    provider: {
      id: 'p4',
      name: 'Control de Plagas Pro',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      reviews: 187,
      verified: true,
      description: 'Especialistas en control de plagas',
      services_count: 18,
      location: 'Área Metropolitana',
      joined_date: '2019-11-05'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    location: 'Área Metropolitana',
    created_at: '2024-01-12',
    updated_at: '2024-01-12'
  },
  {
    id: '5',
    title: 'Servicio de Mudanzas Comerciales',
    description: 'Mudanzas completas para oficinas y negocios. Incluye embalaje, transporte y montaje. Equipo profesional y seguros.',
    category: 'Mudanzas',
    price: 450,
    rating: 4.8,
    reviews: 92,
    provider: {
      id: 'p5',
      name: 'Mudanzas Seguras',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      reviews: 134,
      verified: true,
      description: 'Especialistas en mudanzas comerciales',
      services_count: 10,
      location: 'Regional',
      joined_date: '2021-06-18'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    location: 'Cobertura Regional',
    created_at: '2024-01-11',
    updated_at: '2024-01-11'
  },
  {
    id: '6',
    title: 'Instalación y Reparación de Equipos',
    description: 'Instalación y reparación profesional de equipos de oficina y sistemas comerciales. Incluye mantenimiento preventivo y correctivo.',
    category: 'Instalación y Reparación',
    price: 180,
    rating: 4.6,
    reviews: 78,
    provider: {
      id: 'p6',
      name: 'Técnicos Expertos',
      avatar: '/api/placeholder/40/40',
      rating: 4.6,
      reviews: 112,
      verified: true,
      description: 'Servicios técnicos especializados',
      services_count: 14,
      location: 'Áreas Suburbanas',
      joined_date: '2020-09-12'
    },
    images: ['/api/placeholder/400/300'],
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    location: 'Áreas Suburbanas',
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  }
]

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Dialog states
  const [quoteDialog, setQuoteDialog] = useState<{ open: boolean; service: Service | null }>({
    open: false,
    service: null
  })
  const [bookingDialog, setBookingDialog] = useState<{ open: boolean; service: Service | null }>({
    open: false,
    service: null
  })
  const [providerDialog, setProviderDialog] = useState<{ open: boolean; provider: DetailedServiceProvider | null }>({
    open: false,
    provider: null
  })
  const [chatDialog, setChatDialog] = useState<{ open: boolean; provider: any | null }>({
    open: false,
    provider: null
  })
  
  const { toast } = useToast()

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleViewProvider = (providerId: string) => {
    // Mock provider data - in real app, fetch from API
    const mockProvider: DetailedServiceProvider = {
      id: providerId,
      name: 'Carlos Rodríguez',
      avatar: '/api/placeholder/80/80',
      rating: 4.9,
      reviews: 234,
      verified: true,
      description: 'Especialista en servicios de limpieza comercial con más de 10 años de experiencia',
      services_count: 15,
      location: 'Centro',
      joined_date: '2022-01-15',
      business_name: 'Limpieza Pro Servicios',
      specialties: ['Limpieza de Oficinas', 'Limpieza Industrial', 'Desinfección'],
      experience_years: 12,
      certifications: ['Certificación en Limpieza Industrial', 'Manejo de Químicos'],
      service_areas: ['Centro', 'Zona Norte', 'Zona Sur'],
      availability_schedule: {
        monday: { start: '08:00', end: '18:00', available: true },
        tuesday: { start: '08:00', end: '18:00', available: true },
        wednesday: { start: '08:00', end: '18:00', available: true },
        thursday: { start: '08:00', end: '18:00', available: true },
        friday: { start: '08:00', end: '18:00', available: true },
        saturday: { start: '09:00', end: '15:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false }
      },
      portfolio_images: ['/api/placeholder/300/200'],
      contact_email: 'carlos@limpiezapro.com',
      contact_phone: '+1 (555) 123-4567',
      website_url: 'https://limpiezapro.com',
      social_media: {
        facebook: 'https://facebook.com/limpiezapro'
      }
    }
    setProviderDialog({ open: true, provider: mockProvider })
  }

  const handleViewDetails = (serviceId: string) => {
    const service = featuredServices.find(s => s.id === serviceId)
    if (service) {
      // For now, just show provider profile
      handleViewProvider(service.provider.id)
    }
  }

  const handleBookNow = (serviceId: string) => {
    const service = featuredServices.find(s => s.id === serviceId)
    if (service) {
      setBookingDialog({ open: true, service })
    }
  }

  const handleRequestQuote = (serviceId: string) => {
    const service = featuredServices.find(s => s.id === serviceId)
    if (service) {
      setQuoteDialog({ open: true, service })
    }
  }

  const handleStartChat = (providerId: string) => {
    const service = featuredServices.find(s => s.provider.id === providerId)
    if (service) {
      setChatDialog({ open: true, provider: service.provider })
    }
  }

  const handleQuoteSubmit = async (quoteData: Partial<Quote>) => {
    try {
      // In real app, save to database
      console.log('Quote submitted:', quoteData)
      
      toast({
        title: "Cotización Solicitada",
        description: "Tu solicitud de cotización ha sido enviada. El proveedor te responderá pronto.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud de cotización. Intenta de nuevo.",
        variant: "destructive"
      })
    }
  }

  const handleBookingSubmit = async (bookingData: Partial<Booking>) => {
    try {
      // In real app, save to database
      console.log('Booking submitted:', bookingData)
      
      toast({
        title: "Reserva Solicitada",
        description: "Tu reserva ha sido enviada. El proveedor confirmará la disponibilidad pronto.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar la reserva. Intenta de nuevo.",
        variant: "destructive"
      })
    }
  }

  const filteredServices = featuredServices.filter(service => {
    if (selectedCategory && service.category.toLowerCase() !== selectedCategory) {
      return false
    }
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <ServiceCategories onCategorySelect={handleCategorySelect} />

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory ? `Servicios de ${selectedCategory}` : 'Servicios Destacados'}
              </h2>
              <p className="text-muted-foreground">
                {filteredServices.length} servicios disponibles
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar servicios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor Calificados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="reviews">Más Reseñas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Rango de Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Precios</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-300">$100 - $300</SelectItem>
                  <SelectItem value="300+">$300+</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Badge variant="secondary" className="gap-2">
                  Categoría: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-2">
                  Búsqueda: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={handleViewDetails}
                onBookNow={handleBookNow}
                onRequestQuote={handleRequestQuote}
                onViewProvider={handleViewProvider}
              />
            ))}
          </div>

          {/* Load More */}
          {filteredServices.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Cargar Más Servicios
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No se encontraron servicios</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory('')
                  setSearchQuery('')
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Dialogs */}
      {quoteDialog.service && (
        <QuoteRequestDialog
          open={quoteDialog.open}
          onOpenChange={(open) => setQuoteDialog({ open, service: open ? quoteDialog.service : null })}
          service={quoteDialog.service}
          onSubmit={handleQuoteSubmit}
        />
      )}

      {bookingDialog.service && (
        <BookingDialog
          open={bookingDialog.open}
          onOpenChange={(open) => setBookingDialog({ open, service: open ? bookingDialog.service : null })}
          service={bookingDialog.service}
          onSubmit={handleBookingSubmit}
        />
      )}

      {providerDialog.provider && (
        <ProviderProfileDialog
          open={providerDialog.open}
          onOpenChange={(open) => setProviderDialog({ open, provider: open ? providerDialog.provider : null })}
          provider={providerDialog.provider}
          services={featuredServices.filter(s => s.provider.id === providerDialog.provider?.id)}
          onRequestQuote={handleRequestQuote}
          onBookService={handleBookNow}
          onStartChat={handleStartChat}
        />
      )}

      {chatDialog.provider && (
        <ChatDialog
          open={chatDialog.open}
          onOpenChange={(open) => setChatDialog({ open, provider: open ? chatDialog.provider : null })}
          provider={chatDialog.provider}
          currentUserId="user_1" // In real app, get from auth
        />
      )}
    </div>
  )
}