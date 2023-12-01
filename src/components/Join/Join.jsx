import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3002')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div className={style['join-container']}>
      <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
        <h2>ChatZap</h2>
        <img className={style['logo']} src='src/assets/msg.png'/>
      </div>
      <Input style={{color:"white"}} inputRef={usernameRef} placeholder='Insira seu nome' />
      <Button sx={{mt:2}} onClick={()=>handleSubmit()} variant="contained">Prosseguir</Button>
    </div>
  )
}
