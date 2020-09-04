const request = require('superagent')

const pause = require('./utils/pause')

const {
  sourceAPI,
  destinationAPI,
  userAgent,
  accessToken
} = require('./config')

getMilestones()
  .then(mapProperties)
  .then(pushMilestones)
  .catch(console.error)

function getMilestones () {
  return request.get(sourceAPI + '/milestones')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .accept('application/vnd.github.symmetra-preview+json')
    .then(res => res.body)
    .catch(console.error)
}

function mapProperties (milestones) {
  return milestones.map(milestone => ({
    title: milestone.title,
    state: 'open',
    description: milestone.description
  }))
}

async function pushMilestones (milestones) {
  for (const milestone of milestones) {
    await pause(500)
    pushMilestone(milestone)
  }
}

function pushMilestone (milestone) {
  console.log(`Pushing milestone:\t${milestone.title}`)

  return request.post(destinationAPI + '/milestones')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .send(milestone)
    .catch(console.error)
}
