import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GameParams } from '../../@types/navigation'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
  const route = useRoute()
  const game = route.params as GameParams
  const navigation = useNavigation()
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.0.180:3333/games/${game.id}/ads`).then(response => response.json()).then(data => setDuos(data))
  }, [])

  async function getDiscordUser(adsId: string) {
    await fetch(`http://192.168.0.180:3333/ads/${adsId}/discord`).then(response => response.json()).then(data => setDiscordDuoSelected(data.discord))
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
            </TouchableOpacity>
            <Image source={logoImg} style={styles.logo} />
            <View style={styles.right} />
          </View>
          <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover" />
          <Heading title={game.name} subtitle="Conecte-se e comece a jogar!" />
          <FlatList data={duos} keyExtractor={item => item.id} renderItem={({item}) => <DuoCard onConnect={() => getDiscordUser(item.id)} data={item} />} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent} ListEmptyComponent={() => (<Text style={styles.emptyListText}>Não há anúncios publicados ainda</Text>)} />
          <DuoMatch discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')} visible={discordDuoSelected.length > 0} />       
        </SafeAreaView>
    </Background>
  )
}
