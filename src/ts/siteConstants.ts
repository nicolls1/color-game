import { COLORS } from 'types/game'

export const ROUTES = {
  home: '/',
  games: '/games/:id',
}

export const MAX_PLAYERS = 4

export const ROUND_TIME = 30

export const COLORS_TO_THEME_KEY: { [key in COLORS]: string } = {
  black: 'black',
  white: 'white',
  gray: 'selectionColors.gray',
  pink: 'selectionColors.pink',
  purple: 'selectionColors.purple',
  orange: 'selectionColors.orange',
  yellow: 'selectionColors.yellow',
  brown: 'selectionColors.brown',
  green: 'selectionColors.green',
  red: 'selectionColors.red',
  blue: 'selectionColors.blue',
}
