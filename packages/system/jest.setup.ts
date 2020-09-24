import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/**
 * @file Jest Global Setup Configuration
 * @see {@link https://github.com/testing-library/jest-dom}
 */

// Enzyme
configure({ adapter: new Adapter() })
