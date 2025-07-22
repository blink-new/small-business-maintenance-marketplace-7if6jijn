import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock, MapPin, Phone, User } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { Service, Quote } from '@/types'

interface QuoteRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service
  onSubmit: (quoteData: Partial<Quote>) => void
}

export function QuoteRequestDialog({ 
  open, 
  onOpenChange, 
  service, 
  onSubmit 
}: QuoteRequestDialogProps) {
  const [description, setDescription] = useState('')
  const [preferredDate, setPreferredDate] = useState<Date>()
  const [address, setAddress] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const quoteData: Partial<Quote> = {
        id: `quote_${Date.now()}`,
        service_id: service.id,
        provider_id: service.provider.id,
        status: 'pending',
        description,
        notes: specialInstructions,
        // Add new fields
        preferred_date: preferredDate?.toISOString().split('T')[0],
        address,
        contact_phone: contactPhone,
        special_instructions: specialInstructions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      await onSubmit(quoteData)
      
      // Show success message
      alert('¡Cotización solicitada exitosamente! El proveedor te responderá en 24-48 horas.')
      
      // Reset form
      setDescription('')
      setPreferredDate(undefined)
      setAddress('')
      setContactPhone('')
      setSpecialInstructions('')
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting quote request:', error)
      alert('Error al enviar la solicitud. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            Solicitar Cotización
          </DialogTitle>
          <DialogDescription>
            Solicita una cotización personalizada para: <strong>{service.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <img
                src={service.images[0] || '/api/placeholder/60/60'}
                alt={service.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{service.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Por {service.provider.name}
                </p>
                <p className="text-sm text-primary font-medium">
                  Desde ${service.price}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Describe tu proyecto <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe detalladamente qué necesitas, el tamaño del área, condiciones especiales, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          {/* Preferred Date */}
          <div className="space-y-2">
            <Label>Fecha Preferida</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !preferredDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferredDate ? (
                    format(preferredDate, "PPP", { locale: es })
                  ) : (
                    "Selecciona una fecha"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={preferredDate}
                  onSelect={setPreferredDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Dirección del Servicio <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Dirección completa donde se realizará el servicio"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactPhone"
                placeholder="Tu número de teléfono"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Cualquier información adicional que el proveedor deba saber..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">
                  ¿Qué sucede después?
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• El proveedor revisará tu solicitud</li>
                  <li>• Recibirás una cotización detallada en 24-48 horas</li>
                  <li>• Podrás aceptar, rechazar o negociar la propuesta</li>
                  <li>• Una vez aceptada, podrás programar el servicio</li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !description.trim() || !address.trim()}
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}