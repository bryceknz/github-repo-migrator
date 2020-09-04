require('dotenv').config()

const repo = ''     // Replace as required
const oldOrg = ''   // Replace as required
const newOrg = ''   // Replace as required
const baseAPI = 'https://api.github.com/repos'
const defaultLabels = [
  'bug',
  'documentation',
  'duplicate',
  'enhancement',
  'good first issue',
  'help wanted',
  'invalid',
  'question',
  'wontfix'
]

module.exports = {
  repo: repo,
  newOrg: newOrg,
  oldOrg: oldOrg,
  userAgent: '',    // Replace as required
  accessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  baseAPI: baseAPI,
  sourceAPI: `${baseAPI}/${oldOrg}/${repo}`,
  destinationAPI: `${baseAPI}/${newOrg}/${repo}`,
  defaultLabels
}
