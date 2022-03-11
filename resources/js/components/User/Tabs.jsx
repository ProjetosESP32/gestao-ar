import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'

import { styled } from '@mui/system'
import React from 'react'

const SecondaryTab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #5d99c6;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  /* margin: 6px 6px; */
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: blue;
  }

  &:focus {
    color: #fff;
    /* border-radius: 3px;
    outline: 2px solid blue;
    outline-offset: 2px; */
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #90caf9;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const SecondaryTabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`

const SecondaryTabsList = styled(TabsListUnstyled)`
  /* min-width: 320px; */
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`

const MainTab = styled(TabUnstyled)(() => ({
  border: 'none',
  padding: '0.15rem 0.5rem',
  width: '100%',
  color: '#5D99C6',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  backgroundColor: '#F7F7F7',
  boxShadow: '0px 3px 6px #00000002',
  cursor: 'pointer',
  [`&.${tabUnstyledClasses.selected}`]: {
    borderBottom: '2px solid #5D99C6',
  },
  width: 'max-content',
}))

const MainTabList = styled(TabsListUnstyled)(
  () => `
  display: flex;
  padding: 0.75rem 0.25rem;
  width: 100%;

  margin-bottom:0.75rem;]

`,
)
/*
    -webkit-box-shadow: 0px 3px 3px 0px #00000029;
  -moz-box-shadow:    0px 3px 3px 0px #00000029;
  box-shadow:         0px 3px 3px 0px #00000029;
*/

export { SecondaryTab, SecondaryTabPanel, SecondaryTabsList, MainTab, MainTabList }
