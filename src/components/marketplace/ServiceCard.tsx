import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MapPin, Clock, Shield } from 'lucide-react'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  onViewDetails?: (serviceId: string) => void
  onBookNow?: (serviceId: string) => void
  onRequestQuote?: (serviceId: string) => void
  onViewProvider?: (providerId: string) => void
}

export function ServiceCard({ service, onViewDetails, onBookNow, onRequestQuote, onViewProvider }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.images[0] || '/api/placeholder/400/300'}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 text-foreground hover:bg-background/90">
            {service.category}
          </Badge>
        </div>
        {service.provider.verified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary/90 text-primary-foreground gap-1">
              <Shield className="w-3 h-3" />
              Verificado
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Service Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Provider Info */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={service.provider.avatar} alt={service.provider.name} />
            <AvatarFallback className="text-xs">
              {service.provider.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <button 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => onViewProvider?.(service.provider.id)}
          >
            {service.provider.name}
          </button>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({service.reviews} reseñas)
            </span>
          </div>
        </div>

        {/* Location and Availability */}
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Disponible hoy</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${service.price}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              desde
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onRequestQuote?.(service.id)}
          >
            Cotizar
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onBookNow?.(service.id)}
          >
            Reservar
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full"
          onClick={() => onViewDetails?.(service.id)}
        >
          Ver Detalles Completos
        </Button>
      </CardFooter>
    </Card>
  )
}