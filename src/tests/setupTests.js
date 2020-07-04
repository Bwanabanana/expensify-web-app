import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import DotEnv from 'dotenv';

configure({ adapter: new Adapter() });

DotEnv.config({ path: '.env.test' });
