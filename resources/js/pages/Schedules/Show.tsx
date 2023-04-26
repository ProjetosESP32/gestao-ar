import { DeleteEventDialog } from '@/components/DeleteEventDialog'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { ExtendTimeDialog } from '@/components/ExtendTimeDialog'
import { ScheduleRepeat } from '@/enums/ScheduleRepeat'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'
import interactionPlugin from '@fullcalendar/interaction'
import luxon2Plugin from '@fullcalendar/luxon2'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { DateTime, Interval } from 'luxon'
import React, { FC, useMemo, useState } from 'react'
import { MdAdd, MdLockClock } from 'react-icons/md'

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
  const [selectedScheduleId, setSelectedScheduleId] = useState(0)
  const [isExtendTimeDialogOpen, setIsExtendTimeDialogOpen] = useState(false)

  const selectedSchedule = room.schedules?.find(schedule => schedule.id === selectedScheduleId)

  const events = useMemo(
    () =>
      room.schedules?.map(
        ({
          id,
          name,
          activeUntil,
          scheduleDate,
          isAllDay,
          startTime,
          endTime,
          daysOfMonth,
          daysOfWeek,
          repeat,
          repeatInterval,
          exceptions,
          timezone,
        }) => {
          const base = {
            id: String(id),
            groupId: `${name}-${id}`,
            title: name,
            allDay: !!isAllDay,
            backgroundColor: primary.main,
          }

          if (repeat === ScheduleRepeat.ONCE) {
            return {
              ...base,
              start: DateTime.fromFormat(
                `${scheduleDate} ${startTime} ${timezone}`,
                'yyyy-MM-dd HH:mm:ss z',
              ).toJSDate(),
              end: DateTime.fromFormat(`${scheduleDate} ${endTime} ${timezone}`, 'yyyy-MM-dd HH:mm:ss z').toJSDate(),
            }
          }

          const duration = !isAllDay
            ? Interval.fromDateTimes(
                DateTime.fromFormat(startTime!, 'HH:mm:ss'),
                DateTime.fromFormat(endTime!, 'HH:mm:ss'),
              )
                .toDuration()
                .toFormat('hh:mm')
            : null
          const dtstart = !isAllDay
            ? DateTime.fromFormat(`${scheduleDate} ${startTime} ${timezone}`, 'yyyy-MM-dd HH:mm:ss z').toJSDate()
            : DateTime.fromFormat(`${scheduleDate} 00:00:00 ${timezone}`, 'yyyy-MM-dd HH:mm:ss z').toJSDate()

          return {
            ...base,
            rrule: {
              freq: repeat,
              dtstart,
              interval: repeatInterval,
              until: DateTime.fromISO(activeUntil).toJSDate(),
              bymonthday: daysOfMonth,
              byweekday: daysOfWeek?.map(day => day - 1),
            },
            exdate: exceptions?.map(({ exceptionDate }) => exceptionDate),
            duration,
          }
        },
      ) ?? [],
    [primary.main, room.schedules],
  )

  const handleClose = () => setSelectedScheduleId(0)

  return (
    <Container maxWidth='lg'>
      <Paper>
        <Stack p={2}>
          <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
            <Typography variant='h3'>Agenda da sala {room.name}</Typography>
            <Box>
              {canEdit && (
                <Button startIcon={<MdLockClock />} onClick={() => setIsExtendTimeDialogOpen(true)}>
                  Estender funcionamento
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
            plugins={[timeGridPlugin, interactionPlugin, luxon2Plugin, rrulePlugin]}
            allDayText='Dia todo'
            weekText='Semana'
            locale='pt-br'
            dayHeaderFormat='dd'
            businessHours={{ startTime: '6:00', endTime: '23:00' }}
            events={events}
            eventColor={primary.main}
            eventClick={e => !!loggedUser?.isRoot && setSelectedScheduleId(Number(e.event.id))}
          />
          <DeleteEventDialog
            open={!!selectedSchedule}
            onClose={handleClose}
            eventId={selectedScheduleId}
            eventName={selectedSchedule?.name ?? ''}
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
