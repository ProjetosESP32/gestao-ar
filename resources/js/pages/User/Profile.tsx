import { useRemember } from '@inertiajs/inertia-react'
import { Container, Tab, Tabs, Typography } from '@mui/material'
import React, { FC } from 'react'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { ProfilePassword } from '@/components/ProfilePassword'
import { ProfileRooms } from '@/components/ProfileRooms'
import { TabPanel } from '@/components/TabPanel'
import { UserProfile } from '@/components/UserProfile'

const Profile: FC = () => {
  const [tabState, setTabState] = useRemember(0, 'tabPanel')

  const handleChangeTab = (_: unknown, tabPage: number) => {
    setTabState(tabPage)
  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h2'>Conta</Typography>
      <Tabs value={tabState} onChange={handleChangeTab}>
        <Tab label='Você' />
        <Tab label='Segurança' />
        <Tab label='Salas' />
      </Tabs>
      <TabPanel panelNumber={0} selectedPanel={tabState} preRender>
        <UserProfile />
      </TabPanel>
      <TabPanel panelNumber={1} selectedPanel={tabState} preRender>
        <ProfilePassword />
      </TabPanel>
      <TabPanel panelNumber={2} selectedPanel={tabState}>
        <ProfileRooms />
      </TabPanel>
    </Container>
  )
}

export default withDrawer(Profile)
