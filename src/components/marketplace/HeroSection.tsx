import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Star } from 'lucide-react'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in', location)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Confianza de más de 10,000 empresas
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Encuentra
              <span className="text-primary"> Servicios de Mantenimiento</span>
              <br />
              Confiables para tu Negocio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conéctate con profesionales de mantenimiento verificados. Desde limpieza hasta plomería, 
              instalaciones hasta fumigación - obtén servicios de calidad cuando los necesites.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border max-w-3xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="¿Qué servicio necesitas? (ej. limpieza, plomería)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
              <div className="md:w-64 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="h-12 px-8 text-base font-medium"
                size="lg"
              >
                Buscar Servicios
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Proveedores Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-muted-foreground">Servicios Completados</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-primary">4.9</span>
                <Star className="w-6 h-6 fill-primary text-primary" />
              </div>
              <div className="text-muted-foreground">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}