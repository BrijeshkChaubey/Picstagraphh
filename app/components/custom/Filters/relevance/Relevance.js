import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    StyleSheet,
    Modal,
} from "react-native";
import { Input, Item, Icon } from "native-base";
import {
    globals,
    helpers,
    validators,
    colors,
    fonts,
    images,
    sty,
    localize,
} from "../../../../configs";
import {
    _ErrorModal,
    _GradiantView,
    _Lang,
    _ListBox,
    _Loading,
    _Spacer,
    _Icon,
    _Button,
    _ListView,
    _B,
    _Header,
    _ListWrap,
    _InlineLoader,
} from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";

import {
    setFilterPropArr,
    resetFilterArr,
} from "../../../../redux/actions/FilterWrapperAction";
import {
    setFilterDataProp,
    pushFilterDataProp,
} from "../../../../redux/actions/FiltersDataAction";
import { FilterHead } from "../common";
import * as data from "../../../../assets/data";
import { toLower, find, filter } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Relevance(props) {
    
    const { cb } = props;

    const [searchTxt, setSearchTxt] = useState('');
    const [activeRelevance, setActiveRelevance] = useState({ index: null });
    const [filterFor, setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT,)

    const filtersApiData = useSelector(state => state.filtersApiData);
    const localize = useSelector(state => state.localize)
    const filtersData= useSelector(state=> state.filterWrapperReducer)

    const dispatch = useDispatch();

    console.log('Relevance state==>',filtersApiData);

    useEffect(() => {
        dispatch(setFilterDataProp({
            prop: FILTERS_TYPES.RELEVANCE,
            value: data.relevance,
        }))
        
    }, []);

    // useEffect(() => {
    //     if (props.filterFor && props.filterFor !== filterFor)
    //         setFilterFor(props.filterFor);
    // });

    const _keyExtractor = (item, index) => "Relevance_" + index.toString();

    const _selectRelevance = (item) => {
        console.log("item select", item)
        console.log("filterFor", filterFor)

        dispatch(resetFilterArr("relevance", filterFor));

        dispatch(setFilterPropArr(
            {
                type: "relevance",
                data: Object.assign({}, item, { value: toLower(item.value) }),
            },
            filterFor
        ));
        if (cb) cb();
    };

    const _renderList = ({ item }) => {
        
        // let isActive = helpers._isObjectInArr(item, filtersData[filterFor][FILTERS_TYPES.RELEVANCE]) ? true : false;
        let isActive = find(
            filtersData[filterFor][FILTERS_TYPES.RELEVANCE],
            (dt) => dt.key === item.key
        );
        let activeStyle = isActive ? { ...sty.fW700 } : {};
        let activeIcon = isActive ? "md-radio-button-on" : "md-radio-button-off";

        return (
            <>
                <View style={{ width: 10 }} />
                <TouchableOpacity
                    onPress={() => {
                        _selectRelevance(item);
                    }}>
                    {/* <_ListWrap style={styles.listItem}>
                  <_Lang style={[styles.filterTabTxt]} text={`filters.${item.key}`} /> */}
                    {isActive ? (
                        <_GradiantView style={[styles.selectedList, { borderRadius: 5 }]}>
                            <_Lang
                                style={[
                                    styles.filterTabTxt,
                                    { ...sty.fW700, color: colors.white },
                                    ,
                                    { paddingHorizontal: 5 },
                                ]}
                                text={`filters.${item.key}`}
                            />
                        </_GradiantView>
                    ) : (
                        <_ListWrap style={[styles.listItem, { borderRadius: 5 }]}>
                            <_Lang
                                style={[styles.filterTabTxt, { paddingHorizontal: 5 }]}
                                text={`filters.${item.key}`}
                            />
                        </_ListWrap>
                    )}

                    {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
                    {/* <_Icon
                    type={"Ionicons"}
                    icon={activeIcon}
                    size={22}
                    color={colors.primaryColor}
                  />
                </_ListWrap> */}
                </TouchableOpacity>
            </>
        );
    };


    let relevanceArr = [];

    if (filtersApiData[FILTERS_TYPES.RELEVANCE] != null) {
        relevanceArr = filtersApiData[FILTERS_TYPES.RELEVANCE].filter(
            (item, index) => {
                return searchTxt == "" ||
                    item.value
                        .toLocaleLowerCase()
                        .indexOf(searchTxt.toLocaleLowerCase()) > -1
                    ? true
                    : false;
            });

    };
    const  realData = relevanceArr


    return(
        <>
       
      
            {(filtersApiData[FILTERS_TYPES.RELEVANCE] === null)
                ?
                <_InlineLoader type={"list"} />
                :

                <View style={[mainStyles.rootView, { backgroundColor: colors.white }]}>
                    <_Lang
                        style={[
                            mainStyles.textBold18,
                            { margin: 10 }
                        ]}
                        text={`filters.relevance`}
                    />
                    <FlatList
                        data={realData}
                        numColumns={3}
                        extraData={[searchTxt, activeRelevance, filterFor]}
                        renderItem={_renderList}
                        keyExtractor={_keyExtractor}
                    />
                </View>

            }
        </>

    )


}
export default mainLayoutHoc({})(Relevance);