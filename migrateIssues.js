const request = require('superagent')

const pause = require('./utils/pause')

const {
  oldOrg,
  newOrg,
  sourceAPI,
  destinationAPI,
  userAgent,
  accessToken
} = require('./config')

getAllIssues()
  .then(removePullRequests)
  .then(mapProperties)
  .then(trimLabelDetails)
  .then(updateGitHubOrg)
  .then(pushIssues)
  .catch(console.error)

async function getAllIssues () {
  const issues = [ ]
  let currentPage = 1
  let currentPageOfIssues = [ ]

  do {
    currentPageOfIssues = await getPageOfIssues(currentPage)
    issues.push(...currentPageOfIssues)
    currentPage++
  } while (currentPageOfIssues.length !== 0)

  return issues
}

async function getPageOfIssues (page) {
  return request.get(sourceAPI + '/issues')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .query({ state: 'all' })
    .query({ per_page: '100' })
    .query({ page: page })
    .query({ sort: 'created' })
    .query({ direction: 'asc' })
    .then(res => res.body)
    .catch(console.error)
}

function removePullRequests (issues) {
  return issues.filter(issue => !('pull_request' in issue))
}

function mapProperties (issues) {
  return issues.map(issue => ({
    title: issue.title,
    body: issue.body,
    labels: issue.labels,
    milestone: issue.milestone.number
  }))
}

function trimLabelDetails (issues) {
  issues.forEach(issue => {
    issue.labels = issue.labels.map(label => label.name)
  })
  return issues
}

function updateGitHubOrg (data) {
  let json = JSON.stringify(data)
  json = json.replace(new RegExp(oldOrg, 'g'), newOrg)
  data = JSON.parse(json)
  return data
}

async function pushIssues (issues) {
  for (const [index, issue] of issues.entries()) {
    await pause(1000)
    pushIssue(index, issue)
  }
}

function pushIssue (index, issue) {
  console.log(`Pushing issue ${index}:\t${issue.title}`)

  request.post(destinationAPI + '/issues')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .send(issue)
    .catch(console.error)
}
