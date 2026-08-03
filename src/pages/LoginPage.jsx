import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import styles from "../styles/LoginPage.module.css"
import "bootstrap/dist/css/bootstrap.min.css"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { currentUser, signInWithEmail } = useAuth()

  useEffect(() => {
    if (currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmail(email, password)
      toast.success("Login successful!")
      navigate("/")
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Invalid password. Please try again.")
      } else {
        toast.error("Login failed. Please check your credentials.")
      }
    }
  }

  return (
    <div className={styles.container} style={{ backgroundColor: "#198754" }}>
      <div className={styles.form}>
        <div className={styles.formContent}>
          <header className={styles.header}>Login</header>
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </i>
            </div>

            <div className={styles.formLink}>
              <a href="#" className={styles.forgotPass}>
                Forgot password?
              </a>
            </div>

            <div className={styles.field}>
              <button type="submit" style={{ backgroundColor: "#198754" }}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  )
}
export default LoginPage