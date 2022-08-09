import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
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

const data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
]

interface ScheduleMonthSelectProps {
  id: string
  label: string
  values: number[]
  onChange: (value: number[]) => void
}

export const ScheduleMonthSelect: FC<ScheduleMonthSelectProps> = ({ id, label, values, onChange }) => {
  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const {
      target: { value },
    } = event
    onChange((typeof value === 'string' ? value.split(',') : value).map(Number))
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput label={label} sx={{ borderRadius: 2 }} />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {data.map(item => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={values.includes(item)} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
