import query from "./query"

const CREATE_USER = `
mutation {
    createUser(data: {name: "M", email: "a@a.com"}){
      name
      _id
      email
    }
  }
`

exports.handler = async event => {
  const { data, errors } = await query(CREATE_USER, {
    name,
    email,
  })

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
