import React, { useState } from 'react'
import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from '../../theme'
import { Activity, CheckCircle, HandbagSimple } from 'phosphor-react-native'
import { Heading } from '../Heading'
import * as Clipboard from 'expo-clipboard'

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
    const [isCopping, setIsCopping] = useState<boolean>(false)

    async function handleCopyDiscordUser() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)
        Alert.alert('Discord copiado!', 'Usuário copiado para a área de transferência.')
        setIsCopping(false)
    }

    return (
        <Modal {...rest} transparent statusBarTranslucent animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
                    <Heading title="Let's Play!" subtitle="Agora é só começar a jogar!" style={{alignItems: "center", marginTop: 24}} />
                    <Text style={styles.label}>Adicione no discord</Text>
                    <TouchableOpacity style={styles.button} onPress={handleCopyDiscordUser} disabled={isCopping}>
                        <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} />: discord}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
