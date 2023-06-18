import axios from 'axios';

export const getPlacesData = async () => {
    try {
        const {
            data: { data },
        } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
        {
            params: {
            bl_latitude: '25.15543993776612',
            tr_latitude: '25.41257834546226',
            bl_longitude: '51.39587210719369',
            tr_longitude: '51.62812119686502',
            limit: '30',
            currency: 'USD',
            lunit: 'km',
            lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': 'ac063b5978mshc487de27873c4cep128ac5jsne086f2739f0f',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          },
        }
    );

    return data;
    } catch (error) {
        return null;
    }
};