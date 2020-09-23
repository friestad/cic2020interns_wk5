export async function updateRoom(userId, room) {
    let a = ''
    let url = `http://localhost:3000/changeRoom/${userId}/${room}`;
    const response = await fetch(url,{
        method: 'PUT',
        body: ''

    }).then(response => response.json())
    return response;
}