import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import { Room } from '@/interfaces/Room'

interface AutocompleteRoomProps {
  onChange: (room: Room) => void
  disabled?: boolean
}

export const AutocompleteRoom: FC<AutocompleteRoomProps> = ({ onChange, disabled }) => {
  const [options, setOptions] = useState<Room[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (_: unknown, value: string) => {
    setInputValue(value)
  }

  const handleChange = (_: unknown, value: Room | null) => {
    if (value) {
      onChange(value)
    }
  }

  useDebounceEffect(
    async () => {
      if (!inputValue) return

      try {
        const { data } = await axios.get<Room[]>('/rooms', { params: { search: inputValue } })
        setOptions(data)
      } catch (err) {
        // do nothing
      }
    },
    500,
    [inputValue],
  )

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      options={options}
      onInputChange={handleInputChange}
      onChange={handleChange}
      getOptionLabel={({ name }) => name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={props => <TextField {...props} label='Sala' />}
    />
  )
}
