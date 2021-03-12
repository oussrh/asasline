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
        <div className="booking-container">
          <div>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <h5>Bookings</h5>
            <div className="booking-grid">
              {console.log(currentUser.bookings.data)}
              {currentUser.bookings.data.map(
                ({ from, to, price, point, date, _id }) => {
                  return (
                    <div key={_id}>
                      <p>From: {from.name}</p>
                      <p>Date: {date}</p>
                      <p>To: {to.name}</p>
                      <p>Price: {price} €</p>
                      <p>Points: {point}</p>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  )
}

export default Profile
