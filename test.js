import { expect } from 'chai'

describe('Test HTML 5 FormData polyfill', () => {
	global.window = {}
	require('./index')
	const FormData = window.FormData

	it('should attach FormData to window object', () => {
		expect(window.FormData).to.exist
	})

	it('should append value', () => {
		let data = new FormData()
		data.append('test', 'value');
		data.boundary = '-a';
		expect(data.toString()).to.equal('---a\r\nContent-Disposition: form-data; name="test";\r\n\r\nvalue\r\n---a--')
	})

	it('should attach file', () => {
		var data = new FormData();
    data.append('test_file', {
      name: 'test_file.pdf',
      type: 'application/pdf',
      getAsBinary() {
        return 'content';
      }
    });
    data.boundary = '-a';
    expect(data.toString()).to.equal('---a\r\nContent-Disposition: form-data; name="test_file"; filename="test_file.pdf"\r\nContent-Type: application/pdf\r\n\r\ncontent\r\n---a--')
	})
})