import mitt from 'mitt'
import type { BussEvent } from '../models/buss-event'

export default mitt<BussEvent>()

