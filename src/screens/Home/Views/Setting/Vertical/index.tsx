import React, { useCallback, useRef } from 'react'
import { ScrollView, View, type DrawerLayoutAndroid } from 'react-native'
// import { getWindowSise, onDimensionChange } from '@/utils/tools'
import NavList, { type NavListTypeType } from './NavList'
import Header, { type HeaderType } from './Header'
import Main, { type SettingScreenIds, type MainType } from '../Main'
import { useSettingValue } from '@/store/setting/hook'
import { COMPONENT_IDS } from '@/config/constant'
import DrawerLayoutFixed from '@/components/common/DrawerLayoutFixed'
import { scaleSizeW } from '@/utils/pixelRatio'
import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'

const MAX_WIDTH = scaleSizeW(300)

const Content = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null)
  const navListRef = useRef<NavListTypeType>(null)
  const headerRef = useRef<HeaderType>(null)
  const mainRef = useRef<MainType>(null)
  const drawerLayoutPosition = useSettingValue('common.drawerLayoutPosition')
  const theme = useTheme()

  const handleShowDrawer = useCallback(() => {
    drawer.current?.openDrawer()
    navListRef.current?.show()
  }, [])

  const handleChangeId = useCallback((id: SettingScreenIds) => {
    drawer.current?.closeDrawer()
    mainRef.current?.setActiveId(id)
    headerRef.current?.setActiveId(id)
  }, [])

  const navigationView = () => (
    <View style={styles.nav}>
      <NavList ref={navListRef} onChangeId={handleChangeId} />
    </View>
  )
  // console.log('render drawer content')

  return (
    <DrawerLayoutFixed
      ref={drawer}
      widthPercentage={0.6}
      widthPercentageMax={MAX_WIDTH}
      visibleNavNames={[COMPONENT_IDS.home]}
      // drawerWidth={width}
      drawerPosition={drawerLayoutPosition}
      renderNavigationView={navigationView}
      drawerBackgroundColor={theme['c-content-background']}
      style={{ elevation: 1 }}
    >
      <Header ref={headerRef} onShowNavBar={handleShowDrawer} />
      <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps={'always'}>
        <Main ref={mainRef} />
      </ScrollView>
      {/* <View style={styles.container}>
      </View> */}
    </DrawerLayoutFixed>
  )
}

const styles = createStyle({
  nav: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  main: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
})

export default Content