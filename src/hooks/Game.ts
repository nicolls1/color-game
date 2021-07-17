import { useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import FirebaseService from 'services/FirebaseService'

import { COLORS, Game } from 'types/Game'
import queryClient from 'queryClient'

export const useGame = (gameId?: string) => {
  const queryKey = useMemo(() => ['game', gameId], [gameId])
  const gameQuery = useQuery<Game | undefined>(
    queryKey,
    () => FirebaseService.getGame(gameId as string),
    { enabled: !!gameId }
  )

  useEffect(() => {
    if (!gameId) {
      return
    }
    const unsubscribe = FirebaseService.watchGame(gameId, (data) => {
      queryClient.setQueryData(queryKey, data)
    })
    return () => {
      unsubscribe()
    }
  }, [gameId, queryKey])

  return gameQuery
}

export const useCreateGameMutation = () =>
  useMutation<void, Error, { gameId: string; playerName: string }>(
    async ({ gameId, playerName }) => {
      await FirebaseService.createGame(gameId, playerName)
    }
  )

export const useJoinGameMutation = () =>
  useMutation<number, Error, { game: Game; playerName: string }>(
    async ({ game, playerName }) => {
      return await FirebaseService.joinGame(game, playerName)
    }
  )

export const useNextRoundMutation = () =>
  useMutation<void, Error, { game: Game }>(async ({ game }) => {
    const question = await FirebaseService.getQuestion(
      game.rounds.map((round) => round.question.id)
    )
    if (!question) {
      console.warn('Failed to get question')
      return
    }
    await FirebaseService.nextRound(game, question)
  })

export const useSendAnswerMutation = () =>
  useMutation<
    void,
    Error,
    { game: Game; playerIndex: number; answer: COLORS[] }
  >(async ({ game, playerIndex, answer }) => {
    await FirebaseService.sendAnswer(game, playerIndex, answer)
  })

export const useEndRoundMutation = () =>
  useMutation<void, Error, { game: Game }>(async ({ game }) => {
    await FirebaseService.endRound(game)
  })

export const useResetGameMutation = () =>
  useMutation<void, Error, { game: Game }>(async ({ game }) => {
    await FirebaseService.resetGame(game)
  })
