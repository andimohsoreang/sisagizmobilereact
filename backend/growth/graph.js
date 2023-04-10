import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { _retrieve_data, _store_data } from '../handler/storage_handler';
import { get_posyandu } from '../api/all_api';
import SelectDropdown from 'react-native-select-dropdown';


export default function Graph() {

    const [dataBayi, setDataBayi] = React.useState([])
    const [doSubmit, setDoSubmit] = React.useState(false)
    const [activity, setActivity] = React.useState(false)
    const [uuid, setuuid] = React.useState('')

    React.useEffect(() => {
        const fetchData = async () => {
            const data_user = await _retrieve_data('data');
            const POSYANDU = await get_posyandu(data_user.jwt.token, {});
            const data = await _retrieve_data('bayi');
            const newDataBayi = data.result.filter((value) => value.posyandu === POSYANDU.data.data[1 - (data_user.user.posyanduId)].nama);
            setDataBayi(newDataBayi);
        }
        fetchData();
    }, []);

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };
  return (
    <View style={{marginTop:200}}>
        <View>
            <SelectDropdown 
                defaultButtonText='Pilih Bayi'
                data={dataBayi.map((value) => {return value.name})}
                onSelect={(selectedItem, index) => {
                    setuuid(dataBayi[index].uuid)
                    setDoSubmit(false)
                    console.log(uuid);
                }}
            />
        </View>
     <LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>
    </View>
  )
}

const styles = StyleSheet.create({})