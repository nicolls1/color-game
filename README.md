# The Color Game

A color trivia quiz game

Game can be found live here: https://color-game-1d4bf.web.app/

## Under active development

The Color Game is sadly lacking color at the moment. Also, there are only 18
questions. Color and more questions are soon to come!

## How to play

Create a game room by giving it a name then share it with friends. Start the
game once everyone has joined. Pick the colors that are the answer to the
prompt. Players get a point for every player that answers incorrectly so if all
players are correct no points are given. For 2 players, 10 points wins the game
or for 3-4 players 15 points wins the game.

## How it was built

A react app bundled with create-react-app and deployed with firebase. ChakraUI
used for components and react-query used for fetching. Visual testing with
Storybook and Chromatic. An MVP implmentation as game rules are enforced client
side and cheating is possible from a mailicious actor but its just a game for
fun :). I believe that cloud functions would be required to have a fully secure
implementation with firestore rules but I'd have to think about it more and take
a second stab at it.

Happy to discuss and have feedback!

## Running locally

With the firebase emulators installed
(https://firebase.google.com/docs/rules/emulator-setup):

```
firebase emulators:start --only firestore
```

With yarn installed, the code can be bundled with:

```
yarn
yarn start
```

With node installed, populate the questions in the local emulator with:

```
node system/populateQuestions.js
```

Running storybook locally:

```
STORYBOOK_MOCK_API=true yarn storybook
```

#### Env Variables

- REACT_APP_MOCK_API or STORYBOOK_MOCK_API: Set to 'true' to use the mock API
  instead of the firebase API
