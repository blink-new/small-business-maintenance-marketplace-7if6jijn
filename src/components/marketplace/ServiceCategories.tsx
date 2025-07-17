import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Zap, 
  Droplets, 
  Paintbrush, 
  Bug, 
  Wrench, 
  Truck, 
  Hammer
} from 'lucide-react'

const categories = [
  {
    id: 'limpieza-general',
    name: 'Limpieza General',
    icon: Sparkles,
    description: 'Servicios de limpieza básica y mantenimiento',
    serviceCount: 324,
    color: 'bg-blue-500/10 text-blue-600'
  },
  {
    id: 'limpieza-especializada',
    name: 'Limpieza Especializada',
    icon: Sparkles,
    description: 'Limpieza profunda y servicios especializados',
    serviceCount: 189,
    color: 'bg-purple-500/10 text-purple-600'
  },
  {
    id: 'pulido-piso',
    name: 'Pulido de Piso',
    icon: Paintbrush,
    description: 'Pulido, encerado y mantenimiento de pisos',
    serviceCount: 145,
    color: 'bg-yellow-500/10 text-yellow-600'
  },
  {
    id: 'fumigacion',
    name: 'Fumigación',
    icon: Bug,
    description: 'Control de plagas y fumigación',
    serviceCount: 98,
    color: 'bg-red-500/10 text-red-600'
  },
  {
    id: 'plomeria',
    name: 'Plomería',
    icon: Droplets,
    description: 'Reparación e instalación de sistemas de agua',
    serviceCount: 203,
    color: 'bg-cyan-500/10 text-cyan-600'
  },
  {
    id: 'mudanzas',
    name: 'Mudanzas',
    icon: Truck,
    description: 'Servicios de mudanza y transporte',
    serviceCount: 89,
    color: 'bg-orange-500/10 text-orange-600'
  },
  {
    id: 'instalacion-reparacion',
    name: 'Instalación y Reparación',
    icon: Hammer,
    description: 'Instalación y reparación de equipos',
    serviceCount: 167,
    color: 'bg-green-500/10 text-green-600'
  }
]

interface ServiceCategoriesProps {
  onCategorySelect?: (categoryId: string) => void
}

export function ServiceCategories({ onCategorySelect }: ServiceCategoriesProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explorar por Categoría</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encuentra el servicio de mantenimiento adecuado para las necesidades de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 bg-background/60 backdrop-blur-sm"
                onClick={() => onCategorySelect?.(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {category.serviceCount} servicios
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}