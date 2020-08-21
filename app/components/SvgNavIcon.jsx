import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"

const SvgNavIcon = props => {
	return (
		<Svg width={22} height={90} viewBox="0 0 22 90" fill="none" {...props}>
			<Ellipse cx={11} cy={15.231} rx={5.5} ry={5.538} fill="#2393FB" />
			<Path d="M11.129 26.305v46.388" stroke="#3E4958" />
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.16 85.631a.2.2 0 01-.32 0l-5.79-7.773a.2.2 0 01.16-.32h11.58a.2.2 0 01.16.32l-5.79 7.773z"
				fill="#3E4958"
			/>
		</Svg>
	)
}

export default SvgNavIcon
