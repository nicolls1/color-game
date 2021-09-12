import { useState } from 'react'

import { Game } from 'types/game'
import { useJoinGameMutation, useCreateGameMutation } from 'hooks/game'
import { Heading, Stack } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'

interface PlayerNameInputProps {
  gameId: string
  game?: Game
  onSetPlayer: (index: number) => void
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({
  gameId,
  game,
  onSetPlayer,
}) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string>()

  const createGameMutation = useCreateGameMutation()
  const joinGameMutation = useJoinGameMutation()

  return (
    <Stack
      direction="column"
      spacing="45px"
      h="100vh"
      p={5}
      justify="center"
      align="center"
    >
      <Heading size="sm">Player Name</Heading>

      <FormControl isInvalid={!!nameError} maxW="400px">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <FormErrorMessage>{nameError}</FormErrorMessage>
      </FormControl>

      <Button
        onClick={async () => {
          if (game === undefined) {
            await createGameMutation.mutateAsync({
              gameId: gameId,
              playerName: name,
            })
            onSetPlayer(0)
          } else {
            console.log(
              'name',
              name,
              game.players.map((player) => player.name)
            )
            if (game.players.map((player) => player.name).includes(name)) {
              setNameError('Name has been taken')
              return
            }
            onSetPlayer(
              await joinGameMutation.mutateAsync({
                game: game as Game,
                playerName: name,
              })
            )
          }
        }}
      >
        Join Game
      </Button>
    </Stack>
  )
}
export default PlayerNameInput
