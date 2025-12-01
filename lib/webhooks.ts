/**
 * Webhook System
 * Manage webhook subscriptions and deliveries
 */

import crypto from 'crypto'

export interface Webhook {
  id: string
  url: string
  events: string[]
  secret: string
  active: boolean
  createdAt: Date
}

export interface WebhookDelivery {
  id: string
  webhookId: string
  event: string
  payload: Record<string, unknown>
  status: 'pending' | 'success' | 'failed'
  attempts: number
  lastAttempt?: Date
  response?: {
    status?: number
    statusText?: string
    error?: string
  }
}

/**
 * Generate webhook secret
 */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Sign webhook payload
 */
export function signWebhookPayload(payload: Record<string, unknown>, secret: string): string {
  const data = JSON.stringify(payload)
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex')
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: Record<string, unknown>,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = signWebhookPayload(payload, secret)
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

/**
 * Deliver webhook
 */
export async function deliverWebhook(
  webhook: Webhook,
  event: string,
  payload: Record<string, unknown>
): Promise<WebhookDelivery> {
  const delivery: WebhookDelivery = {
    id: crypto.randomUUID(),
    webhookId: webhook.id,
    event,
    payload,
    status: 'pending',
    attempts: 0
  }

  try {
    const signature = signWebhookPayload(payload, webhook.secret)
    
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': event,
        'X-Webhook-ID': delivery.id
      },
      body: JSON.stringify(payload)
    })

    delivery.attempts++
    delivery.lastAttempt = new Date()
    delivery.status = response.ok ? 'success' : 'failed'
    delivery.response = {
      status: response.status,
      statusText: response.statusText
    }
  } catch (error) {
    delivery.attempts++
    delivery.lastAttempt = new Date()
    delivery.status = 'failed'
    delivery.response = { error: String(error) }
  }

  return delivery
}

/**
 * Retry failed webhook
 */
export async function retryWebhook(
  webhook: Webhook,
  delivery: WebhookDelivery
): Promise<WebhookDelivery> {
  if (delivery.attempts >= 5) {
    throw new Error('Maximum retry attempts reached')
  }

  return deliverWebhook(webhook, delivery.event, delivery.payload)
}

/**
 * Webhook event types
 */
export const WEBHOOK_EVENTS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  BOOKING_CREATED: 'booking.created',
  BOOKING_UPDATED: 'booking.updated',
  BOOKING_CANCELLED: 'booking.cancelled',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  CONTACT_FORM: 'contact.form_submitted'
} as const
