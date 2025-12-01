// Common TypeScript type definitions for the application

// Analytics types
export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages?: Array<{ path: string; views: number }>
  deviceTypes?: Record<string, number>
  referrers?: Array<{ source: string; count: number }>
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface AnalyticsEvent {
  event: string
  category?: string
  label?: string
  value?: number
  timestamp: Date
}

// Admin types
export interface ActivityLog {
  id: string
  action: string
  user: string
  timestamp: Date
  details: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
}

// API types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
  details?: Record<string, unknown>
}

// Cache types
export interface CacheOptions {
  ttl?: number
  prefix?: string
  namespace?: string
}

export interface CacheEntry<T = unknown> {
  value: T
  expiresAt: number
  createdAt: number
}

// Monitoring types
export interface MetricData {
  name: string
  value: number
  timestamp: Date
  tags?: Record<string, string>
  unit?: string
}

export interface PerformanceMetric {
  name: string
  duration: number
  startTime: number
  endTime?: number
  metadata?: Record<string, unknown>
}

// Performance types
export interface PerformanceEntry {
  name: string
  duration: number
  startTime: number
  entryType?: string
}

export interface PerformanceObserverCallback {
  (entries: PerformanceEntry[]): void
}

// Webhook types
export interface WebhookPayload {
  event: string
  data: Record<string, unknown>
  timestamp: Date
  signature?: string
}

export interface WebhookConfig {
  url: string
  secret: string
  events: string[]
  enabled: boolean
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
  permissions?: string[]
}

export interface AuthToken {
  token: string
  expiresAt: Date
  refreshToken?: string
}

// Database types
export interface DatabaseConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
  ssl?: boolean
  poolSize?: number
}

export interface QueryResult<T = unknown> {
  rows: T[]
  rowCount: number
  command?: string
}

// SEO types
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

// Error types
export interface ErrorInfo {
  message: string
  stack?: string
  code?: string
  context?: Record<string, unknown>
}

// Utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Generic object types for when we need flexibility
export type GenericObject = Record<string, unknown>
export type StringMap = Record<string, string>
export type NumberMap = Record<string, number>

// Function types
export type AsyncFunction<T = void> = () => Promise<T>
export type Callback<T = void> = (error: Error | null, result?: T) => void
export type EventHandler<T = Event> = (event: T) => void

// Component types (for React components)
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

// Form types
export interface FormField {
  name: string
  value: string | number | boolean
  error?: string
  touched?: boolean
}

export interface FormState {
  fields: Record<string, FormField>
  isSubmitting: boolean
  isValid: boolean
  errors: Record<string, string>
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Filter and Sort types
export interface FilterParams {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'like'
  value: unknown
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

// HTTP types
export interface HttpHeaders {
  [key: string]: string
}

export interface HttpRequestConfig {
  method?: string
  headers?: HttpHeaders
  body?: unknown
  timeout?: number
}

// Storage types
export interface StorageAdapter {
  get<T = unknown>(key: string): T | null
  set<T = unknown>(key: string, value: T): void
  remove(key: string): void
  clear(): void
}

// Logger types
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: Date
  context?: Record<string, unknown>
}

// Configuration types
export interface AppConfig {
  env: 'development' | 'production' | 'test'
  apiUrl: string
  debug: boolean
  features?: Record<string, boolean>
}

// Email types
export interface EmailMessage {
  to: string | string[]
  from: string
  subject: string
  html?: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// File upload types
export interface UploadedFile {
  filename: string
  originalName: string
  mimetype: string
  size: number
  path: string
  url?: string
}

// Rate limit types
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  resetAt: Date
}
