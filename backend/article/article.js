import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { get_articleBy_category } from '../api/all_api'

export default function Article() {


    
    const [category, setCategory] = React.useState('')
    const Display_Article = () => {
        const [articleData, setArticleData] = React.useState([]);
        const articleItems = [];
        React.useEffect(() => {
          get_articleBy_category({
            category: category
          })
            .then((result) => {
              let index;
              if (result.status == 200) {
                index = result.data.data.length;
                const articleData = result.data.data;
                for (let i = 0; i < index; i++) {
                  articleItems.push({
                    uri: articleData[i].url
                  });
                }
                setArticleData(articleItems);
              } else {
                console.log("Error fetching data");
              }
            })
            .catch((err) => {
              alert(err);
            });
        }, [category]);
      
        return (
          <View>
            {articleData.length == 0 ? (
              <ActivityIndicator />
            ) : (
              articleData.map((image, index) => (
                <Image
                  key={index}
                  style={styles.logo}
                  source={{ uri: image.uri }}
                />
              ))
            )}
          </View>
        );
      };
    

  return (
    <View style={{marginTop:25, marginBottom:50}}>  
        <ScrollView>
            <Display_Article />
            
        </ScrollView>
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
    logo: {
        width: 66,
        height: 58,
      }
})