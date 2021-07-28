import { useState } from 'react'
import randomWords from 'random-words'

import { Heading, Stack, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/input'
import { generatePath, useHistory } from 'react-router'
import { ROUTES } from 'ts/siteConstants'
import { useClipboard } from '@chakra-ui/hooks'

interface Props {
  currentPage: string
}

const Home: React.FC<Props> = ({ currentPage }) => {
  const history = useHistory()
  const [roomName, setRoomName] = useState(`${randomWords()}-${randomWords()}`)
  const { hasCopied, onCopy } = useClipboard(`${currentPage}games/${roomName}`)
  return (
    <>
      <Stack
        direction="column"
        p={5}
        justify="center"
        align="center"
        h="50vh"
        spacing={5}
      >
        <Heading size="lg">The Color Game</Heading>
        <InputGroup maxW="xl">
          <InputLeftAddon children={`${currentPage}games/`} />
          <Input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={onCopy}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          onClick={() =>
            history.push(generatePath(ROUTES.games, { id: roomName }))
          }
        >
          Start
        </Button>
      </Stack>
      <Stack
        direction="column"
        p={5}
        justify="center"
        align="center"
        spacing={5}
      >
        <Heading size="md">How to Play</Heading>
        <Text maxW="xl">
          Create a room and share it. Up to 4 people can join a room. Once
          everyone has joined, start the game. Complete the prompts with the
          correct color(s) to win. Points are given out for every player that
          guesses incorrectly so if everyone answers correctly no points are
          given. For 2 players, the first to 10 wins and for 3-4 players the
          first to 15 wins. Have fun!
        </Text>
      </Stack>
    </>
  )
}
export default Home
