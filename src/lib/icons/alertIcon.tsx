import React from "react"

export default function AlertIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={50}
        width={50}
        viewBox="0 0 50 50"
      >
        <path
          fill="white"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
        />
        <circle cx="12" cy="16" r="1" />
        <path
          fill="white"
          d="M12 7a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z"
        />
      </svg>
    </div>
  )
}
