/**
 * Push Notifications System
 * Supports Web Push API and service worker notifications
 */

export interface PushSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  data?: Record<string, unknown>
  actions?: Array<{
    action: string
    title: string
    icon?: string
  }>
  tag?: string
  requireInteraction?: boolean
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    throw new Error('Notifications not supported')
  }
  
  return await Notification.requestPermission()
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications not supported')
    return null
  }
  
  try {
    const registration = await navigator.serviceWorker.ready
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription()
    
    if (!subscription) {
      // Subscribe
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        throw new Error('VAPID public key not configured')
      }
      
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource
      })
    }
    
    return subscription.toJSON() as PushSubscription
  } catch (error) {
    console.error('Failed to subscribe to push:', error)
    return null
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    
    if (subscription) {
      await subscription.unsubscribe()
      return true
    }
    
    return false
  } catch (error) {
    console.error('Failed to unsubscribe:', error)
    return false
  }
}

/**
 * Show local notification
 */
export async function showNotification(payload: NotificationPayload): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    // Fallback to browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon,
        badge: payload.badge,
        data: payload.data,
        tag: payload.tag,
        requireInteraction: payload.requireInteraction
      } as NotificationOptions)
    }
    return
  }
  
  try {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/icon-72x72.png',
      data: payload.data,
      actions: payload.actions,
      tag: payload.tag,
      requireInteraction: payload.requireInteraction,
      vibrate: [200, 100, 200]
    } as NotificationOptions)
  } catch (error) {
    console.error('Failed to show notification:', error)
  }
}

/**
 * Send push notification to server
 */
export async function sendPushNotification(
  subscription: PushSubscription,
  payload: NotificationPayload
): Promise<boolean> {
  try {
    const response = await fetch('/api/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription, payload })
    })
    
    return response.ok
  } catch (error) {
    console.error('Failed to send push notification:', error)
    return false
  }
}

/**
 * Get notification preferences
 */
export function getNotificationPreferences(): {
  enabled: boolean
  types: string[]
} {
  const stored = localStorage.getItem('notificationPreferences')
  return stored ? JSON.parse(stored) : {
    enabled: true,
    types: ['all']
  }
}

/**
 * Save notification preferences
 */
export function saveNotificationPreferences(preferences: {
  enabled: boolean
  types: string[]
}): void {
  localStorage.setItem('notificationPreferences', JSON.stringify(preferences))
}

/**
 * Helper: Convert VAPID key
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  
  return outputArray
}
