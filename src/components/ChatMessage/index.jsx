import { View, Text, Input, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState, useCallback, useEffect, useRef } from "react";
import "./index.less";

export default function ChatMessage(props) {
  const { name, chatList } = props;
  console.log(chatList);
  return chatList?.map((item, index) => {
    return (
      <View 
        className='chat' 
        key={index}
        style={{
          flexDirection: item.uName === name ? 'row-reverse' : 'row'
        }}
      >
        <View 
          class='chat-img'
          style={{
            backgroundColor: item.color,
            color: '#fff'
          }}
        >{item.uName[0]}</View>
        <View class='chat-body'>
          <View 
            class='chat-name'
            style={{
              textAlign: item.uName === name ? 'right' : 'left'
            }}
          >{item.uName}</View>
          <Text class='chat-content'>{item.context}</Text>
        </View>
      </View>
    );
  });
}
