const query = require("./query")

exports.handler = async e => {
  //   const { name, email } = JSON.parse(e.body)
  console.log(JSON.parse(e.body))
  const price = 400
  const { data, errors } = await query(
    `
    mutation($data: BookingInput!) {
        createBooking(data: $data) {
            _id
            point
            price
            user {
              name
            }
            from
            to
        }
      }
  `
    // { data: {
    //     date,
    //     user: {
    //       connect: user.id
    //     },
    //     to: {
    //       connect: arrival.id
    //     },
    //     from: {
    //       connect: port.id
    //     },
    // price: price
    //     point: point
    //   } }
  )

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ user: data.createUser }),
  }
}
