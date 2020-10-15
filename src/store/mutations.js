import {
    RECORD_USERINFO
} from './mutation-types.js'

import {setStore 
    //getStore
} from '../config/mUtils'

//import {localapi, proapi} from '../config/env'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	}
}
