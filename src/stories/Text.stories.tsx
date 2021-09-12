import { Text } from '@chakra-ui/layout'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Design System/Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const p = () => (
  <Text textStyle="p">The quick brown fox jumps over the lazy dog.</Text>
)

export const p2 = () => (
  <Text textStyle="p2">The quick brown fox jumps over the lazy dog.</Text>
)
