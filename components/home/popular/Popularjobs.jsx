import {useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {useRouter} from "expo-router";

import styles from './popularjobs.style';
import {COLORS, SIZES} from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
    const {data, isLoading, error} = useFetch('search', {query: 'React developer', num_pages: 1});
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState({});
    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`)
    }
    // console.log(error);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Jobs polulaires</Text>
                <TouchableOpacity><Text style={styles.headerBtn}>Tout voir</Text></TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={COLORS.primary}
                    />
                ) : error ? <Text>Une erreur s'est produite</Text> :
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                                setSelectedJob={setSelectedJob}

                            />
                            )
                        }
                        keyExtractor={(item) => item?.job_id}
                        contentContainerStyle={{columnGap: SIZES.medium}}
                        horizontal
                    />
                }
            </View>
        </View>
    )
}

export default Popularjobs