const request = require('superagent')

const pause = require('./utils/pause')

const {
  sourceAPI,
  destinationAPI,
  userAgent,
  accessToken,
  defaultLabels
} = require('./config')

getLabels()
  .then(removeDefaultLabels)
  .then(mapProperties)
  .then(pushLabels)
  .catch(console.error)

function getLabels () {
  return request.get(sourceAPI + '/labels')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .accept('application/vnd.github.symmetra-preview+json')
    .then(res => res.body)
    .catch(console.error)
}

function removeDefaultLabels (labels) {
  return labels.filter(label => !defaultLabels.includes(label.name))
}

function mapProperties (labels) {
  return labels.map(label => ({
    name: label.name,
    color: label.color,
    description: label.description
  }))
}

async function pushLabels (labels) {
  for (const label of labels) {
    await pause(500)
    pushLabel(label)
  }
}

function pushLabel (label) {
  console.log(`Pushing label:\t${label.name}`)

  return request.post(destinationAPI + '/labels')
    .set('User-Agent', userAgent)
    .set('Authorization', `token ${accessToken}`)
    .send(label)
    .catch(console.error)
}
