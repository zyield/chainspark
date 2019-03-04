import { WS_URL } from './constants'
import initPhxChannel from './phx'

const { Socket } = initPhxChannel()
const TOPIC = 'transactions'

const handleError = event => console.log(event)

const phxConnect = handleMessage => {
  let jwt = localStorage.getItem('token')
  const socket = new Socket(WS_URL, { params: { jwt: jwt }})
  socket.onError(handleError)
  socket.connect()

  const channel = socket.channel(TOPIC, {})
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) })

  channel.on('incoming_tx', handleMessage)

  return channel
}

export default phxConnect
