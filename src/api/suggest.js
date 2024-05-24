import request from '@/utils/request'

// List
export function getList() {
	return request({
		url: '/suggest/list',
		method: 'get',
	})
}

// Save
export function postSave(data) {
	return request({
		url: '/suggest/save',
		method: 'post',
		data
	})
}
