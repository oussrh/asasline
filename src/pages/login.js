import React, { useState } from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

const Login = () => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = useState(false)
  const email =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.email) ||
    "Untitled"
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "Untitled"
  const isLoggedIn = identity && identity.isLoggedIn

  const handleCreateUser = async (name, email) => {
    await axios.post("/api/createUser", { name, email })
  }

  return (
    <div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />

      {identity && identity.isLoggedIn ? (
        <div className="auth-btn-grp">
          <p>User is In </p>{" "}
          <Button
            variant="outline-primary"
            className="login-btn"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn
              ? `Hello ${name}, Log out here!` && handleCreateUser(name, email)
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
            {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Login
