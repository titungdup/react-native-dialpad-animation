import { StatusBar } from 'expo-status-bar'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { MotiView } from 'moti'

const { width } = Dimensions.get('window')

const pinLength = 4
const pinContainer = width / 2
const pinSpacing = 10
const pinMaxSize = pinContainer / pinLength
const pinSize = pinMaxSize - pinSpacing * 2

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']
const dialPadSize = width * 0.2
const dialPadTextSize = dialPadSize * 0.4
const textSize = width * 0.07
const _spacing = 20

function DialPad({
  onPress,
}: {
  onPress: (item: (typeof dialPad)[number]) => void
}) {
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onPress(item)
            }}
            disabled={item === ''}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderColor: 'black',
                borderWidth: typeof item !== 'number' ? 0 : 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item === 'del' ? (
                <Ionicons
                  name='backspace-outline'
                  size={dialPadTextSize}
                  color='black'
                />
              ) : (
                <Text style={{ fontSize: dialPadTextSize }}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default function App() {
  const [code, setCode] = useState<number[]>([])

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: textSize }}>Enter Passcode</Text>
      </View>
      <View
        style={{
          gap: pinSpacing * 2,
          flexDirection: 'row',
          marginBottom: _spacing * 2,
          height: pinSize * 2,
          alignItems: 'flex-end',
        }}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = code[i] === 0 ? true : !!code[i]
          return (
            <MotiView
              style={{
                width: pinSize,
                borderRadius: pinSize,
                backgroundColor: 'rgb(0,122,255)',
              }}
              key={`pin-${i}`}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 200,
              }}
            />
          )
        })}
      </View>
      <DialPad
        onPress={(item) => {
          if (item === 'del') {
            setCode((prevCode) => prevCode.slice(0, prevCode.length - 1))
          } else if (typeof item === 'number') {
            if (code.length === pinLength) return
            setCode((prevCode) => [...prevCode, item])
          }
        }}
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
