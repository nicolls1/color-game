import { useState } from 'react'

import { Game } from 'types/Game'
import { useJoinGameMutation, useCreateGameMutation } from 'hooks/Game'
import { Heading, Stack } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

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

  const createGameMutation = useCreateGameMutation()
  const joinGameMutation = useJoinGameMutation()

  return (
    <Stack direction="column" h="100vh" m={5} justify="center" align="center">
      <Heading size="md">Player Name</Heading>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxW="400px"
      />
      <Button
        onClick={async () => {
          if (game === undefined) {
            await createGameMutation.mutateAsync({
              gameId: gameId,
              playerName: name,
            })
            onSetPlayer(0)
          } else {
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
