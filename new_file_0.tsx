	transformRequestHook: (res: AxiosResponse<OriginResult>, options: RequestOptions) => {
		const { isTransformResponse, isReturnNativeResponse } = options
		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res
		}
		// 不进行任何处理，直接返回
		// 用于页面代码可能需要直接获取code，data，message这些信息时开启
		if (!isTransformResponse) {
			return res.data
		}

		// // // 老接口返回的不是code000000
		// if (isTransformResponse && res.status == 200 && res.data.success) {
		// 	return res.data
		// }

		// 错误的时候返回
		const { data } = res

		if (!data) {
			alterMessage(options, '服务出错')
			return {
				success: false,
				result: null,
				message: '服务出错'
			}
		}

		const { code, data: result, message, value, msg } = data

		// 这里逻辑可以根据项目进行修改
		const successCode = ['000000', '1', 0, 1, 2000]
		const hasSuccess = successCode.includes(code) || successCode.includes(value?.code as string)

		// 用户未登录
		if (code === '000999') {
			window.location.href = export_config.loginUrl
			return
		}

		if (hasSuccess) {
			return {
				success: true,
				result: result ?? value?.data,
				message: (message || msg || value?.message)!
			}
		}

		if (
			value?.message === ResultEnum.NotLoginText ||
			value?.message === ResultEnum.NotLoginTextZh
		) {
			return {
				success: false,
				message: '',
				code: `${code}`,
				result: null
			}
		}

		// 在此处根据自己项目的实际情况对不同的code执行不同的操作
		// 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
		let timeoutMsg = message || value?.message || msg

		switch (code) {
			case ResultEnum.TIMEOUT:
				timeoutMsg = '参数错误'
				alterMessage(options, timeoutMsg)
				break
			default:
				break
		}

		// errorMessageMode=‘notification’的时候会显示notification，而不是消息提示，用于一些比较重要的错误
		// errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示

		return {
			success: false,
			result: null,
			message: timeoutMsg || '请求出错，请稍后重试'
		}
	},