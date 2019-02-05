import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'

configure({ adapter: new Adapter() })

describe('<SimpleBlog />', () => {
    const blog = {
        title: 'title',
        author: 'author',
        likes: 100
    }

    it('renders content', () => {
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        const infoDiv = simpleBlogComponent.find('.info')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(infoDiv.text()).toContain(blog.title)
        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('calls event handler twice when like button is clicked two times', () => {
        const mockHandler = jest.fn()
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
