'use client'

import { useEffect, useState } from 'react'
import { Box, Input, Checkbox, CheckboxGroup, Stack, Heading, Image, Text } from '@chakra-ui/react'
import lowData from '../data.json'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  [key: string]: string | null
}

interface Ingredient {
  name: string
  fodmap: string
}

const lowFodmapSet = new Set(
  (lowData as Ingredient[]).filter(item => item.fodmap === 'low').map(item => item.name.toLowerCase())
)

export default function Page() {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState<Meal[]>([])
  const [allowed, setAllowed] = useState<string[]>([])

  useEffect(() => {
    if (!query) return
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        const results: Meal[] = data.meals || []
        const filtered = results.filter(meal => {
          for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`]
            if (ing) {
              const name = ing.toLowerCase().trim()
              if (!lowFodmapSet.has(name) && !allowed.map(a=>a.toLowerCase()).includes(name)) {
                return false
              }
            }
          }
          return true
        })
        setMeals(filtered)
      })
      .catch(() => setMeals([]))
  }, [query, allowed])

  const ingredientOptions = Array.from(lowFodmapSet).slice(0, 20)

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Heading mb={4}>Low FODMAP Recipes</Heading>
      <Box mb={4}>
        <Input placeholder="Search meals" value={query} onChange={e => setQuery(e.target.value)} />
      </Box>
      <Box mb={4}>
        <Text mb={2}>Allow additional ingredients:</Text>
        <CheckboxGroup value={allowed} onChange={(v: unknown) => setAllowed(v as string[])}>
          <Stack direction="row" wrap="wrap">
            {ingredientOptions.map(name => (
              // @ts-expect-error Chakra types
              <Checkbox key={name} value={name}>{name}</Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
      <Stack spacing={4}>
        {meals.map(meal => (
          <Box key={meal.idMeal} borderWidth="1px" borderRadius="md" overflow="hidden" p={4}
            display="flex" gap="4">
            <Image src={meal.strMealThumb} alt={meal.strMeal} boxSize="100px" objectFit="cover" />
            <Box>
              <Heading size="md">{meal.strMeal}</Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
