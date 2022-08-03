import React from "react"
import Svg, { Path } from "react-native-svg"

function AddFilesIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27c5.46 0 8.715-3.255 8.715-8.715V8.715C30 3.255 26.745 0 21.285 0zM24 16.125h-7.875V24c0 .615-.51 1.125-1.125 1.125s-1.125-.51-1.125-1.125v-7.875H6c-.615 0-1.125-.51-1.125-1.125s.51-1.125 1.125-1.125h7.875V6c0-.615.51-1.125 1.125-1.125s1.125.51 1.125 1.125v7.875H24c.615 0 1.125.51 1.125 1.125s-.51 1.125-1.125 1.125z"
        fill="#AABACD"
      />
    </Svg>
  )
}

export default  AddFilesIcon