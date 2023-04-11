import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef } from 'react';  
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { _retrieve_data, _store_data } from '../handler/storage_handler';
import { get_growthBy_uuid, get_posyandu } from '../api/all_api';
import SelectDropdown from 'react-native-select-dropdown';


export default function Graph() {

    const [dataBayi, setDataBayi] = React.useState([])
    const [doSubmit, setDoSubmit] = React.useState(false)
    const [doChose, setDoChose] = React.useState(false)
    const [activity, setActivity] = React.useState(false)
    const [uuid, setuuid] = React.useState('')
    const [growth_data, setData] = React.useState([])
    const dropdownRef = useRef({});  
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

    const get_report = async (uuid) => {
        let dt = []
        const data_user = await _retrieve_data('data')
        await get_growthBy_uuid(data_user.jwt.token, {
            uuid: uuid
        }).then((result) => {
            if (result.status == 200) {
                const label = result.data.data.map((value, index) => { return value.date })
                const years = label.map(date => {
                    const [year, month, day] = date.split('-');
                    return year;
                })
                const uniqueYears = [...new Set(years)];
                setUnique(uniqueYears)
                setData(result.data.data)
                setDoSubmit(true)
                //setGraph(result.data.data)
            } else {
                alert(result.message)
            }
        }).catch(err => alert(err))
    }

    const [allgrowth, setAllGrowth] = React.useState({})
    const [unique, setUnique] = React.useState([])
    const setGraph = async (year,dt) => {
        const filteredData = dt.filter((value, index) => {
          return value.date.substring(0, 4) === year
        });
        
        let all_data = {
          label: filteredData.map((value, index) => { return value.date }),
          bb: filteredData.map((value, index) => { return value.bb }),
          tb: filteredData.map((value, index) => { return value.tb }),
          rekombbu: filteredData.map((value, index) => { return value.rekombbu }),
          rekomtbu: filteredData.map((value, index) => { return value.rekomtbu }),
          rekombbtb: filteredData.map((value, index) => { return value.rekombbtb }),
      
          bbumin3sd: filteredData.map((value, index) => { return value.bbumin3sd }),
          bbumin2sd: filteredData.map((value, index) => { return value.bbumin2sd }),
          bbumin1sd: filteredData.map((value, index) => { return value.bbumin1sd }),
          bbuplus3sd: filteredData.map((value, index) => { return value.bbuplus3sd }),
          bbuplus2sd: filteredData.map((value, index) => { return value.bbuplus2sd }),
          bbuplus1sd: filteredData.map((value, index) => { return value.bbuplus1sd }),
      
          tbumin3sd: filteredData.map((value, index) => { return value.tbumin3sd }),
          tbumin2sd: filteredData.map((value, index) => { return value.tbumin2sd }),
          tbumin1sd: filteredData.map((value, index) => { return value.tbumin1sd }),
          tbuplus3sd: filteredData.map((value, index) => { return value.tbuplus3sd }),
          tbuplus2sd: filteredData.map((value, index) => { return value.tbuplus2sd }),
          tbuplus1sd: filteredData.map((value, index) => { return value.tbuplus1sd }),
      
          bbtbmin3sd: filteredData.map((value, index) => { return value.bbtbmin3sd }),
          bbtbmin2sd: filteredData.map((value, index) => { return value.bbtbmin2sd }),
          bbtbmin1sd: filteredData.map((value, index) => { return value.bbtbmin1sd }),
          bbtbplus3sd: filteredData.map((value, index) => { return value.bbtbplus3sd }),
          bbtbplus2sd: filteredData.map((value, index) => { return value.bbtbplus2sd }),
          bbtbplus1sd: filteredData.map((value, index) => { return value.bbtbplus1sd }),
        };
        setAllGrowth(all_data)
        setDoChose(true)
      }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const [selected, setSelected] = React.useState(0)

    const data = {
        labels: allgrowth.label,
        datasets: [
            {
                data: selected == 1? allgrowth.tb: allgrowth.bb ,
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0? allgrowth.bbumin3sd: (selected == 1? allgrowth.tbumin3sd:allgrowth.bbtbmin3sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }, {
                data: selected == 0? allgrowth.bbumin3sd: (selected == 1? allgrowth.tbumin2sd:allgrowth.bbtbmin2sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0? allgrowth.bbumin3sd: (selected == 1? allgrowth.tbumin1sd:allgrowth.bbtbmin1sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }, {
                data: selected == 0? allgrowth.rekombbu: (selected == 1? allgrowth.rekomtbu:allgrowth.rekombbtb),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0? allgrowth.bbuplus1sd: (selected == 1? allgrowth.tbuplus1sd:allgrowth.bbtbplus1sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }, {
                data: selected == 0? allgrowth.bbuplus2sd: (selected == 1? allgrowth.tbuplus2sd:allgrowth.bbtbplus2sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0? allgrowth.bbuplus3sd: (selected == 1? allgrowth.tbuplus3sd:allgrowth.bbtbplus3sd),
                color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: [ selected==1? 'TB': 'BB' , '-3 SD', '-2 SD', '-1 SD', 'Median', '+1 SD', '+2 SD', '+3 SD'] // optional
    };
    return (
        <View style={{ marginTop: 200 }}>
            <View>
                <SelectDropdown
                    defaultButtonText='Pilih Bayi'
                    data={dataBayi.map((value) => { return value.name })}
                    onSelect={(selectedItem, index) => {
                        if(doSubmit){
                            dropdownRef.current.reset()
                        }
                        setDoChose(false)
                        setuuid(dataBayi[index].uuid)
                        get_report(dataBayi[index].uuid)
                    }}
                />
                {doSubmit ? (
                    <View>
                        <SelectDropdown
                            defaultButtonText='Pilih Tahun'
                            data={unique}
                            onSelect={(selectedItem, index) => {
                                setGraph(selectedItem, growth_data)
                                setSelected(0)
                            }}
                            ref={dropdownRef}
                        />
                    
                    {doChose ? (
                        <View>
                        <LineChart
                            data={data}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        />
                        <SelectDropdown
                            data={['BB/U', 'TB/U', 'BB/TB']}
                            defaultValueByIndex={0}
                            onSelect={(selectedItem, index) => {
                                setSelected(index)
                            }}
                        />
                        </View>
                    ) : (
                        <Text>Pilih Tahun Dulu</Text>
                    )}

                    </View>
                )
                    :
                    (
                        <Text></Text>
                    )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})