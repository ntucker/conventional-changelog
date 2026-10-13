import {
  describe,
  it,
  expect
} from 'vitest'
import { writeChangelogString } from 'conventional-changelog-writer'
import createPreset from '../src/index.js'

function commit(type, subject, notes = []) {
  return {
    hash: '9b1aff905b638aa274a5fc8f88662df446d374bd',
    header: `${type}: ${subject}`,
    type,
    scope: null,
    subject,
    body: null,
    footer: null,
    notes,
    references: [],
    mentions: [],
    revert: null
  }
}

const context = {
  version: '1.0.0',
  host: 'https://github.com',
  owner: 'ntucker',
  repository: 'anansi',
  linkReferences: true,
  commit: 'commit',
  issue: 'issues',
  date: '2026-10-13'
}

describe('conventional-changelog-anansi', () => {
  it('should render anansi sections without escaping markdown', async () => {
    const { writer } = createPreset()
    const changelog = await writeChangelogString([
      commit('feat', 'add a feature'),
      commit('enhance', 'improve something'),
      commit('fix', 'fix a bug'),
      commit('pkg', 'Update `ora` to v9', [{
        title: 'BREAKING CHANGE',
        text: 'requires Node `>=22`'
      }]),
      commit('internal', 'refactor internals'),
      commit('docs', 'document it')
    ], context, writer)

    expect(changelog).toContain('### ⚠ 💥 BREAKING CHANGES\n\n* requires Node `>=22`')
    expect(changelog).toContain('### 🚀 Features')
    expect(changelog).toContain('### 💅 Enhancement')
    expect(changelog).toContain('### 🐛 Bug Fix')
    expect(changelog).toContain('### 📦 Package\n\n* Update `ora` to v9')
    expect(changelog).toContain('### 📝 Documentation')
    expect(changelog).not.toContain('refactor internals')
    expect(changelog).not.toContain('&#x60;')
  })

  it('should bump by anansi types', () => {
    const { whatBump } = createPreset()

    expect(whatBump([commit('internal', 'x')])).toBeNull()
    expect(whatBump([commit('pkg', 'x')]).level).toBe(2)
    expect(whatBump([commit('enhance', 'x'), commit('feat', 'x')]).level).toBe(1)
    expect(whatBump([commit('pkg', 'x', [{
      title: 'BREAKING CHANGE',
      text: 'x'
    }])]).level).toBe(0)
  })
})
