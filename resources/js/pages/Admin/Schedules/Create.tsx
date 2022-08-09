import { usePage } from '@inertiajs/inertia-react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'
import { CreateScheduleForm } from '@/components/CreateScheduleForm'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'

interface CreatePage {
  room: Room
}

type CreatePageProps = BasePageProps<CreatePage>

const Create: FC = () => {
  const { room } = usePage<CreatePageProps>().props

  return (
    <Container maxWidth='md'>
      <Paper>
        <Stack p={2}>
          <Typography variant='h3' mb={2}>
            Adicionar horário na sala {room.name}
          </Typography>
          <CreateScheduleForm roomId={room.id} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default withDrawer(Create)
