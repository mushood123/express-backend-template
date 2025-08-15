import express from 'express'

import { PORT } from './config/env.js'

const app = express()

app.use('/api/health-check', (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: 'API is running smoothly!'
    }
  })
})

app.listen(PORT || 3001, () => {
  console.log(`Server is running on port ${PORT || 3001}`)
})
