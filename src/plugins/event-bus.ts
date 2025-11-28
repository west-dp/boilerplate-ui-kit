import mitt from 'mitt'
import type { BussEvent } from '../models/buss-event'

const eventBus = mitt<BussEvent>()

export default eventBus
export { eventBus as EventBus }

