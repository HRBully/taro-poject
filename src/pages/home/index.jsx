import { View, Text, Input, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useCallback, useEffect, useRef } from 'react'
import './index.less'
import Editor from '../../components/Editor/index.jsx'
import ChatMessage from '../../components/ChatMessage/index.jsx'

export default function Home() {
  const ws = useRef(null)
  const [chatList, setChatList] = useState([])
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [userColor, setUserColor] = useState('')
  const getColor = useCallback(() => {
    const color = Math.floor(Math.random() * 0xffffff).toString(16)
    return `#${color}`
  }, [])
  useEffect(() => {
    const userName = sessionStorage.getItem('name')
    const uId = sessionStorage.getItem('uId')
    const color = userColor || getColor()
    setUserColor(color)
    setName(userName)
    setId(uId)
    ws.current = new WebSocket('ws://localhost:8080')
    ws.current.onopen = function() {
      // 获取当前链接的状态
      // 1 是建立了链接
      console.log(ws.readyState);
    }
    ws.current.onmessage = function(data) {
      // 服务器返回过来的聊天信息
      const chat = JSON.parse(data.data)
      setChatList((list) => [...list, chat])
    }
  }, [])

  const handleSend = useCallback((content) => {

    const values = {
      uName: name,
      context: content,
      uId: id,
      color: userColor
    }
    
    ws.current.send(JSON.stringify(values))
  }, [name, id, userColor])
  return (
    <View className='index'>
      <ChatMessage 
        content='hello'
        name={name}
        chatList={chatList}
      />
      <Editor onSend={handleSend} />
    </View>
  )
}
