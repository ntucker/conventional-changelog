export const DEFAULT_COMMIT_TYPES = Object.freeze([
    { type: 'feat', section: '🚀 Features' },
    { type: 'enhance', section: '💅 Enhancement' },
    { type: 'fix', section: '🐛 Bug Fix' },
    { type: 'pkg', section: '📦 Package' },
    { type: 'internal', section: '🏠 Internal', hidden: true },
    { type: 'docs', section: '📝 Documentation' }
].map(Object.freeze))
