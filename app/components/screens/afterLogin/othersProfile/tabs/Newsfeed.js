import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    ActivityIndicator,
    Text,
    FlatList,
    RefreshControl
} from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, ApiCall } from '../../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../custom';
import { mainLayoutHoc } from '../../../../hoc';
import mainStyles from '../../../../../assets/styles/MainStyles';
import { styles } from '../styles';
import FastImage from 'react-native-fast-image'
import { setOtherProfileNewsfeed, pushOtherProfileNewsfeed } from '../../../../../redux/actions/OtherProfileActions';
import { setParticipantProp } from '../../../../../redux/actions/CompanyParticipantAction';
import { setTimestampData } from '../../../../../redux/actions/TimestampAction';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
//ContentBox actions
import { setAppData } from '../../../../../redux/actions/AppDataActions';
import { pushProfileDataProp, setProfileDataProp } from '../../../../../redux/actions/ProfileAction';
import { setHomeDataProp } from '../../../../../redux/actions/HomeActions';
import { setCampaignProp, pushCampaignProp, } from '../../../../../redux/actions/CampaignsActions';
import { setPagination } from '../../../../../redux/actions/PaginationActions';
import { map } from 'lodash'

const POST_TYPES = globals.POST_TYPES;
const ViewTypes = {
  FULL: 0,
};
class Newsfeed extends Component {
  constructor(props) {
    super(props);
    let { width } = Dimensions.get("window");
    this._layoutProvider = new LayoutProvider(
      (index) => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2 - 0.0001;
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.FULL:
            dim.width = Math.round(width / 3) - 1;
            dim.height = Math.round(width / 3) + 1;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );
       this.ScrollViewWithHeader = React.forwardRef(
         ({ children, ...props }, ref) => {
           return (
             <ScrollView ref={ref} {...props}>
               {this.props.header}
               {children}
             </ScrollView>
           );
         },
       );
      RecyclerListView.propTypes.externalScrollView = PropTypes.object;
    this.state = {
      initialLoading: this.props.newsfeedLoading,
      listLoading: false,
      refreshing: false,
    };
    this.listLoading = false;
    this.listEnded = false;
    this.otherNewsfeedRef = {};
    this.scrollListRef = null;
  }

