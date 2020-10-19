import {
	RECORD_USERINFO,
	SAVE_GEOHASH,
	RECORD_ADDRESS
} from './mutation-types.js'

import {setStore 
    //getStore
} from '../config/mUtils'

//import {localapi, proapi} from '../config/env'

export default {
	// 记录当前经度纬度
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	//保存geohash
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash;
		
	},
}
