# react-tangle

A simple react app state management library. Experimental stage.

## Basic

```javascript
// Books.js
import { useTangledState } from 'react-tangle'

export function Books() {

  const [books] = useTangledState('books', [])

  return (
    <div>
      { books.map(b => {
        return (
          <div>
            { b.name }
          </div>
        )
      })}
    </div>
  )
}


export function AddBook() {
  const [books, setBooks] = useTangledState('books', [])
  const bookInputRef = React.useRef()

  const onAddBook = () => {
    setBooks(() => {
      return books.concat([{ name: bookInputRef.value }])
    })
  }
  return (
    <div>
      <input ref={bookInputRef}>
      <button onClick={onAddBook}>Add</button>
    </div>
  )
}


export function BookApp() {

    return (
      <TangleProvider initial={{ books: [] }}>
        <Books/>
        <AddBook/>
      </TangleProvider>
    )
}

```