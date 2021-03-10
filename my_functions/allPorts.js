const query = require("./query")
const GET_ALL_PORTS = `
query {
    allPorts {
      data {
        _id
        description
      }
    }
  }
`

exports.handler = async () => {
  const { data, errors } = await query(GET_ALL_PORTS)
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ports: data.allPorts.data }),
  }
}
