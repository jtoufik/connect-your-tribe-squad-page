import express from 'express'

const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squad-a-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('index', data)
  })
})

// // Tijdelijke fake data
// const skill = ['Enthusiast', 'Mash-up Artist', 'Inventor', 'Wizard'];
// data.squad.members.forEach(function(member) {
//   if (!member.skill) {
//     // Pak een random skill en zet deze in de member
//     member.skill = skill[Math.floor(Math.random() * skill.length)]
//   }
// })

// app.get('/', function (req, res) {

//   // deep copy 
//   // fuld way 
//   // const filtered = JSON.parse(JSON.stringify(data))
//   const filtered = structuredClone(data)

//   if (req.query.skill) {
//     filtered.squad.members = filtered.squad.members.filter((member) => member.skill == req.query.skills)
//   }
//   res.render('index', filtered)
// })


// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

