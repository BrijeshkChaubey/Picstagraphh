import React, { memo,useState } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { globals } from "../../../../configs";
import { _InlineLoader } from "../..";

const CellContainer = (props) =>{
    return(
        <View {...props}>
            {props.children}
        </View>
    )
}
/***
 * To test out just copy this component and render in you root component
 */

const RecycleTestComponent = (props) => {

    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });
    let _layoutProvider = new LayoutProvider(
        index => {
            return index;
        },
        (type, dim) => {

                dim.width = props.width || globals.WINDOW_WIDTH;
                // dim.height = props.height || (globals.WINDOW_HEIGHT/4)*3;
                // dim.width = props.width || 1;
                dim.height = props.height || 1;

        }
    );
    // let _rowRenderer=_rowRenderer();

    const [state, setstate]= useState({
        dataProvider: dataProvider.cloneWithRows(_generateArray(props.data.length || 0)),
        extendedState: {},
        data : props.data
    })
    // static getDerivedStateFromProps(nextProps, state){

    //     if(nextProps.data.length !== state.data.length){

    //         let arr = new Array(nextProps.data.length);
    //         for (let i = 0; i < nextProps.data.length; i++) {
    //             arr[i] = nextProps.data[i]
    //         }

    //         return{
    //             dataProvider: state.dataProvider.cloneWithRows(arr)
    //         }
    //     }
    //     return null;
    // }
  function  _generateArray(n) {
        
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = props.data[i]
        }
        return arr;
    }
   function _rowRenderer(type, data) {
        //You can return any view here, CellContainer has no special significance
        
        return(
            <CellContainer style={styles.container}>
                {props.renderItem({item : data, index : type})}
            </CellContainer>
        )
    }

  return (
    <View style={{minHeight: 1, minWidth: 1}}>
    <RecyclerListView
        // onScroll={(e)=>{this.props.scrollEvent && this.props.scrollEvent()}}
        canChangeSize={true}
        onEndReached={()=>{props.onEnd && props.onEnd()}}
        onEndReachedThreshold={0.75}
        renderFooter={()=>{
            return (
                    <View>
                        {props.loading ? <_InlineLoader /> : null}
                    </View>
                    )
        }}
        forceNonDeterministicRendering
        refreshControl={props.refreshList && props.refreshList}
        layoutProvider={_layoutProvider}
        dataProvider={state.dataProvider}
        rowRenderer={_rowRenderer}
    />
</View>
  )
}
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1
    }
};

export default memo(RecycleTestComponent)