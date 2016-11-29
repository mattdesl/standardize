const optsFromArgv = (
  {
    'shareable-config': shareableConfig,
    silent,
    snazzy
  }
) => (
  {
    shareableConfig,
    verbose: !silent,
    snazzy
  }
)

module.exports = optsFromArgv
