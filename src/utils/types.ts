type Event = 'login' | 'logined' | 'connected' | 'be-connected' | 'forward' | 'error'

export interface Message {
  event: Event,
  data?: any
}
