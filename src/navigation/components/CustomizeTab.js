import React from 'react';
import Screens from '../Screens';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../../assets/image';
import {scaleSize} from '../../utils';

const getTabInfo = tabName => {
  switch (tabName) {
    case Screens.Home:
      return {
        title: Screens.Home,
        inActiveIcon: images.ic_home,
        activeIcon: images.ic_home,
      };
    case Screens.Jars:
      return {
        title: Screens.Jars,
        inActiveIcon: images.ic_jar,
        activeIcon: images.ic_jar,
      };
    case Screens.Challenge:
      return {
        title: Screens.Challenge,
        inActiveIcon: images.ic_challenge,
        activeIcon: images.ic_challenge,
      };
    case Screens.UserProfile:
      return {
        title: Screens.UserProfile,
        inActiveIcon: images.ic_profile,
        activeIcon: images.ic_profile,
      };
    default:
  }
};

const CustomizeTab = props => {
  const {navigation = {}, state = {}} = props || {};
  const {routes = [], index: activeTabIndex} = state || {};

  const navigateToTab = tabName => {
    if (tabName) {
      navigation?.navigate(tabName);
    }
  };

  const renderTabItems = (itemTab, indexTab) => {
    const {key = '', name = ''} = itemTab;
    const active = indexTab === activeTabIndex;
    const tabInfo = getTabInfo(name);

    return (
      <TouchableOpacity
        key={`item-main-tab-${key}`}
        style={styles.tabItems}
        activeOpacity={0.8}
        onPress={() => {
          if (indexTab !== activeTabIndex) {
            navigateToTab(name);
          }
        }}>
        <Image source={tabInfo.activeIcon} style={[styles.icTabar]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabbarContainer}>{routes?.map(renderTabItems)}</View>
  );
};
export default CustomizeTab;
const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: scaleSize(80),
  },
  tabItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icTabar: {
    width: scaleSize(26),
    height: scaleSize(26),
    marginTop: scaleSize(-10),
  },
});
