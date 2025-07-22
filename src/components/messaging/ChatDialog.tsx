import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Phone, 
  Video,
  MoreVertical,
  Shield,
  Clock,
  CheckCheck,
  Check
} from 'lucide-react'
import { blink } from '@/blink/client'
import type { Message, Conversation, ServiceProvider } from '@/types'

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: ServiceProvider
  currentUserId: string
}

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: '1',
    conversation_id: 'conv_1',
    sender_id: 'provider_1',
    receiver_id: 'user_1',
    message_type: 'text',
    content: '¡Hola! Gracias por contactarme. ¿En qué puedo ayudarte con tu proyecto de limpieza?',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    conversation_id: 'conv_1',
    sender_id: 'user_1',
    receiver_id: 'provider_1',
    message_type: 'text',
    content: 'Hola Carlos! Necesito una cotización para limpieza de oficinas. Son aproximadamente 200m² en el centro de la ciudad.',
    created_at: new Date(Date.now() - 3000000).toISOString()
  },
  {
    id: '3',
    conversation_id: 'conv_1',
    sender_id: 'provider_1',
    receiver_id: 'user_1',
    message_type: 'text',
    content: 'Perfecto. Para darte una cotización precisa, ¿podrías decirme qué tipo de limpieza necesitas? ¿Es limpieza regular, profunda, o algún servicio específico?',
    created_at: new Date(Date.now() - 2400000).toISOString()
  },
  {
    id: '4',
    conversation_id: 'conv_1',
    sender_id: 'user_1',
    receiver_id: 'provider_1',
    message_type: 'text',
    content: 'Necesito limpieza regular semanal. Incluye pisos, baños, ventanas y áreas comunes. También me gustaría saber si manejas productos ecológicos.',
    created_at: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: '5',
    conversation_id: 'conv_1',
    sender_id: 'provider_1',
    receiver_id: 'user_1',
    message_type: 'text',
    content: '¡Excelente! Sí, trabajamos con productos 100% ecológicos. Para 200m² con limpieza semanal regular, el costo sería de $180 por sesión. ¿Te parece bien si programamos una visita para evaluar el espacio?',
    created_at: new Date(Date.now() - 1200000).toISOString()
  }
]

export function ChatDialog({ 
  open, 
  onOpenChange, 
  provider, 
  currentUserId 
}: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeChat = async () => {
    try {
      // Here you would initialize the real-time connection
      // For now, we'll simulate it
      setIsConnected(true)
      setIsOnline(true)
      
      toast({
        title: "Chat conectado",
        description: `Conectado con ${provider.name}`,
      })
    } catch (error) {
      console.error('Error connecting to chat:', error)
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar al chat",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      // Initialize real-time connection
      initializeChat()
    }
    return () => {
      // Cleanup connection when dialog closes
      if (isConnected) {
        // Add cleanup logic here when implementing real-time
      }
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageData: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: 'conv_1',
      sender_id: currentUserId,
      receiver_id: provider.id,
      message_type: 'text',
      content: newMessage.trim(),
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, messageData])
    setNewMessage('')

    // Simulate provider response after a delay
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const responseMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          conversation_id: 'conv_1',
          sender_id: provider.id,
          receiver_id: currentUserId,
          message_type: 'text',
          content: 'Gracias por tu mensaje. Te responderé en breve.',
          created_at: new Date().toISOString()
        }
        setMessages(prev => [...prev, responseMessage])
        setIsTyping(false)
      }, 2000)
    }, 1000)
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `hace ${minutes} min`
    } else if (diffInHours < 24) {
      return `hace ${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback>
                    {provider.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <DialogTitle className="text-base flex items-center gap-2">
                  {provider.name}
                  {provider.verified && (
                    <Shield className="w-4 h-4 text-green-600" />
                  )}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'En línea' : 'Desconectado'}
                  {isTyping && ' • escribiendo...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.sender_id === currentUserId
              const showAvatar = !isCurrentUser && (
                index === 0 || 
                messages[index - 1].sender_id !== message.sender_id
              )

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isCurrentUser && (
                    <div className="w-8">
                      {showAvatar && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={provider.avatar} alt={provider.name} />
                          <AvatarFallback className="text-xs">
                            {provider.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${isCurrentUser ? 'order-1' : ''}`}>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${
                      isCurrentUser ? 'text-right' : 'text-left'
                    }`}>
                      {formatMessageTime(message.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback className="text-xs">
                      {provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <Separator />

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button type="button" variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Solicitar cotización
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Programar cita
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}