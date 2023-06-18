import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets/index';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MenuContainer from '../components/MenuContainer';

import { FontAwesome } from '@expo/vector-icons';
import ItemCarDontainer from '../components/ItemCarDontainer';
import { getPlacesData } from '../api';


const Discover = () => {

    const navigation = useNavigation();
    const [type, setType] = useState("restaurants");
    const [isLoading, setisLoading] = useState(false);
    const [mainData, setmainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);


    {/* burası androidde çalışmadı */ }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        setisLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
            setmainData(data);
            setInterval(() => {
                setisLoading(false);
            }, 2000);
        });
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <View className="flex-row items-center justify-between px-8">
                <View>
                    <Text className="text-[40px] text-[#0b646b] font-bold">Discover</Text>
                    <Text className="text-[#527283] text-[36px]">the beauty today</Text>
                </View>


                <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                    <Image
                        source={Avatar}
                        className="w-full h-full rounded-md object-cover"
                    />
                </View>
            </View>
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder='Ara'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat)
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng)
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat)
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng)
                    }}
                    query={{
                        key: 'AIzaSyC0vno2FexIhGkIsK_wG5-kq2T02rc5hvU',
                        language: 'tr',
                    }}
                />
            </View>
            {/* Menu container */}
            {isLoading ? <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0b646b" />
            </View> :
            <ScrollView>
                <View className="flex-row items-center justify-between px-8 mt-8">
                    <MenuContainer
                        key={"hotels"}
                        title="Hotels"
                        imageSrc={Hotels}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={"attractions"}
                        title="Attractions"
                        imageSrc={Attractions}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={"restaurants"}
                        title="Restaurants"
                        imageSrc={Restaurants}
                        type={type}
                        setType={setType}
                    />
                </View>

                <View>
                    <View className="flex-row items-center justify-between px-4 mt-8">
                        <Text className="text-[#2c7379] text-[28px] font-bold">Top Tips</Text>
                        <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                            <Text className="text-[#a0c4c7] text-[20px] font-bold">Explore</Text>
                            <FontAwesome name="long-arrow-right" size={24} color="#a0c4c7" />
                        </TouchableOpacity>
                    </View>

                    <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                        {mainData?.length > 0 ? ( 
                        <>
                          {mainData?.map((data, i) =>(
                              <ItemCarDontainer 
                              key={i} 
                              imageSrc={
                                data?.photo?.images?.medium?.url ?
                                data?.photo?.images?.medium?.url :
                                "https://cdn.pixabay.com/photo/2023/06/12/11/34/mushrooms-8058299_1280.jpg"
                              } 
                              title={data?.name}
                              location={data?.location_string}
                              data={data}
                              />
                          ))}
                        </>
                        ) : ( 
                        <>
                            <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                <Image 
                                source={NotFound}
                                className="w-32 h-32 object-cover"
                                />
                                <Text className="text-2xl text-[#428288] font-semibold">
                                    Opps.. No data found
                                </Text>
                            </View>
                        </>
                        )}
                    </View>
                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
};

export default Discover;