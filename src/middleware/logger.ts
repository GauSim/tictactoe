
export function logger(store: any) {
  return (next: any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
} 
