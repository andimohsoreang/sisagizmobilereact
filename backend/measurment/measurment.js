import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { _retrieve_data, _store_data } from '../handler/storage_handler'
import { get_posyandu, post_measurment, user_measurmentBy_uuid, user_measurmet } from '../api/all_api'
import SelectDropdown from 'react-native-select-dropdown'
import { ActivityIndicator } from 'react-native'
import Log_Measurment from './log_measurment'

export default function Measurment() {
    const [uuid, setuuid] = React.useState('')
    const [age, setAge] = React.useState(3)
    const [bb, setBB] = React.useState(2.9)
    const [tb, setTB] = React.useState(70)
    const [method, setMethod] = React.useState('Terlentang')
    const [vitamin, setVitamin] = React.useState('ya')
    const [lila, setLila] = React.useState(4)
    const [lika, setLika] = React.useState(4)
    const [dataBayi, setDataBayi] = React.useState([])
    const [doSubmit, setDoSubmit] = React.useState(false)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const [date, setDate] = React.useState(`${year}-${month}-${day}`)
    const [activity, setActivity] = React.useState(false)

    const SetData = async() => {
        const dt = []
        const POSYANDU = await get_posyandu({})
        const data = await _retrieve_data('data');
        _retrieve_data('bayi').then((data) => {
            data.result.map((value) => {
                if(value.posyandu == POSYANDU.data[data.user.posyanduId].nama){
                    dt.push(value)
                }
            })
            setDataBayi(dt)
        })
    }

    SetData()
    const Submit = async () => {
        setActivity(true)
        try {
          const data = await _retrieve_data('data');
          console.log(uuid);
          const result = await post_measurment(data.jwt.token, {
            uuid: uuid,
            date: date,
            age: Number(age),
            bb: Number(bb),
            tb: Number(tb),
            method: method,
            vitamin: vitamin,
            lila: Number(lila),
            lika: Number(lika),
          });
          if (result.status === 201) {
            console.log('berhasil');
            Hasil_Pengukuran()
            setDoSubmit(true)
            setActivity(false)
          } else {
            alert(result.message);
            setActivity(false)
          }
        } catch (err) {
          alert(err);
          setActivity(false)
        }
      }

    const Hasil_Pengukuran = async() => {
        try{
            const data = await _retrieve_data('data');
            const result = await user_measurmet(data.jwt.token, {})
            if(result.status === 200){
                _store_data('measurment', result.data)
                _store_data('UUID', uuid)
            }else{
                alert(result.message)
            }
        }catch(err){
            alert(err)
        }
    }
  return (
    <View>     
        <View>
            <SelectDropdown 
                defaultButtonText='Pilih Bayi'
                data={dataBayi.map((value) => {return value.name})}
                onSelect={(selectedItem, index) => {
                    setuuid(dataBayi[index].uuid)
                    setDoSubmit(false)
                }}
            />
        </View>
        {uuid.length > 0? (
            <View>
                {doSubmit? 
                (
                    <Log_Measurment />
                ) 
                : 
                (
                    <View>
                        <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Umur'
                    onChangeText={setAge}
                    value={String(age)}

                />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Berat Badan'
                    onChangeText={setBB}
                    value={String(bb)}

                />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Tinggi Badan'
                    onChangeText={setTB}
                    value={String(tb)}

                />
                <SelectDropdown 
                defaultValue={'Terlentang'}
                data={['Terlentang', 'Berdiri']}
                onSelect={(selectedItem, index) => {
                    setMethod(selectedItem)
                }}
            />
                <SelectDropdown 
                defaultValue={'Ya'}
                data={['Ya', 'Tidak']}
                onSelect={(selectedItem, index) => {
                    setVitamin(selectedItem)
                }}
            />
                <TextInput 
                    style={styles.input}
                    placeholder='Lingkar Lengan'
                    onChangeText={setLila}
                    value={String(lila)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Lingkar Kaki'
                    onChangeText={setLika}
                    value={String(lika)}
                />
                {activity? 
                (
                    <ActivityIndicator />

                ):(
                    
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={Submit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                )}
                </View>

)}
</View>
                    
        ) : (
            <Text>Pilih Bayi Terlebih Dahulu</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
    height:40,
    margin:(12 ,12, 50, 12),
    borderWidth:1,
    padding:10,
},

})