import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    ListView,
    BackAndroid,
    Button,
    DatePickerAndroid,
    ScrollView,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import ImageView from './ImageView'
const WeixinJx = ({weixinJx, dispatch}) => {
    const {pno, ps, isInit, weixinList}= weixinJx;
    if (isInit) {
        dispatch({type: "getweixinJxList", data: {pno: pno, ps: ps}})
    }
    if (!weixinList) {
        return <Text>加载中...</Text>
    }
    return (
        <View style={{ flex: 1,
        flexDirection: 'column',}}>
            <ListView
                dataSource={weixinList}
                renderRow={(item) =>{
                      return <TouchableOpacity
                      style={{flex: 1}}
                      key={item.firstImg} activeOpacity={0.8}
                      onPress={ ()=>{ Actions.webView({ url: item.url}) }}>
                                        <ImageView
                                         defaultSource={require('../images/img_def.png')}
                                          style={itemStyles.image}
                                          resizeMode={Image.resizeMode.cover}
                                           source={{uri: item.firstImg?item.firstImg:'../images/img_def.png'}} >
                                        <View style={itemStyles.titleContainer}>
                                            <Text style={itemStyles.title}  onPress={()=>{
                                            }}>{item.title}</Text>
                                         </View>
                                         </ImageView>
                             </TouchableOpacity>

                      } }
            />
        </View>

    )

}


const maptopr = (store) => {
    return {
        weixinJx: store.weixinJx,
    }
}
const itemStyles = StyleSheet.create({


    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        height: Dimensions.get('window').width * 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 10,
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default connect(maptopr)(WeixinJx)