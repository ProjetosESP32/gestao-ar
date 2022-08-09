import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { FC } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const data = [1, 2, 3, 4, 5, 6, 7]

const getWeekNameByIndex = (index: number) =>
  ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'][index - 1]

interface ScheduleWeekSelectProps {
  id: string
  label: string
  values: number[]
  onChange: (value: number[]) => void
}

export const ScheduleWeekSelect: FC<ScheduleWeekSelectProps> = ({ id, label, values, onChange }) => {
  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event
    onChange((typeof value === 'string' ? value.split(',') : value).map(Number))
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label'`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label'`}
        id={id}
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput id={`${id}-chip`} label={label} sx={{ borderRadius: 2 }} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={getWeekNameByIndex(value)} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {data.map(item => (
          <MenuItem key={item} value={item}>
            {getWeekNameByIndex(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
