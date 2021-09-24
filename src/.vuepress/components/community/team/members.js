import { shuffle } from 'lodash'

const members = [
  {
    name: 'Michael Darko-Duodu',
    city: 'Accra, Ghana',
    languages: ['en'],
    github: 'mychidarko',
    twitter: 'mychidarko',
    work: {
      role: 'Creator',
      org: 'Leaf PHP',
    },
    reposOfficial: ['leafsphp/*'],
  },
].concat(
  shuffle([
    //
  ])
)

export default members
