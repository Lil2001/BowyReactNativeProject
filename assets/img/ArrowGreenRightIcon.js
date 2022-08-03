import React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function ArrowGreenIcon(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.329 6.574l-9.63-4.815c-6.47-3.24-9.124-.585-5.884 5.883L2.794 9.6a2.05 2.05 0 010 1.811l-.98 1.947c-3.24 6.468-.595 9.123 5.885 5.883l9.63-4.815c4.32-2.16 4.32-5.692 0-7.852zm-3.634 4.77H7.62a.85.85 0 01-.844-.844.85.85 0 01.844-.844h6.075a.85.85 0 01.844.844.85.85 0 01-.844.844z"
        fill="url(#paint0_linear_3132_28)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3132_28"
          x1={0.430664}
          y1={0.376465}
          x2={22.0699}
          y2={2.13343}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#34BE7C" />
          <Stop offset={1} stopColor="#2EB6A5" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default ArrowGreenIcon