export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
	// Splicing request parameters to url
	joinParamsToUrl?: boolean
	// Format request parameter time
	formatDate?: boolean
	// Whether to process the request result
	errorMessageMode?: ErrorMessageMode
	// Whether to add a timestamp
	joinTime?: boolean
	// Whether to send token in header
	withToken?: boolean
}

// multipart/form-data: upload file
export interface UploadFileParams {
	// Other parameters
	data?: Recordable
	// File parameter interface field name
	name?: string
	// file name
	file: File | Blob
	// file name
	filename?: string
	[key: string]: any
}
