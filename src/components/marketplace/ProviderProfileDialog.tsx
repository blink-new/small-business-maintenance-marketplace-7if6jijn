import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  Award,
  Calendar,
  Clock,
  MessageCircle,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react'
import type { DetailedServiceProvider, Service } from '@/types'

interface ProviderProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: DetailedServiceProvider
  services: Service[]
  onRequestQuote: (serviceId: string) => void
  onBookService: (serviceId: string) => void
  onStartChat: (providerId: string) => void
}

// Mock data for detailed provider
const mockDetailedProvider: DetailedServiceProvider = {
  id: 'p1',
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
  specialties: ['Limpieza de Oficinas', 'Limpieza Industrial', 'Desinfección', 'Limpieza de Ventanas'],
  experience_years: 12,
  certifications: ['Certificación en Limpieza Industrial', 'Manejo de Químicos Especializados', 'Primeros Auxilios'],
  insurance_info: 'Seguro de responsabilidad civil por $500,000',
  service_areas: ['Centro', 'Zona Norte', 'Zona Sur', 'Distrito Comercial'],
  availability_schedule: {
    monday: { start: '08:00', end: '18:00', available: true },
    tuesday: { start: '08:00', end: '18:00', available: true },
    wednesday: { start: '08:00', end: '18:00', available: true },
    thursday: { start: '08:00', end: '18:00', available: true },
    friday: { start: '08:00', end: '18:00', available: true },
    saturday: { start: '09:00', end: '15:00', available: true },
    sunday: { start: '00:00', end: '00:00', available: false }
  },
  portfolio_images: [
    '/api/placeholder/300/200',
    '/api/placeholder/300/200',
    '/api/placeholder/300/200',
    '/api/placeholder/300/200'
  ],
  contact_email: 'carlos@limpiezapro.com',
  contact_phone: '+1 (555) 123-4567',
  website_url: 'https://limpiezapro.com',
  social_media: {
    facebook: 'https://facebook.com/limpiezapro',
    instagram: 'https://instagram.com/limpiezapro',
    linkedin: 'https://linkedin.com/company/limpiezapro'
  }
}

const dayNames = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo'
}

export function ProviderProfileDialog({ 
  open, 
  onOpenChange, 
  provider: initialProvider, 
  services,
  onRequestQuote,
  onBookService,
  onStartChat
}: ProviderProfileDialogProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Use mock data for now, later replace with actual provider data
  const provider = mockDetailedProvider

  const renderSocialIcon = (platform: string, url: string) => {
    const icons = {
      facebook: Facebook,
      instagram: Instagram,
      linkedin: Linkedin
    }
    
    const Icon = icons[platform as keyof typeof icons]
    if (!Icon) return null

    return (
      <Button
        key={platform}
        variant="outline"
        size="sm"
        onClick={() => window.open(url, '_blank')}
        className="gap-2"
      >
        <Icon className="w-4 h-4" />
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback className="text-lg">
                {provider.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <DialogTitle className="text-xl">{provider.business_name}</DialogTitle>
                {provider.verified && (
                  <Badge className="bg-green-100 text-green-800 gap-1">
                    <Shield className="w-3 h-3" />
                    Verificado
                  </Badge>
                )}
              </div>
              <DialogDescription className="text-base">
                {provider.name} • {provider.experience_years} años de experiencia
              </DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{provider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acerca de</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{provider.description}</p>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {provider.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horarios de Disponibilidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(provider.availability_schedule).map(([day, schedule]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium">
                        {dayNames[day as keyof typeof dayNames]}
                      </span>
                      <span className={schedule.available ? 'text-green-600' : 'text-muted-foreground'}>
                        {schedule.available ? `${schedule.start} - ${schedule.end}` : 'No disponible'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Áreas de Servicio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.service_areas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={service.images[0] || '/api/placeholder/80/80'}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{service.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-primary">
                              ${service.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{service.rating}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onRequestQuote(service.id)}
                            >
                              Cotizar
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => onBookService(service.id)}
                            >
                              Reservar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {provider.portfolio_images.map((image, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Trabajo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>{provider.contact_email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{provider.contact_phone}</span>
                </div>
                {provider.website_url && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <a 
                      href={provider.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {provider.website_url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media */}
            {provider.social_media && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Redes Sociales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(provider.social_media).map(([platform, url]) => 
                      renderSocialIcon(platform, url)
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>{provider.insurance_info}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => onStartChat(provider.id)}
                className="flex-1 gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Iniciar Chat
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(`tel:${provider.contact_phone}`)}
                className="gap-2"
              >
                <Phone className="w-4 h-4" />
                Llamar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}