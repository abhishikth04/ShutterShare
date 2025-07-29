import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function SpacePage() {
  const location = useLocation()
  const { space } = location.state || {}

  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    if (!space || !space.expiresAt) return

    const countdown = setInterval(() => {
      const now = new Date().getTime()
      const expiry = new Date(space.expiresAt).getTime()
      const distance = expiry - now

      if (distance <= 0) {
        clearInterval(countdown)
        setTimeLeft("Expired")
      } else {
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const secs = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft(`${mins}m ${secs}s`)
      }
    }, 1000)

    return () => clearInterval(countdown)
  }, [space])

  if (!space) {
    return <div className="text-center mt-10 text-xl text-red-500">No space data found.</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Space Created!</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p><strong>Title:</strong> {space.name}</p>
        <p><strong>Description:</strong> {space.description}</p>
        <p><strong>Public Code:</strong> <span className="text-blue-600 font-mono">{space.publicCode}</span></p>
        <p><strong>Expires In:</strong> {timeLeft}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">📤 Upload Photos</h2>
        <input type="file" multiple className="block w-full" />
        {/* Upload logic to be added next */}
      </div>
    </div>
  )
}
