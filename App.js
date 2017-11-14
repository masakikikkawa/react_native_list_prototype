
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    NavigatorIOS,
    TouchableWithoutFeedback,
    WebView
} from 'react-native';

var QIITA_URL = "https://qiita.com/api/v2/tags/reactjs/items";

// ベースのUINavigationControllerに該当するもの
export default class ReactProtoNavigator extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.navigator}
                initialRoute={{
                    component: ReactProtoList,
                    title: 'ReactProto',
                }}/>
        );
    }
}

// 記事一覧リスト
class ReactProtoList extends Component {

    constructor(props) {
        super(props);
        this.state = {name: this.props.initialName};
        this.state.items = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (

            <ListView
                dataSource={this.state.items}
                renderRow={this.renderItem}
                style={styles.listView}/>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderItem(item, sectionID, rowID) {
        return (
            <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: item.user.profile_image_url}}
                        style={styles.thumbnail}/>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.name}>{item.user.id}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    // API呼び出し
    fetchData() {
        fetch(QIITA_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    items: this.state.items.cloneWithRows(responseData),
                    loaded: true,
                });
            })
            .done();
    }

    //セルのタッチイベント
    onPressed(item) {
        this.props.navigator.push({
            title: item.title,
            component: ReactProtoItemView,
            passProps: { url: item.url }
        })
    }

}

// 記事閲覧用のWebView
class ReactProtoItemView extends Component {
    render() {
        return (
            <WebView
                url={this.props.url}/>
        )
    }
}

// 各種デザイン要素
var styles = StyleSheet.create({
    navigator: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        margin: 8,
        textAlign: 'left',
    },
    name: {
        fontSize: 12,
        margin: 8,
        textAlign: 'left',
    },
    thumbnail: {
        width: 80,
        height: 80,
        margin: 2,
    },
    listView: {
        backgroundColor: '#FFFFFF',
    },
});

AppRegistry.registerComponent('ReactProto', () => ReactProtoNavigator);