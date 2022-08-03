import React from "react"
import Svg, { Path } from "react-native-svg"

function GreyArrowIcon(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.828 7l4.95 4.95-1.414 1.414L0 7 6.364.636 7.778 2.05 2.828 7z"
        fill="#AABACD"
      />
    </Svg>
  )
}

export default GreyArrowIcon