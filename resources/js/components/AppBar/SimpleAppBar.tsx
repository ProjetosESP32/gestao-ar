import React, { FC } from 'react'
import { MiniAppBar } from './MiniAppBar'

interface AppBarProps {
  onOpen: () => void
}

export const SimpleAppBar: FC<AppBarProps> = ({ onOpen }) => <MiniAppBar onOpen={onOpen} />
