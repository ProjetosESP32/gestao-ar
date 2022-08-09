/* eslint-disable import/order */
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import luxonPlugin from '@fullcalendar/luxon2'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import React, { FC, useState } from 'react'
import { MdAdd, MdLockClock } from 'react-icons/md'
import { DeleteEventDialog } from '@/components/DeleteEventDialog'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { ExtendTimeDialog } from '@/components/ExtendTimeDialog'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'

interface ShowPage {
  room: Room
  canEdit: boolean
}

type ShowPageProps = BasePageProps<ShowPage>

const Show: FC = () => {
  const {
    palette: { primary },
  } = useTheme()
  const { room, loggedUser, canEdit } = usePage<ShowPageProps>().props
  const [selectedEventId, setSelectedEventId] = useState(0)
  const [isExtendTimeDialogOpen, setIsExtendTimeDialogOpen] = useState(false)

  const selectedEvent = room.events?.find(event => event.id === selectedEventId)

  const events: EventSourceInput =
    room.events?.flatMap(
      ({ id, name, eventRecurrences, startDate, endDate }) =>
        eventRecurrences?.map(({ daysOfMonthArray, daysOfWeekArray, startTime, endTime }) => ({
          id: String(id),
          groupId: name,
          title: name,
          daysOfMonth: daysOfMonthArray.map(day => day - 1),
          daysOfWeek: daysOfWeekArray.map(day => day - 1),
          startTime: DateTime.fromISO(startTime).toFormat('HH:mm'),
          endTime: DateTime.fromISO(endTime).toFormat('HH:mm'),
          startRecur: startDate,
          endRecur: endDate,
        })) ?? [],
    ) ?? []

  const handleClose = () => setSelectedEventId(0)

  return (
    <Container maxWidth='lg'>
      <Paper>
        <Stack p={2}>
          <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
            <Typography variant='h3'>Agenda da sala {room.name}</Typography>
            <Box>
              {canEdit && (
                <Button startIcon={<MdLockClock />} onClick={() => setIsExtendTimeDialogOpen(true)}>
                  Extender funcionamento
                </Button>
              )}
              {!!loggedUser?.isRoot && (
                <Button
                  startIcon={<MdAdd />}
                  onClick={() => Inertia.visit(`/admin/rooms/${room.id}/schedules/create`)}
                  sx={{ marginLeft: 2 }}
                >
                  Adicionar horário
                </Button>
              )}
            </Box>
          </Box>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin, luxonPlugin]}
            allDayText='Dia todo'
            weekText='Semana'
            locale='pt-br'
            dayHeaderFormat='dd'
            businessHours={{ startTime: '7:00', endTime: '22:00' }}
            events={events}
            eventColor={primary.main}
            eventClick={e => !!loggedUser?.isRoot && setSelectedEventId(Number(e.event.id))}
          />
          <DeleteEventDialog
            open={!!selectedEvent}
            onClose={handleClose}
            eventId={selectedEventId}
            eventName={selectedEvent?.name ?? ''}
            roomId={room.id}
          />
          <ExtendTimeDialog
            open={isExtendTimeDialogOpen}
            onClose={() => setIsExtendTimeDialogOpen(false)}
            roomId={room.id}
          />
        </Stack>
      </Paper>
    </Container>
  )
}

export default withDrawer(Show)
