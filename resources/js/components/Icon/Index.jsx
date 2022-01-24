import PropTypes from 'prop-types'
import React from 'react'
import './styles.css'

/**
 * @param {{ name: any; }} props
 */
export default function Icon(props) {
  const Name = props.name
  return <Name className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root'></Name>
}

Icon.propTypes = {
  name: PropTypes.any,
}
