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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Clock, MapPin, Phone, CreditCard, Shield } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { Service, Booking } from '@/types'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service
  onSubmit: (bookingData: Partial<Booking>) => void
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

export function BookingDialog({ 
  open, 
  onOpenChange, 
  service, 
  onSubmit 
}: BookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState('2')
  const [address, setAddress] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateTotal = () => {
    const hours = parseInt(duration)
    return service.price * hours
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    try {
      const bookingData: Partial<Booking> = {
        id: `booking_${Date.now()}`,
        service_id: service.id,
        provider_id: service.provider.id,
        status: 'pending',
        scheduled_date: selectedDate.toISOString().split('T')[0],
        scheduled_time: selectedTime,
        duration_hours: parseInt(duration),
        total_amount: calculateTotal(),
        special_instructions: specialInstructions,
        address,
        contact_phone: contactPhone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      await onSubmit(bookingData)
      
      // Show success message
      alert(`¡Reserva confirmada! Total: ${calculateTotal()}. Recibirás una confirmación por email.`)
      
      // Reset form
      setSelectedDate(undefined)
      setSelectedTime('')
      setDuration('2')
      setAddress('')
      setContactPhone('')
      setSpecialInstructions('')
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting booking:', error)
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
              <CalendarIcon className="w-4 h-4 text-primary" />
            </div>
            Reservar Servicio
          </DialogTitle>
          <DialogDescription>
            Programa tu cita para: <strong>{service.title}</strong>
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
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Proveedor Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>
              Fecha del Servicio <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: es })
                  ) : (
                    "Selecciona una fecha"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Hora <span className="text-destructive">*</span>
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona hora" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duración Estimada</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="2">2 horas</SelectItem>
                  <SelectItem value="3">3 horas</SelectItem>
                  <SelectItem value="4">4 horas</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="8">8 horas (día completo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <Label htmlFor="contactPhone">
              Teléfono de Contacto <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactPhone"
                placeholder="Tu número de teléfono"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Información adicional para el proveedor (acceso, horarios especiales, etc.)"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-primary" />
              <h4 className="font-medium">Resumen de Costos</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Precio base por hora:</span>
                <span>${service.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Duración:</span>
                <span>{duration} hora{parseInt(duration) > 1 ? 's' : ''}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-primary">${calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">
                  Política de Reservas
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Confirmación en 2-4 horas</li>
                  <li>• Cancelación gratuita hasta 24h antes</li>
                  <li>• Pago seguro al completar el servicio</li>
                  <li>• Garantía de satisfacción incluida</li>
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
              disabled={isSubmitting || !selectedDate || !selectedTime || !address.trim() || !contactPhone.trim()}
            >
              {isSubmitting ? 'Procesando...' : `Reservar por $${calculateTotal()}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}