  componentDidMount() {
    // const { setNewsFeedEndTrigger, setNewsFeedRefresh } = this.props;
    // setNewsFeedEndTrigger(this.listEndTrigger);
    // setNewsFeedRefresh(this._onRefresh)
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.newsfeedLoading !== state.initialLoading) {
      return {
        initialLoading: nextProps.newsfeedLoading || false,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { timestamp, userInfo } = this.props;
    if (
      timestamp["newsfeed" + userInfo.username] !== undefined &&
      prevProps.timestamp["newsfeed" + userInfo.username] === undefined
    ) {
      this._onRefresh();
    }
  }

  _keyExtractor = (item, index) => index.toString();

  listEndTrigger = () => {
    const { otherProfileNewsfeed, userInfo } = this.props;

    ApiCall.initiatePostView(
      this.otherNewsfeedRef,
      otherProfileNewsfeed[userInfo.userId].arr,
      { ...this.props },
    );
    helpers.videoPlayToggle();
  };

  _navigateNewsFeedList = (item, index) => {
    // this.props.navigation.navigate("OthersProfileNewsFeedList", {
    //     tabBarVisible: true,
    //     params: {
    //         ...this.props,
    //         page: item.page,
    //         newPost: item.newPost,
    //         itemId: item._id,
    //         userId: this.props.userInfo.userId,
    //         userName: this.props.userInfo.username
    //     }
    // });

    this.props.navigation.navigate("OthersProfileNewsFeedList", {
      ...this.props,
      page: item.page,
      newPost: item.newPost,
      itemId: item._id,
      userId: this.props.userInfo.userId,
      userName: this.props.userInfo.username,
      index:index
    });
  };

  _renderItems = ({item,index}) => {
    
    item = this._postNavigate(item);

    const url = !item.thumbnailMediaUrl
      ? item.gridMediaUrl
        ? item.gridMediaUrl
        : item.resizeMediaUrl
      : item.thumbnailMediaUrl;
    // const image

    // const cornerImage =
    //   item.postType === "participant"
    //     ? images.gridStages
    //     : item.postType === "blog"
    //     ? images.gridBlog
    //     : item.postType === "media" && item.typeContent === "video"
    //     ? images.gridVideo
    //     : null;
    const cornerImage = item.typeContent =='video'?images.newVideo:null
    return (
      <View
        key={"NewsfeedOtherProfiletList_"}
        ref={(ref) => (this.otherNewsfeedRef[item._id] = ref)}
        renderToHardwareTextureAndroid={this.state.renderTexture}
        style={{
          paddingVertical: 1,
          paddingHorizontal: 1,
          width: globals.WINDOW_WIDTH / 3 - 1,
          backgroundColor: "white",
        }}>
        <TouchableOpacity
          onPress={() => {
            this._navigateNewsFeedList(item,index);
          }}>
          <FastImage
            source={{ uri: url }}
            resizeMode={"cover"}
            style={{
              width: "100%",
              borderRadius: 5,
              height: globals.WINDOW_WIDTH / 3 - 1,
              backgroundColor: colors.lighter,
            }}
          />
          <View style={{ zIndex: 1, position: "absolute", top: 10, right: 10 }}>
            <FastImage
              allowFontScaling={false}
              source={cornerImage}
              style={{ height: 20, width: 20 }}
              resizeMode={"cover"}
              zz
            />
          </View>
        </TouchableOpacity>
      </View>
    );

    // item = this._postNavigate(item);
    // return (
    //     <View ref={ref => this.otherNewsfeedRef[item._id] = ref} renderToHardwareTextureAndroid={this.state.renderTexture}>
    //         <_ContentType
    //             key={'Item_' + index}
    //             contentInfo={item}
    //             index={index}
    //             {...this.props}
    //         />
    //     </View>
    // )
  };

  _postNavigate = (obj) => {
    let postType = helpers.buildPostType(obj.postType, obj.userType || "");

    let nav;
    if (postType == POST_TYPES.CompanyParticipantCampaign) {
      nav = (postInfo) => {
        this.props.navigation.navigate("CampaignParticipant", {
          postInfo: postInfo,
        });
      };
    }
    if (postType == POST_TYPES.CompanyCampaign) {
      nav = (postInfo) => {
        this.props.navigation.navigate("CompanyCampaign", {
          campaignInfo: postInfo,
        });
      };
    }
    if (postType == POST_TYPES.CreatorCampaign || postType == POST_TYPES.Blog) {
      nav = (postInfo) => {
        this.props.navigation.navigate("CreatorCampaign", {
          campaignInfo: postInfo,
        });
      };
    }
    if (postType == POST_TYPES.MediaPost || postType == POST_TYPES.Userpost) {
      nav = (postInfo) => {
        this.props.navigation.navigate("MediaPost", {
          postInfo: postInfo,
        });
      };
    }
    if (postType == POST_TYPES.Advertise) {
      nav = (postInfo) => {
        this.props.navigation.navigate("Advertise", {
          postInfo: postInfo,
        });
      };
    }
    obj = Object.assign({ navigateToFullView: nav }, obj);
    return obj;
  };

  _onRefresh = () => {
    const {
      setOtherProfileNewsfeed,
      userInfo,
      getStories,
      timestamp,
      setTimestampData,
      pushOtherProfileNewsfeed,
      refreshProfile,
    } = this.props;
    const { refreshStories } = this.state;

    refreshProfile && refreshProfile();
    refreshStories && getStories();
    ApiCall.getOtherProfileData(
      "newsFeedList",
      this.props,
      this.state,
      1,
      timestamp["newsfeedNew" + userInfo.username] ||
        timestamp["newsfeed" + userInfo.username],
    )
      .then((res) => {
        if (res.data.length > 0) {
          const updatedData = map(res.data, (mx) => {
            return Object.assign({}, mx, { page: 1, newPost: true });
          });
          pushOtherProfileNewsfeed(
            {
              list:true,
              id: userInfo.userId,
              arr: updatedData,
              pagination: res.pagination,
            },
            true,
          );
        }

        setTimestampData("newsfeedNew" + userInfo.username, res.timestamp);

        this.setState({ refreshing: false });
        !refreshStories && this.setState({ refreshStories: true });
      })
      .catch((err) => {
        setOtherProfileNewsfeed({
          list: true,
          id: userInfo.userId,
          arr: [],
          pagination: {},
        });
        this.setState({ refreshing: false });
        !refreshStories && this.setState({ refreshStories: true });
      });
  };
 
    
  _renderMore = () => {
    const {
      pushOtherProfileNewsfeed,
      otherProfileNewsfeed,
      userInfo,
      timestamp,
      setPagination,
    } = this.props;

    if (!otherProfileNewsfeed[userInfo.userId]) return;

    let pagination = otherProfileNewsfeed[userInfo.userId].pagination;

    if (this.listLoading === false) {
      this.listLoading = true;

      this.setState(
        {
          listLoading: true,
        },
        () => {
          if (pagination.page + 1 > pagination.pages) {
            this.listEnded = true;
            this.setState({ listLoading: false });
            this.listLoading = false;
          } else {
            ApiCall.getOtherProfileData(
              "newsFeedList",
              this.props,
              this.state,
              ++pagination.page,
              "",
              timestamp["newsfeed" + userInfo.username],
            )
              .then((res) => {
                const updatedData = map(res.data, (mx) => {
                  return Object.assign({}, mx, {
                    page: mx.page || res.pagination.page,
                  });
                });

                pushOtherProfileNewsfeed({
                  id: userInfo.userId,
                  arr: updatedData,
                  pagination: res.pagination,
                });

                this.setState({ listLoading: false });
                this.listLoading = false;
              })
              .catch((err) => {
                this.setState({ listLoading: false });
                this.listLoading = false;
              });
          }
        },
      );
    }

    // let news = otherProfileNewsfeed[userInfo.userId].arr;
    // let lastUser = news[news.length - 1];
    // if (!lastUser) return;

    // let pagination = otherProfileNewsfeed[userInfo.userId].pagination;

    // if (this.otherNewsfeedRef[lastUser._id]) {
    //     let ref = this.otherNewsfeedRef[lastUser._id];
    //     ref.measure((x, y, width, height, pageX, pageY) => {
    //         !pageY ? this.setState({ renderTexture: true }) : null
    //         this.setState({ renderTexture: false })
    //         if (height > pageY || (pageY > globals.WINDOW_HEIGHT - 500 && pageY < globals.WINDOW_HEIGHT - 100)) {

    //             if (this.listLoading === false) {
    //                 this.listLoading = true;

    //                 this.setState({
    //                     listLoading: true
    //                 }, () => {
    //                     if (pagination.page + 1 > pagination.pages) this.listEnded = true;

    //                     ApiCall.getOtherProfileData('newsFeed', this.props, this.state, ++pagination.page).then((res) => {
    //                         pushOtherProfileNewsfeed({
    //                             id: userInfo.userId,
    //                             arr: res.data,
    //                             pagination: res.pagination
    //                         })

    //                         this.setState({ listLoading: false });
    //                         this.listLoading = false;
    //                     }).catch(err => {
    //                         this.setState({ listLoading: false });
    //                         this.listLoading = false;
    //                     })
    //                 })

    //             }

    //         }
    //     })
    // }
  };

  changeItems = (data) => {
    const { otherProfileNewsfeed, userInfo } = this.props;

    ApiCall.initiatePostView(
      data.viewableItems,
      otherProfileNewsfeed[userInfo.userId].arr,
      { ...this.props },
    );
    helpers.videoPlayToggle();
  };

  render() {
    const { userInfo, otherProfileNewsfeed } = this.props;
    const { listLoading, refreshing, initialLoading } = this.state;

    if (!otherProfileNewsfeed[userInfo.userId])
      return (
        <View>
          {this.props.header}
          <_InlineLoader type={"gridWith3Item"} />
        </View>
      );

    // if (initialLoading || !otherProfileNewsfeed[userInfo.userId]) return <_InlineLoader type={'post'} />

    return (
      <View style={[mainStyles.rootView, { paddingHorizontal: 1 }]}>
        {/* <RecyclerListView
          dataProvider={new DataProvider((r1, r2) => {
            return r1 !== r2;
          }).cloneWithRows(otherProfileNewsfeed[userInfo.userId].arr)}
          rowRenderer={this._renderItems}
          layoutProvider={this._layoutProvider}
          extendedState={this.state}
          onEndReached={() => {
            this._renderMore();
          }}
          externalScrollView={this.ScrollViewWithHeader}
          onEndReachedThreshold={0.5}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh}
              />
            ),
          }}
          renderFooter={() => {
            return (
              <View>
                {listLoading ? <_InlineLoader type={"grid"} /> : null}
              </View>
            );
          }}
        /> */}
        <FlatList
                    // contentContainerStyle={{marginBottom: 80}}
                    ref={(ref) => { this.scrollListRef = ref }}
                    data={otherProfileNewsfeed[userInfo.userId].arr}
                    extraData={this.state}
                    renderItem={this._renderItems}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this.props.header}
                    // onViewableItemsChanged={this.changeItems}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => this._renderMore()}
                    numColumns={3}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    // onScroll={(e) => {
                    //     this.listEndTrigger()
                    // }}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                {listLoading ? <_InlineLoader type="grid"/> : null}
                            </View>
                        )
                    }}
                    removeClippedSubviews={Platform.OS == 'android' ? true : false}
                // windowSize={3}
                />
      </View>
    );
  }
}

const mapStateToProps = state => ({
    otherProfileNewsfeed: state.otherProfile.otherProfileNewsfeed,
    companyParticipant: state.companyParticipant,
    navProps: state.navProps,
    appData: state.appData,
    loginData: state.loginData,
    localize: state.localize,
    profile: state.profile,
    home: state.home,
    campaigns: state.campaigns,
    timestamp: state.timestamp
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setOtherProfileNewsfeed,
        pushOtherProfileNewsfeed,
        setAppData,
        pushProfileDataProp,
        setProfileDataProp,
        setPagination,
        setHomeDataProp,
        setCampaignProp,
        pushCampaignProp,
        setParticipantProp,
        setTimestampData
    }, dispatch)
);
const NewsfeedRedux = connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
export default mainLayoutHoc({})(NewsfeedRedux);