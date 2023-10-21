import { View, Text, Input, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useCallback, useEffect, useRef, useId } from 'react'
import './index.less'

export default function Index() {
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const uId = useId(null)
  const handleNameInput = useCallback((e) => {
    setName(e.target.value)
  }, [])
  const handleTagInput = useCallback((e) => {
    setTag(e.target.value)
  }, [])
  const handleLogin = useCallback(() => {
    sessionStorage.setItem('name', name)
    sessionStorage.setItem('tag', tag)
    sessionStorage.setItem('uId', uId)
    Taro.navigateTo({
      url: `/pages/home/index?name=${name}`
    })
  }, [name, tag, uId])
  return (
    <View className='login'>
      <View className='login-body'>
        <View>请自定义昵称加入聊天室</View>
        <View className='login-input'>
          <Text className='login-label'>昵称</Text>
          <Input className='login-name' value={name} type='text' placeholder='请输入自定义昵称' onInput={handleNameInput} />
        </View>
        <View className='login-input'>
          <Text className='login-label'>标签</Text>
          <Input className='login-tag' value={tag} type='text' placeholder='请输入自定义标签' onInput={handleTagInput} />
        </View>
        <Button className='login-btn' type='primary' onClick={handleLogin}>进入聊天</Button>
      </View>
    </View>
  )
}
