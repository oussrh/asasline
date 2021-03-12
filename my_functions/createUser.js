const query = require("./query")

exports.handler = async e => {
  const { name, email } = JSON.parse(e.body)
  const { data, errors } = await query(
    `
    mutation($data: UserInput!) {
        createUser(data: $data) {
          name
          _id
          email
        }
      }
  `,
    { data: { name: name, email: email } }
  )

  if (errors) {
    console.log(errors)
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
