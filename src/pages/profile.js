import React, { useEffect, useState } from "react"
import axios from "axios"
import Layout from "../components/layout"
import { useIdentityContext } from "react-netlify-identity-widget"
import { Link } from "gatsby-plugin-intl"
import "../style/style.css"

const Profile = () => {
  const identity = useIdentityContext()
  const [status, setStatus] = useState("loading...")
  const [currentUser, setCurrentUser] = useState(null)
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

  useEffect(() => {
    if (status !== "loading...") return
    axios.post("/api/currentUser", { email }).then(result => {
      if (result.status !== 200) {
        console.error("Error loading Profile")
        console.error(result)
        return
      }
      setCurrentUser(result.data.currentUser)
      setStatus("loaded")
    })
  }, [status, email])

  return (
    currentUser && (
      <Layout>
        <div className="profile-container">
          <div>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <h5>Total Points: {currentUser.totalPoints}</h5>
            <Link to="/bookings">Your Bookings</Link>
          </div>
        </div>
      </Layout>
    )
  )
}

export default Profile
