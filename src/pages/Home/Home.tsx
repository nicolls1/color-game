import { useState } from 'react'
import randomWords from 'random-words'

import { Heading, Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { generatePath, useHistory } from 'react-router'
import { ROUTES } from 'siteConstants'

const Home: React.FC = () => {
  const history = useHistory()
  const [roomName, setRoomName] = useState(`${randomWords()}-${randomWords()}`)
  return (
    <Stack
      direction="column"
      p={5}
      justify="center"
      align="center"
      h="100vh"
      spacing={5}
    >
      <Heading size="lg">The Color Game</Heading>
      <Input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        maxW="400px"
      />
      <Button
        onClick={() =>
          history.push(generatePath(ROUTES.games, { id: roomName }))
        }
      >
        Start
      </Button>
    </Stack>
  )
}
export default Home
