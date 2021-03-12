import React, { useEffect, useState } from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"
import Layout from "../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import { navigate } from "gatsby"
// import Modal from "react-bootstrap/Modal"
const axios = require("axios")

const Login = () => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = useState(false)

  const email =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.email) ||
    "Untitled"
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "Untitled"
  const isLoggedIn = identity && identity.isLoggedIn

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile")
    }
  })
  useEffect(() => {
    handleCreateUser(name, email)
  }, [name, email, isLoggedIn])

  const handleCreateUser = async (name, email) => {
    await axios.post("/api/createUser", { name, email })
  }

  return (
    // <Layout>
    <div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />
      {identity && identity.isLoggedIn ? (
        <div className="auth-btn-grp">
          <Button
            variant="outline-primary"
            className="login-btn"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn
              ? `Hello ${name} first ${email}, Log out here!`
              : "LOG IN"}
          </Button>
        </div>
      ) : (
        <div className="auth-btn-grp">
          <Button
            variant="outline-primary"
            className="login-btn"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn ? `Hello ${name} Log out here!` : "LOG IN"}
          </Button>
        </div>
      )}
    </div>
    // </Layout>
  )
}

export default Login
