# react-tangle

A simple react app state management library

## Basic

```javascript
// Books.js
import { useTangledState } from 'react-tangle'

export function Books() {

  const [books] = useTangledState('books', [])

  return (

  )
}


```