export async function getRoom(room) {
    let a = [];
    const b = await fetch(
      `http://localhost:3000/sortByTime/${room}`
    ).then(response => response.json())
    .then(data => {
      
      a.push(data);
      return data;
    })
    
    
    return b;
}