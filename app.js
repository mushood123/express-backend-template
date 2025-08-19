import express from 'express'

import { PORT } from './config/env.js'
import { HTTP_STATUS_CODES, MESSAGES, STATUS } from './constants/index.js'

const app = express()

app.use('/api/health', (req, res) => {
  res.status(HTTP_STATUS_CODES.OK).json({
    status: STATUS.SUCCESS,
    message: MESSAGES.HEALTH_CHECK
  })
})

app.listen(PORT || 3001, () => {
  console.log(`Server is running on port ${PORT || 3001}`)
})
