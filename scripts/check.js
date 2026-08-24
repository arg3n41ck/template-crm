const ispnpm = process.env.npm_config_user_agent?.includes('pnpm')

if (!ispnpm) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    'Error: This project requires pnpm as the package manager.',
  )
  console.error('\x1b[33m%s\x1b[0m', 'Please install pnpm and try again:')
  process.exit(1)
}
