import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from 'services/api'

import { COLORS, Game } from 'types/game'
import { useInterval } from '@chakra-ui/hooks'
import { ROUND_TIME } from 'ts/siteConstants'

export const useGame = (gameId?: string) => {
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['game', gameId], [gameId])
  const gameQuery = useQuery<Game | undefined>(
    queryKey,
    () => api.getGame(gameId as string),
    { enabled: !!gameId }
  )

  useEffect(() => {
    if (!gameId) {
      return
    }
    const unsubscribe = api.watchGame(gameId, (data) => {
      queryClient.setQueryData(queryKey, data)
    })
    return () => {
      unsubscribe()
    }
  }, [gameId, queryKey, queryClient])

  return gameQuery
}

export const useRoundTimeUsed = (game: Game) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const createTimeSeconds = Math.floor(currentRound.createTime.getTime() / 1000)
  const nowSeconds = Math.floor(new Date().getTime() / 1000)
  const [timeUsed, setTimeUsed] = useState<number>(
    nowSeconds - createTimeSeconds
  )

  useInterval(() => {
    const nowSeconds = Math.floor(new Date().getTime() / 1000)
    if (createTimeSeconds + ROUND_TIME > nowSeconds) {
      setTimeUsed(nowSeconds - createTimeSeconds)
    } else {
      setTimeUsed(ROUND_TIME)
    }
  }, 100)

  const endRoundMutation = useEndRoundMutation()
  if (
    timeUsed === ROUND_TIME &&
    !endRoundMutation.isLoading &&
    !endRoundMutation.isSuccess
  ) {
    endRoundMutation.mutate({ game })
  }
  return timeUsed
}

export const useCreateGameMutation = () =>
  useMutation<void, Error, { gameId: string; playerName: string }>(
    async ({ gameId, playerName }) => {
      await api.createGame(gameId, playerName)
    }
  )

export const useJoinGameMutation = () =>
  useMutation<number, Error, { game: Game; playerName: string }>(
    async ({ game, playerName }) => {
      return await api.joinGame(game, playerName)
    }
  )

const QUESTIONS_COUNT_QUERY_KEY = 'questionsCount'
export const useQuestionCount = () =>
  useQuery<number>(
    QUESTIONS_COUNT_QUERY_KEY,
    async () => await api.getQuestionCount()
  )

export const useNextRoundMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, { game: Game }>(async ({ game }) => {
    let questionCount = queryClient.getQueryData<number>(
      QUESTIONS_COUNT_QUERY_KEY
    )
    if (!questionCount) {
      questionCount = await api.getQuestionCount()
      queryClient.setQueryData(QUESTIONS_COUNT_QUERY_KEY, questionCount)
    }
    const question = await api.getQuestion(
      questionCount,
      game.rounds.map((round) => round.question.id)
    )
    if (!question) {
      console.warn('Failed to get question')
      return
    }
    await api.nextRound(game, question)
  }, {})
}

export const useSendAnswerMutation = () =>
  useMutation<
    void,
    Error,
    { game: Game; playerIndex: number; answer: COLORS[] }
  >(async ({ game, playerIndex, answer }) => {
    await api.sendAnswer(game, playerIndex, answer)
  })

export const useEndRoundMutation = () =>
  useMutation<void, Error, { game: Game }>(async ({ game }) => {
    await api.endRound(game)
  })

export const useResetGameMutation = () =>
  useMutation<void, Error, { game: Game }>(async ({ game }) => {
    await api.resetGame(game)
  })
