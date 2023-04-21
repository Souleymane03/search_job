import {useCallback, useState} from "react";
import {Text, View, SafeAreaView, ActivityIndicator, RefreshControl, ScrollView} from "react-native";
import {Stack, useSearchParams, useRouter} from "expo-router";

import {JobAbout, ScreenHeaderBtn, Company, JobFooter, JobTabs, Specifics} from "../../components";
import {COLORS, SIZES, icons} from "../../constants";
import useFetch from "../../hook/useFetch";


const tabs = ["A propos","Qualifications","Responsabilités"]

const JobDetails = () => {
    // get specific id of job details routes
    const params = useSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refresh} = useFetch('job-details', {job_id: params.id})
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const displayTabContent = () => {
        switch (activeTab) {
            case "A propos":
                return <JobAbout
                    info={data[0].job_description ?? 'Aucune information disponible'}
                />
                break;
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
                break;
            case "Responsabilités":
                return <Specifics
                    title="Responsabilités"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
                break;
            default:
                return <JobAbout
                    info={'Aucune information disponible'}
                />

        }
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    },[])
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    )
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    {isLoading ? <ActivityIndicator size="large" color={COLORS.primary}/>
                        : error ? <Text>Une erreur s'est produite</Text> :
                            data.length === 0 ? <Text>Aucune données disponnible</Text> :
                                <View style={{padding:SIZES.medium, paddingBottom:100}}>
                                    <Company
                                        companyLogo={data[0].employer_logo}
                                        jobTitle={data[0].jobTitle}
                                        companyName={data[0].employer_name}
                                        location={data[0].job_country}
                                    />
                                    <JobTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                    {displayTabContent()}
                                </View>
                    }
                </ScrollView>
                <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}/>
            </>
        </SafeAreaView>
    )
}

export default JobDetails;