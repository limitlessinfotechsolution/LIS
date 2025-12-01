/**
 * OAuth Integration Library
 * Supports Google, GitHub, LinkedIn authentication
 */

export interface OAuthProvider {
  id: string
  name: string
  authUrl: string
  tokenUrl: string
  userInfoUrl: string
  scope: string[]
  clientId: string
  clientSecret: string
}

export interface OAuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  provider: string
}

/**
 * OAuth Providers Configuration
 */
export const OAuthProviders: Record<string, Omit<OAuthProvider, 'clientId' | 'clientSecret'>> = {
  google: {
    id: 'google',
    name: 'Google',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: ['openid', 'email', 'profile']
  },
  github: {
    id: 'github',
    name: 'GitHub',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
    scope: ['read:user', 'user:email']
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoUrl: 'https://api.linkedin.com/v2/me',
    scope: ['r_liteprofile', 'r_emailaddress']
  }
}

/**
 * Generate OAuth authorization URL
 */
export function getAuthorizationUrl(
  provider: string,
  redirectUri: string,
  state: string
): string {
  const config = OAuthProviders[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`]
  if (!clientId) {
    throw new Error(`Missing client ID for ${provider}`)
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.scope.join(' '),
    state
  })

  return `${config.authUrl}?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  provider: string,
  code: string,
  redirectUri: string
): Promise<string> {
  const config = OAuthProviders[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`]
  const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`]

  if (!clientId || !clientSecret) {
    throw new Error(`Missing OAuth credentials for ${provider}`)
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  })

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: params.toString()
  })

  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

/**
 * Get user information from OAuth provider
 */
export async function getUserInfo(
  provider: string,
  accessToken: string
): Promise<OAuthUser> {
  const config = OAuthProviders[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  const response = await fetch(config.userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to get user info: ${response.statusText}`)
  }

  const data = await response.json()

  // Normalize user data across providers
  switch (provider) {
    case 'google':
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.picture,
        provider: 'google'
      }
    
    case 'github':
      return {
        id: data.id.toString(),
        email: data.email,
        name: data.name || data.login,
        avatar: data.avatar_url,
        provider: 'github'
      }
    
    case 'linkedin':
      return {
        id: data.id,
        email: data.emailAddress,
        name: `${data.firstName} ${data.lastName}`,
        avatar: data.profilePicture?.displayImage,
        provider: 'linkedin'
      }
    
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}

/**
 * Generate random state for CSRF protection
 */
export function generateState(): string {
  return crypto.randomUUID()
}

/**
 * Verify state to prevent CSRF attacks
 */
export function verifyState(state: string, expectedState: string): boolean {
  return state === expectedState
}
