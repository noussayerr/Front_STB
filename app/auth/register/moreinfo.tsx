// moreinfo.js
import React, { useEffect, useState, useContext } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import  AppContext  from './AppContext';  
import Rib from '@/app/components/rib';

interface DropdownOption {
  value: string;
  label: string;
}

const maritalStatusOptions: DropdownOption[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];
const ageOptions: DropdownOption[] = Array.from({ length: 100 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));
const socioProfessionalStatusOptions: DropdownOption[] = [
  { value: 'student', label: 'Student' },
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'retired', label: 'Retired' },
];

const Moreinfo: React.FC = () => {
  const [countryData, setCountryData] = useState<DropdownOption[]>([]);
  const [stateData, setStateData] = useState<DropdownOption[]>([]);
  const [cityData, setCityData] = useState<DropdownOption[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<string | null>(null);
  const [socioProfessionalStatus, setSocioProfessionalStatus] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>("tunisia");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { setCurrentStep, setFormData, formData } = useContext(AppContext)!;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
          headers: {
            'X-CSCAPI-KEY': 'RHR0akVIRzRWY3BFNnRQZVVmRGk5YWxIRndYQlE2aFY3TzFXSmh0Sw==',
          },
        });
        
        const countryArray = response.data.map((item: any) => ({
          value: item.iso2,
          label: item.name,
        }));
        setCountryData(countryArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const handleState = async (countryCode: string) => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
        headers: {
          'X-CSCAPI-KEY': 'RHR0akVIRzRWY3BFNnRQZVVmRGk5YWxIRndYQlE2aFY3TzFXSmh0Sw==',
        },
      });

      const stateArray = response.data.map((item: any) => ({
        value: item.iso2,
        label: item.name,
      }));
      setStateData(stateArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCity = async (countryCode: string, stateCode: string) => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
        headers: {
          'X-CSCAPI-KEY': 'RHR0akVIRzRWY3BFNnRQZVVmRGk5YWxIRndYQlE2aFY3TzFXSmh0Sw==',
        },
      });

      const cityArray = response.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setCityData(cityArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    setFormData({ ...formData, country:countryName, state:stateName, city:cityName, maritalStatus, socioProfessionalStatus });
    setCurrentStep(2);
  };

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.dropdownContainer} className='flex gap-6'>
        <View className='flex gap-2'>
          <Rib />
          <Text className='text-lg font-semibold '>Where you leave ?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={countryData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select country' : '...'}
            searchPlaceholder="Search..."
            value={country}
            onChange={item => {
              setCountry(item.value);
              handleState(item.value);
              setCountryName(item.label);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={stateData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select state' : '...'}
            searchPlaceholder="Search..."
            value={state}
            onChange={item => {
              setState(item.value);
              handleCity(country!, item.value);
              setStateName(item.label);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={cityData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select city' : '...'}
            searchPlaceholder="Search..."
            value={city}
            onChange={item => {
              setCity(item.value);
              setCityName(item.label);
            }}
          />
        </View>
        <View>
          <Text className='text-lg font-semibold '>what is your marital status ?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={maritalStatusOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Marital Status"
            value={maritalStatus}
            onChange={item => setMaritalStatus(item.value)}
            />
        </View>
        <View>
          <Text className='text-lg font-semibold '>What is your socio-profesional status ?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={socioProfessionalStatusOptions}
            labelField="label"
            valueField="value"
            placeholder="I'm ..."
            value={socioProfessionalStatus}
            onChange={item => setSocioProfessionalStatus(item.value)}
            />
        </View>
        <TouchableOpacity onPress={handleNext} className="bg-[#2563eb] rounded-2xl py-4 flex-row justify-center" activeOpacity={0.8}>
          <Text className='text-white font-bold text-xl'>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Moreinfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#F5F9FE',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});