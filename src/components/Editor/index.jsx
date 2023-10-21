import { View, Text, Input, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useCallback, useEffect, useRef } from 'react'
import './index.less'

export default function Editor(props) {
  const { onSend } = props
  const [content, setContent] = useState('')
  const handleContentInput = useCallback((e) => {
    setContent(e.target.value)
  }, [])
  const handleSend = useCallback(() => { 
    console.log(content)
    onSend(content)
  }, [onSend, content])
  return (
    <View className='editor'>
      <View className='editor-input'>
        <Input className='editor-content' value={content} type='text' onInput={handleContentInput} />
      </View>
      <Button className='editor-btn' type='primary' onClick={handleSend}>发送</Button>
    </View>
  )
}