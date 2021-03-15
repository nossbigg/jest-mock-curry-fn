const huskyConfig = {
  hooks: {
    'pre-commit': 'yarn lint',
    'pre-push': 'yarn test:once',
  },
}

module.exports = huskyConfig
