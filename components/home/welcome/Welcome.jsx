import {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, Image, FlatList} from 'react-native'
import {useRouter} from "expo-router";

import styles from './welcome.style';
import {icons, SIZES} from "../../../constants";

const jobType = ["Temps-plein", "Temps-partiel", "Contract"]

const Welcome = ({searchTerm, handleClick, setSearchTerm}) => {
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState("Temps-plein");
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Bonjour ApiMan </Text>
                <Text style={styles.welcomeMessage}>Trouve le job parfait</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput} value={searchTerm}
                        onChangeText={(text) => {
                            setSearchTerm(text);
                        }}
                        placeholder="Que rechercher vous ?"/>
                </View>
                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={handleClick}>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={jobType}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(activeJobType);
                                router.push(`search/${item}`);
                            }
                            }

                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{columnGap: SIZES.small}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default Welcome