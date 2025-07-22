export interface Service {
  id: string
  title: string
  description: string
  category: string
  price: number
  rating: number
  reviews: number
  provider: ServiceProvider
  images: string[]
  availability: string[]
  location: string
  created_at: string
  updated_at: string
}

export interface ServiceProvider {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  verified: boolean
  description: string
  services_count: number
  location: string
  joined_date: string
}

export interface ServiceCategory {
  id: string
  name: string
  icon: string
  description: string
  service_count: number
}

export interface ServiceBooking {
  id: string
  service_id: string
  user_id: string
  provider_id: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_date: string
  notes: string
  total_amount: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  business_name?: string
  phone?: string
  location?: string
  created_at: string
}

export interface Quote {
  id: string
  service_id: string
  user_id: string
  provider_id: string
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired'
  description: string
  estimated_price?: number
  estimated_duration?: string
  valid_until?: string
  notes?: string
  preferred_date?: string
  address?: string
  contact_phone?: string
  special_instructions?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  service_id: string
  quote_id?: string
  user_id: string
  provider_id: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_date: string
  scheduled_time: string
  duration_hours: number
  total_amount: number
  special_instructions?: string
  address: string
  contact_phone?: string
  created_at: string
  updated_at: string
}

export interface DetailedServiceProvider extends ServiceProvider {
  business_name: string
  specialties: string[]
  experience_years: number
  certifications: string[]
  insurance_info?: string
  service_areas: string[]
  availability_schedule: {
    [key: string]: { start: string; end: string; available: boolean }
  }
  portfolio_images: string[]
  contact_email: string
  contact_phone: string
  website_url?: string
  social_media?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  message_type: 'text' | 'image' | 'file' | 'quote' | 'booking'
  content: string
  metadata?: any
  read_at?: string
  created_at: string
}

export interface Conversation {
  id: string
  participants: string[]
  last_message_id?: string
  last_message_at?: string
  created_at: string
  updated_at: string
}