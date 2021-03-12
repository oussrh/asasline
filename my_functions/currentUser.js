const query = require("./query")
const CURRENT_USER = `
query ($email: String!) {
  active(email: $email) {
    name
    email
    _id
    bookings {
      data {
        _id
        point
        price
        date
        from {
          name
        }
        to {
          name
        }
      }
    }
  }
}
`

exports.handler = async e => {
  const { email } = JSON.parse(e.body)
  const { data, errors } = await query(CURRENT_USER, {
    email,
  })

  const totalPoints = data.active.bookings.data
    .map(({ point }) => point)
    .reduce((a, b) => a + b)

  if (errors) {
    console.log(errors)
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ currentUser: { ...data.active, totalPoints } }),
  }
}
