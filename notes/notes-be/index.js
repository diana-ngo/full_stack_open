// Module purpose:
//  Import actual application
//  Start the application and indicate that it's running

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${config.PORT}`),
)
