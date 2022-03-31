import * as PropTypes from 'prop-types'
import React from 'react'
import './styles.css'

export default function Icon({ name: Name, ...rest }) {
  return <Name className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root' {...rest} />
}

Icon.propTypes = {
  name: PropTypes.elementType.isRequired,
}
